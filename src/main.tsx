import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { normalizePath, routeAliases } from "./lib/routes";
import "@fontsource-variable/inter";
import "./styles.css";
import "./home.css";
import "./refinements.css";
import "./conversion.css";
import "./upgrade.css";
const root = document.getElementById("root");
if (!root) throw new Error("Chybí kořenový element aplikace.");
const redirect = routeAliases[normalizePath(window.location.pathname)];
if (redirect) {
  window.location.replace(
    `${redirect}${window.location.search}${window.location.hash}`,
  );
} else {
  const application = (
    <StrictMode>
      <App />
    </StrictMode>
  );
  if (root.hasChildNodes()) hydrateRoot(root, application);
  else createRoot(root).render(application);
}
