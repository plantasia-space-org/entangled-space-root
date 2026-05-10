import { Reverb, getContext, now, start as toneStart } from "tone"
import { getFreq, type SnailVoice } from "./snail-synth-data"

// ── Audio chain ───────────────────────────────────────────────────────────────
// voices → compressor → reverb → destination
// Both nodes are created lazily on first use so they share the same AudioContext
// that Tone has already initialised.

let masterNode: DynamicsCompressorNode | null = null

function getMaster(): DynamicsCompressorNode {
  const ctx = getContext().rawContext as AudioContext
  if (!masterNode) {
    // Short room reverb — 1.4 s decay, subtle 20 % wet mix.
    // Tone.Reverb is convolution-based; the impulse response generates
    // asynchronously but is ready within a few milliseconds.
    const reverb = new Reverb({ decay: 1.4, preDelay: 0.015, wet: 0.2 })
    void reverb.toDestination()

    const comp = ctx.createDynamicsCompressor()
    comp.threshold.value = -14
    comp.knee.value = 8
    comp.ratio.value = 5
    comp.attack.value = 0.003
    comp.release.value = 0.18
    // reverb.input is a Tone Gain; .input on that is the raw GainNode.
    comp.connect(reverb.input.input)
    masterNode = comp
  }
  return masterNode
}

function getRawCtx(): AudioContext {
  return getContext().rawContext as AudioContext
}

// ── Voices ────────────────────────────────────────────────────────────────────

const VOICES: Record<SnailVoice, (freq: number, when: number) => void> = {
  sine(freq, when) {
    const ctx = getRawCtx()
    const out = getMaster()
    const osc = ctx.createOscillator()
    const env = ctx.createGain()

    osc.type = "sine"
    osc.frequency.setValueAtTime(freq, when)
    env.gain.setValueAtTime(0, when)
    env.gain.linearRampToValueAtTime(0.45, when + 0.012)
    env.gain.exponentialRampToValueAtTime(0.001, when + 2.2)

    osc.connect(env)
    env.connect(out)
    osc.start(when)
    osc.stop(when + 2.3)
  },

  marimba(freq, when) {
    const ctx = getRawCtx()
    const out = getMaster()
    const partials = [
      { ratio: 1, amp: 0.54, attack: 0.002, decay: 1.5 },
      { ratio: 3.74, amp: 0.24, attack: 0.001, decay: 0.16 },
      { ratio: 9.8, amp: 0.1, attack: 0.001, decay: 0.04 },
    ]

    partials.forEach(({ ratio, amp, attack, decay }) => {
      const osc = ctx.createOscillator()
      const env = ctx.createGain()

      osc.type = "sine"
      osc.frequency.setValueAtTime(freq * ratio, when)
      env.gain.setValueAtTime(0, when)
      env.gain.linearRampToValueAtTime(amp, when + attack)
      env.gain.exponentialRampToValueAtTime(0.001, when + decay)

      osc.connect(env)
      env.connect(out)
      osc.start(when)
      osc.stop(when + decay + 0.05)
    })
  },

  koto(freq, when) {
    const ctx = getRawCtx()
    const out = getMaster()
    const sharp = 1.015
    const harmonics = [
      { ratio: 1, amp: 0.5, decay: 2.4 },
      { ratio: 2, amp: 0.22, decay: 1 },
      { ratio: 3, amp: 0.11, decay: 0.45 },
      { ratio: 4, amp: 0.05, decay: 0.22 },
      { ratio: 5, amp: 0.02, decay: 0.12 },
    ]

    harmonics.forEach(({ ratio, amp, decay }) => {
      const osc = ctx.createOscillator()
      const env = ctx.createGain()

      osc.type = "sine"
      osc.frequency.setValueAtTime(freq * ratio * sharp, when)
      osc.frequency.exponentialRampToValueAtTime(freq * ratio, when + 0.06)
      env.gain.setValueAtTime(0, when)
      env.gain.linearRampToValueAtTime(amp, when + 0.003)
      env.gain.exponentialRampToValueAtTime(0.001, when + decay)

      osc.connect(env)
      env.connect(out)
      osc.start(when)
      osc.stop(when + decay + 0.05)
    })

    const clickLength = Math.floor(ctx.sampleRate * 0.005)
    const clickBuffer = ctx.createBuffer(1, clickLength, ctx.sampleRate)
    const data = clickBuffer.getChannelData(0)

    for (let i = 0; i < clickLength; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / clickLength)
    }

    const source = ctx.createBufferSource()
    const clickGain = ctx.createGain()
    source.buffer = clickBuffer
    clickGain.gain.setValueAtTime(0.14, when)
    source.connect(clickGain)
    clickGain.connect(out)
    source.start(when)
  },
}

// ── Public API ────────────────────────────────────────────────────────────────

// 50 ms lookahead gives the audio engine time to prepare nodes before playback,
// eliminating glitches when the main thread is briefly busy. Callers may pass
// an explicit `when` (e.g. a Transport callback time) to override.
export function playVoice(voice: SnailVoice, noteIndex: number, period: number, when?: number): void {
  VOICES[voice](getFreq(noteIndex, period), when ?? (now() + 0.05))
}

export { toneStart }
