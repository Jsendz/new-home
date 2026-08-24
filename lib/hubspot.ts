// HubSpot CRM API integration — creates a Contact (deduped by email) and,
// per submission, a separate Deal so each property inquiry is trackable on
// its own even when the same person contacts about multiple properties.

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
  propertyTitle?: string;
  propertyUrl?: string;
}

const HUBSPOT_API_BASE = "https://api.hubapi.com";

interface HubSpotResult {
  success: boolean;
  error?: string;
}

async function hubspotFetch(path: string, init: RequestInit) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) throw new Error("HUBSPOT_ACCESS_TOKEN is not configured");

  const res = await fetch(`${HUBSPOT_API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...init.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HubSpot ${path} failed (${res.status}): ${body}`);
  }

  return res.status === 204 ? null : res.json();
}

async function findContactIdByEmail(email: string): Promise<string | null> {
  const result = await hubspotFetch("/crm/v3/objects/contacts/search", {
    method: "POST",
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: "email", operator: "EQ", value: email }] }],
      limit: 1,
    }),
  });
  return result?.results?.[0]?.id ?? null;
}

async function upsertContact(data: ContactFormData): Promise<string> {
  const [firstname, ...rest] = data.fullName.trim().split(/\s+/);
  const properties = {
    email: data.email,
    firstname: firstname || data.fullName,
    lastname: rest.join(" "),
    phone: data.phone || "",
  };

  const existingId = await findContactIdByEmail(data.email);

  if (existingId) {
    await hubspotFetch(`/crm/v3/objects/contacts/${existingId}`, {
      method: "PATCH",
      body: JSON.stringify({ properties }),
    });
    return existingId;
  }

  const created = await hubspotFetch("/crm/v3/objects/contacts", {
    method: "POST",
    body: JSON.stringify({ properties }),
  });
  return created.id;
}

async function associateDefault(fromObject: string, fromId: string, toObject: string, toId: string) {
  await hubspotFetch(
    `/crm/v4/objects/${fromObject}/${fromId}/associations/default/${toObject}/${toId}`,
    { method: "PUT" }
  );
}

// HubSpot doesn't fall back to a default pipeline/stage for deals created
// via the API — an unset pipeline/stage just stays null and the deal won't
// appear on the pipeline board. Look up the account's first pipeline and
// stage once per server lifetime as a fallback when env vars aren't set.
let cachedDefaultPipeline: { pipeline: string; dealstage: string } | null = null;

async function getDefaultPipelineStage(): Promise<{ pipeline: string; dealstage: string } | null> {
  if (cachedDefaultPipeline) return cachedDefaultPipeline;
  try {
    const result = await hubspotFetch("/crm/v3/pipelines/deals", { method: "GET" });
    const pipeline = result?.results?.[0];
    const stage = pipeline?.stages?.[0];
    if (!pipeline || !stage) return null;
    cachedDefaultPipeline = { pipeline: pipeline.id, dealstage: stage.id };
    return cachedDefaultPipeline;
  } catch (error) {
    console.error("Failed to look up default HubSpot deal pipeline:", error);
    return null;
  }
}

async function createDeal(data: ContactFormData, contactId: string): Promise<string> {
  let pipeline = process.env.HUBSPOT_DEAL_PIPELINE_ID;
  let dealstage = process.env.HUBSPOT_DEAL_STAGE_ID;

  if (!pipeline || !dealstage) {
    const fallback = await getDefaultPipelineStage();
    pipeline = pipeline || fallback?.pipeline;
    dealstage = dealstage || fallback?.dealstage;
  }

  const dealname = data.propertyTitle
    ? `${data.propertyTitle} — inquiry from ${data.fullName}`
    : `Website inquiry from ${data.fullName}`;

  const properties: Record<string, string> = { dealname };
  if (pipeline) properties.pipeline = pipeline;
  if (dealstage) properties.dealstage = dealstage;

  const deal = await hubspotFetch("/crm/v3/objects/deals", {
    method: "POST",
    body: JSON.stringify({ properties }),
  });

  await associateDefault("deals", deal.id, "contacts", contactId);
  return deal.id;
}

async function createNote(data: ContactFormData, contactId: string, dealId: string | null) {
  const bodyLines = [data.message];
  if (data.propertyUrl) bodyLines.push("", `Property: ${data.propertyUrl}`);
  if (data.phone) bodyLines.push(`Phone: ${data.phone}`);

  const note = await hubspotFetch("/crm/v3/objects/notes", {
    method: "POST",
    body: JSON.stringify({
      properties: {
        hs_note_body: bodyLines.join("\n"),
        hs_timestamp: Date.now(),
      },
    }),
  });

  await associateDefault("notes", note.id, "contacts", contactId);
  if (dealId) await associateDefault("notes", note.id, "deals", dealId);
}

export async function submitToHubSpot(data: ContactFormData): Promise<HubSpotResult> {
  if (!process.env.HUBSPOT_ACCESS_TOKEN) {
    console.error("HubSpot credentials not configured");
    return { success: false, error: "Form configuration missing" };
  }

  try {
    const contactId = await upsertContact(data);
    const dealId = await createDeal(data, contactId);

    // Best-effort: some portals don't grant notes scopes to the same
    // token even when contacts/deals are writable. The lead (contact +
    // deal) is already captured at this point, so don't fail the whole
    // submission over a note that couldn't be attached.
    try {
      await createNote(data, contactId, dealId);
    } catch (noteError) {
      console.error("HubSpot note creation failed (lead still captured):", noteError);
    }

    return { success: true };
  } catch (error) {
    console.error("HubSpot submission failed:", error);
    return { success: false, error: "Submission failed" };
  }
}
