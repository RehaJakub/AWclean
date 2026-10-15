import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { PageIntro } from "../components/layout/PageIntro";
import { privacySections } from "../data/privacy";
export function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Ochrana osobních údajů a cookies" }]} />
      <PageIntro
        eyebrow="VAŠE SOUKROMÍ"
        title="Ochrana osobních údajů a cookies"
        description="Přehled informací o zpracování kontaktních údajů, vašich právech a používání cookies na tomto webu."
      />
      <article className="reading-page container">
        {privacySections.map((section, index) => (
          <section key={section.title}>
            <h2>
              {index + 1}. {section.title}
            </h2>
            {section.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <a className="text-link" href="mailto:info@awclean.cz">
          Kontaktovat správce: info@awclean.cz
        </a>
      </article>
    </>
  );
}
