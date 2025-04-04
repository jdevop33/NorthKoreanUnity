import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./lib/i18n"; // Import i18n configuration

// Initialize the app with i18n support
createRoot(document.getElementById("root")!).render(<App />);
