import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    server: {
        host: true,
        port: 5173,
        // origin: "http://127.0.0.1:5173",
        cors: {
            origin: ["http://job-tracker.local"],
            credentials: true,
        },
    },
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
        },
    },
});
