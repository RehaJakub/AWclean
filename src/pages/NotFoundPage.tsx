import { ArrowLeft, ArrowUpRight } from "lucide-react";
export function NotFoundPage() {
  return (
    <section className="not-found container">
      <p className="eyebrow">404 / STRÁNKU JSME NENAŠLI</p>
      <h1>
        Tady je zatím
        <br />
        <span>čisto.</span>
      </h1>
      <p>
        Odkaz může být neúplný nebo stránka změnila adresu. Vyberte si z našich
        služeb nebo se vraťte na úvod.
      </p>
      <div>
        <a className="button button-primary" href="/">
          {" "}
          <ArrowLeft size={18} /> Na úvod
        </a>
        <a className="button button-outline" href="/sluzby/">
          Všechny služby <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
