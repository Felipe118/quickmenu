
export function handleError(error: unknown): string {
  if (error && typeof error === 'object' && 'statusCode' in error) {
    const fetchError = error as { statusCode?: number, data?: Record<string, unknown> }
    const status = fetchError.statusCode ?? 500

    if (status >= 400 && status < 500)
      return verifyApiError(fetchError, 'Erro na requisição')

    return 'Erro no servidor, tente novamente'
  }

  if (error instanceof Error)
    return error.message

  return 'Ops, algo deu errado , tente novamente'
}
