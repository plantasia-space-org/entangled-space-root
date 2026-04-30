import { copyFileSync, existsSync, mkdirSync } from "node:fs"
import { resolve } from "node:path"

const distDir = resolve("dist")
const indexPath = resolve(distDir, "index.html")
const routes = ["white-paper"]

if (!existsSync(indexPath)) {
  throw new Error("Cannot create static routes: dist/index.html is missing.")
}

for (const route of routes) {
  const routeDir = resolve(distDir, route)
  mkdirSync(routeDir, { recursive: true })
  copyFileSync(indexPath, resolve(routeDir, "index.html"))
}
