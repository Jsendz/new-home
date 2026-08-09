export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
  propertyOfInterest?: string;
}

export async function submitToHubSpot(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_FORM_GUID;

  if (!portalId || !formGuid) {
    console.error("HubSpot credentials not configured");
    return { success: false, error: "Form configuration missing" };
  }

  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

  const fields = [
    { objectTypeId: "0-1", name: "firstname", value: data.fullName.split(" ")[0] || data.fullName },
    { objectTypeId: "0-1", name: "lastname", value: data.fullName.split(" ").slice(1).join(" ") || "" },
    { objectTypeId: "0-1", name: "email", value: data.email },
    { objectTypeId: "0-1", name: "phone", value: data.phone || "" },
    { objectTypeId: "0-1", name: "message", value: data.message },
    { objectTypeId: "0-1", name: "property_of_interest", value: data.propertyOfInterest || "" },
  ];

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields,
        context: {
          pageUri: "contact",
          pageName: "Contact Page",
        },
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return { success: false, error: err.message || "Submission failed" };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: "Network error" };
  }
}
