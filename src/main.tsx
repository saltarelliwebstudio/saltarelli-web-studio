import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { healStaticSnapshot } from "./lib/healStaticSnapshot";
import "./index.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

// Before React touches anything: clear any Radix portal the prerenderer baked
// into the static HTML. A bad snapshot ships <body pointer-events:none> and an
// unclosable modal, and Radix would otherwise capture that "none" and restore
// it the next time a dialog closes. See lib/healStaticSnapshot.ts.
healStaticSnapshot();

createRoot(document.getElementById("root")!).render(<App />);
