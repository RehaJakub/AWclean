import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { PageIntro } from "../components/layout/PageIntro";
import { ServiceCTA } from "../components/services/ServiceCTA";
export function CleanFacadesPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Čištění fasád", href: "/cisteni-fasad/" },
          { label: "Odborné posouzení fasády" },
        ]}
      />
      <PageIntro
        eyebrow="RADY OD AWCLEAN"
        title="Nenechte si zmařit investici do fasády."
        description="Nejste spokojení s výsledkem předchozího čištění? Pomůžeme vám posoudit stav povrchu a možnosti dalšího postupu."
      />
      <article className="reading-page container">
        <h2>Základem je důkladné a správné čištění</h2>
        <p>
          Obnova fasády představuje významnou investici. Způsob mytí proto
          vybírejte podle konkrétního podkladu a zkušeností realizační firmy.
          Nešetrný nebo nedostatečný zásah může na povrchu zanechat mapy, fleky
          či zbytky biologických povlaků.
        </p>
        <h2>Čistíme a posuzujeme fasády od roku 2001</h2>
        <p>
          AWCLEAN se věnuje odbornému čištění fasád a také posouzení objektů po
          předchozím neúspěšném zásahu. Nový nátěr není automaticky jediným
          řešením: nejprve je potřeba zjistit skutečný stav povrchu.
        </p>
        <blockquote>
          „K základnímu úspěchu, aby byla vaše fasáda krásná a opět zářila, vede
          pouze jedna cesta – důkladně omýt.“
          <cite>Andrej Wiedermann, technik společnosti AWCLEAN s.r.o.</cite>
        </blockquote>
        <h2>Výsledek není podle očekávání?</h2>
        <p>
          Kontaktujte nás. Na místě posoudíme stav čistoty fasády, ověříme
          zbytky biologických povlaků a provedeme ukázku vhodného postupu.
          Posouzení a zkoušku nabízíme zdarma.
        </p>
      </article>
      <ServiceCTA servicePath="/cisteni-fasad/" />
    </>
  );
}
