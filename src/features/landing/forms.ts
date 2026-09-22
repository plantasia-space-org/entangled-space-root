export const formsApiBaseUrl =
  import.meta.env.VITE_FORMS_API_BASE_URL?.replace(/\/$/, "") ?? ""

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Anti-spam, invisible to people and to any third party.
//
// `honeypotFieldName` is rendered as an off-screen input on both forms. A
// person never sees it, so anything in it came from a script filling every
// input it found. `interacted` says whether anyone ever focused or typed in
// the form, which nobody filling one in can avoid. `elapsedMs` is the time
// between the page loading and the submit. The serverless function checks all
// three and quietly drops the submission when it looks automated.
//
// The name matters: see the note in honeypot-field.tsx about keeping it clear
// of the browser's address-autofill vocabulary.
export const honeypotFieldName = "subject"

const pageLoadedAt = Date.now()

export type FormCheck = {
  subject: string
  elapsedMs: number
  interacted: boolean
}

export function buildFormCheck(
  trapValue: string,
  interacted: boolean
): FormCheck {
  return {
    // Computed, so renaming the constant moves the DOM attribute and the wire
    // key together instead of quietly leaving them disagreeing.
    [honeypotFieldName]: trapValue,
    elapsedMs: Date.now() - pageLoadedAt,
    interacted,
  }
}

export type FormStatus =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success"; message: string }
  | { type: "error"; message: string }

export function buildFormsApiUrl(path: string) {
  if (!formsApiBaseUrl) {
    throw new Error("Form submission is not configured.")
  }

  return `${formsApiBaseUrl}${path}`
}

export function getStatusMessage(status: FormStatus, fallback: string) {
  if (status.type === "success" || status.type === "error") {
    return status.message
  }

  return fallback
}

export async function postFormJson(path: string, payload: unknown) {
  const response = await fetch(buildFormsApiUrl(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const body = await response.json().catch(() => null)

  if (!response.ok || !body?.success) {
    throw new Error(body?.message || "Unable to submit form")
  }

  return body as { success: true; submissionId: string; status: string }
}
