// iOS mute-switch workaround
// ─────────────────────────────────────────────────────────────────────────────
// On iPhone/iPad the audio session starts in "Ring/Silent" category, which
// means Web Audio output is silenced by the hardware mute switch.  Playing any
// sound through an <audio> element (even a silent MP3) from inside a user
// gesture promotes the session to "Playback" category, which bypasses the
// mute switch.  All subsequent Web Audio / Tone.js output then flows through
// the same unlocked session.
//
// Pattern matches orbiters/src/audio/SilentAudioUnlock.js

let audioUnlocked = false
let unlockPromise: Promise<boolean> | null = null
let audioEl: HTMLAudioElement | null = null

function getAudioElement(): HTMLAudioElement {
  if (!audioEl) {
    audioEl = document.createElement("audio")
    audioEl.setAttribute("playsinline", "")
    audioEl.setAttribute("preload", "auto")
    audioEl.src = "/assets/sounds/silent.mp3"
    audioEl.style.display = "none"
    document.body.appendChild(audioEl)
  }
  return audioEl
}

export function ensureSilentAudioUnlock(): Promise<boolean> {
  if (audioUnlocked) return Promise.resolve(true)
  if (unlockPromise) return unlockPromise

  const el = getAudioElement()

  unlockPromise = Promise.resolve(el.play())
    .then(() => {
      el.pause()
      el.currentTime = 0
      audioUnlocked = true
      unlockPromise = null
      return true
    })
    .catch(() => {
      unlockPromise = null
      return false
    })

  return unlockPromise
}

/** Call once on app init — registers one-shot listeners on the first gesture. */
export function registerSilentAudioUnlockHandlers(): void {
  const attempt = () => {
    void ensureSilentAudioUnlock()
  }
  for (const event of ["pointerdown", "touchstart", "keydown"] as const) {
    document.addEventListener(event, attempt, { once: true, passive: true })
  }
}
