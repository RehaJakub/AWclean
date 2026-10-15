import { ArrowLeft, ArrowRight } from "lucide-react";
import { ResponsiveImage } from "../components/ResponsiveImage";
export function NotFoundPage() {
  return (
    <section className="rd-404">
      <div className="rd-404-photos" aria-hidden="true">
        <ResponsiveImage src="/images/realizace/cihlova-fasada-pred-cistenim.webp" alt="" sizes="50vw" />
        <ResponsiveImage src="/images/realizace/cihlova-fasada-po-cisteni.webp" alt="" sizes="50vw" />
      </div>
      <div className="rd-404-content">
        <p className="rd-404-code" aria-hidden="true">404</p>
        <p className="rd-404-kicker">404 / STRÁNKU JSME NENAŠLI</p>
        <h1>Tady je zatím čisto.</h1>
        <p>
          Odkaz může být neúplný nebo stránka změnila adresu. Vyberte si z našich
          služeb nebo se vraťte na úvod.
        </p>
        <div className="rd-404-actions">
          <a className="rd-btn rd-btn-light" href="/">
            <ArrowLeft size={18} aria-hidden="true" /> Na úvod
          </a>
          <a className="rd-btn rd-btn-ghost" href="/sluzby/">
            Přehled služeb <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="rd-btn rd-btn-ghost" href="/kontakt/">
            Kontakt
          </a>
        </div>
      </div>
    </section>
  );
}
