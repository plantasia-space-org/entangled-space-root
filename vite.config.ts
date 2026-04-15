import fs from "fs"
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const localPlantasiaCert = path.resolve(
  __dirname,
  "../../plantasia.space-root/.certs/local.plantasia.space.pem"
)

const localPlantasiaKey = path.resolve(
  __dirname,
  "../../plantasia.space-root/.certs/local.plantasia.space-key.pem"
)

function getLocalHttpsConfig() {
  if (!fs.existsSync(localPlantasiaCert) || !fs.existsSync(localPlantasiaKey)) {
    return undefined
  }

  return {
    cert: fs.readFileSync(localPlantasiaCert),
    key: fs.readFileSync(localPlantasiaKey),
  }
}

const localHttpsConfig = getLocalHttpsConfig()

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react(), tailwindcss()],
  server: {
    host: "local.plantasia.space",
    https: localHttpsConfig,
    port: 5175,
    strictPort: true,
  },
  preview: {
    host: "local.plantasia.space",
    https: localHttpsConfig,
    port: 5175,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
