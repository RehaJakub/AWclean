import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

/** Pre-render the same components that the browser subsequently hydrates. */
export function render(pathname: string): string {
  return renderToString(
    <StrictMode>
      <App pathname={pathname} />
    </StrictMode>,
  );
}
