import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { registerSilentAudioUnlockHandlers } from "@/features/snail-synth/silent-audio-unlock"

registerSilentAudioUnlockHandlers()

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)
