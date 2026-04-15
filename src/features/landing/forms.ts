export const formsApiBaseUrl =
  import.meta.env.VITE_FORMS_API_BASE_URL?.replace(/\/$/, "") ?? ""

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type FormStatus =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success"; message: string }
  | { type: "error"; message: string }

export function buildFormsApiUrl(path: string) {
  return formsApiBaseUrl ? `${formsApiBaseUrl}${path}` : path
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
