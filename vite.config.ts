import fs from "fs"
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// The shared local cert lives in plantasia.space-root/.certs. Resolve it across the
// possible checkout layouts: this repo's trunk and worktree dirs, and the ps-fe sibling
// layout. First existing pair wins; otherwise dev falls back to plain HTTP.
const certDirCandidates = [
  "../../plantasia.space-root/.certs",
  "../../ps-fe/plantasia.space-root/.certs",
  "../../../plantasia.space-root/.certs",
  "../../../ps-fe/plantasia.space-root/.certs",
]

function getLocalHttpsConfig() {
  for (const relativeDir of certDirCandidates) {
    const certDir = path.resolve(__dirname, relativeDir)
    const cert = path.join(certDir, "local.plantasia.space.pem")
    const key = path.join(certDir, "local.plantasia.space-key.pem")

    if (fs.existsSync(cert) && fs.existsSync(key)) {
      return {
        cert: fs.readFileSync(cert),
        key: fs.readFileSync(key),
      }
    }
  }

  return undefined
}

const localHttpsConfig = getLocalHttpsConfig()

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react(), tailwindcss()],
  server: {
    host: "local.plantasia.space",
    https: localHttpsConfig,
    port: 5180,
    strictPort: true,
  },
  preview: {
    host: "local.plantasia.space",
    https: localHttpsConfig,
    port: 5180,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
