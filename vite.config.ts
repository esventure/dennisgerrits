import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && !isSsrBuild && componentTagger()].filter(Boolean),
  ssgOptions: {
    script: "async",
    formatting: "minify",
    dirStyle: "nested",
    // Admin screens are private and must never be prerendered or indexed.
    includedRoutes: (paths: string[]) =>
      paths.filter((p) => !p.startsWith("/admin") && !p.includes(":") && p !== "/*"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
