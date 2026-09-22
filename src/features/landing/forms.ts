export const formsApiBaseUrl =
  import.meta.env.VITE_FORMS_API_BASE_URL?.replace(/\/$/, "") ?? ""

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Anti-spam, invisible to people and to any third party.
//
// `honeypotFieldName` is rendered as an off-screen input on both forms. A
// person never sees it, so anything in it came from a script filling every
// input it found. `elapsedMs` is the time between the page loading and the
// submit; a bot fires within milliseconds, a person takes seconds to scroll,
// read and type. The serverless function checks both and quietly drops the
// submission when either looks automated.
export const honeypotFieldName = "company"

const pageLoadedAt = Date.now()

export type FormCheck = {
  company: string
  elapsedMs: number
}

export function buildFormCheck(trapValue: string): FormCheck {
  return {
    company: trapValue,
    elapsedMs: Date.now() - pageLoadedAt,
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
