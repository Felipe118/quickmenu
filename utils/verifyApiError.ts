export function verifyApiError(error: any, fallback = 'Erro inesperado'): string {
  const data = error?.data

  if (typeof data?.error === 'string')
    return data.error

  if (typeof data?.error === 'object' && data.error !== null) {
    const firstValue = Object.values(data.error)[0]

    return Array.isArray(firstValue) ? firstValue[0] ?? fallback : String(firstValue)
  }

  if (data?.message)
    return data.message

  return fallback
}
