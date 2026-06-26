const FORMSPREE_ENDPOINT = 'https://formspree.io/f'
const DEFAULT_CONTACT_FORM_ID = 'xkolrwoa'
const DEFAULT_GROUP_FORM_ID = 'xqevqzqb'

export function formspreeContactFormId(): string {
  return process.env.FORMSPREE_CONTACT_FORM_ID?.trim() || DEFAULT_CONTACT_FORM_ID
}

export function formspreeGroupFormId(): string {
  return process.env.FORMSPREE_GROUP_FORM_ID?.trim() || DEFAULT_GROUP_FORM_ID
}

export function formspreeConfigured(): boolean {
  return Boolean(formspreeContactFormId())
}

type FormspreePayload = Record<string, string>

export async function submitToFormspree(
  formId: string,
  fields: FormspreePayload,
): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  if (!formId) {
    return { ok: false, status: 503, message: 'Formulier is nog niet gekoppeld aan Formspree.' }
  }

  const res = await fetch(`${FORMSPREE_ENDPOINT}/${formId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(fields),
  })

  if (res.ok) {
    return { ok: true }
  }

  const data = (await res.json().catch(() => ({}))) as { error?: string }
  return {
    ok: false,
    status: res.status,
    message: data.error ?? 'Verzenden via Formspree is mislukt.',
  }
}
