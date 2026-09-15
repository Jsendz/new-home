import { AlertTriangle } from "lucide-react";
import FadeInUp from "@/components/ui/FadeInUp";
import type { LegalDocument } from "@/lib/legal-content";

interface LegalContentProps {
  document: LegalDocument;
  placeholdersLabel: string;
}

export default function LegalContent({ document, placeholdersLabel }: LegalContentProps) {
  return (
    <section className="section-padding bg-background">
      <div className="container-site max-w-3xl">
        <FadeInUp>
          <p className="text-xs text-muted mb-10">{document.updated}</p>

          {document.intro && document.intro.length > 0 && (
            <div className="space-y-3 mb-10">
              {document.intro.map((p, i) => (
                <p key={i} className="text-sm text-muted leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          )}

          <div className="space-y-10">
            {document.sections.map((sec) => (
              <div key={sec.heading}>
                <h2 className="font-display text-lg text-foreground tracking-wide mb-3">
                  {sec.heading}
                </h2>

                {sec.body?.map((p, i) => (
                  <p key={i} className="text-sm text-muted leading-relaxed mb-3 last:mb-0">
                    {p}
                  </p>
                ))}

                {sec.list && (
                  <ul className="space-y-3 mt-3">
                    {sec.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {sec.table && (
                  <div className="mt-4 overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-sm border-collapse min-w-[560px]">
                      <thead>
                        <tr className="bg-card">
                          {sec.table.columns.map((col) => (
                            <th
                              key={col}
                              className="text-left font-semibold text-foreground px-4 py-2.5 border-b border-border"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sec.table.rows.map((row, i) => (
                          <tr key={i} className="border-b border-border last:border-0">
                            {row.map((cell, j) => (
                              <td key={j} className="align-top text-muted leading-relaxed px-4 py-3">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {sec.afterList?.map((p, i) => (
                  <p key={i} className="text-sm text-muted leading-relaxed mt-3">
                    {p}
                  </p>
                ))}

                {sec.subsections && (
                  <div className="space-y-5 mt-4">
                    {sec.subsections.map((sub) => (
                      <div key={sub.heading}>
                        <h3 className="font-semibold text-sm text-foreground mb-1.5">{sub.heading}</h3>
                        {sub.body.map((p, i) => (
                          <p key={i} className="text-sm text-muted leading-relaxed">
                            {p}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {document.links && document.links.length > 0 && (
            <div className="mt-10 pt-8 border-t border-border">
              <ul className="space-y-2">
                {document.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:text-accent-dark underline underline-offset-2 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {document.placeholders && document.placeholders.length > 0 && (
            <div className="mt-10 rounded-2xl border border-amber-300 bg-amber-50 p-5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-3">
                <AlertTriangle size={13} strokeWidth={2.5} />
                {placeholdersLabel}
              </p>
              <ul className="space-y-1.5">
                {document.placeholders.map((item, i) => (
                  <li key={i} className="text-sm text-amber-900 leading-relaxed">
                    · {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </FadeInUp>
      </div>
    </section>
  );
}
