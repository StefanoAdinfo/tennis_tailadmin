import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        // This will transform your SVG to a React component
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  resolve: {
    alias: {
      // Mappa l'alias '@' a './src'
      "@": path.resolve(__dirname, "./src"),
      // Mappa l'alias '~' a './src' (opzionale, se lo vuoi usare)
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
