import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base = repo-naam zodat de app op GitHub Pages werkt
export default defineConfig({
  plugins: [react()],
  base: "/het-levenspad/",
});
