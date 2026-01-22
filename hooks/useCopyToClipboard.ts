import { useCallback } from 'react'
import { toast } from 'sonner'

interface UseCopyToClipboardOptions {
  successMessage?: string
  errorMessage?: string
}

export const useCopyToClipboard = (options: UseCopyToClipboardOptions = {}) => {
  const {
    successMessage = 'Copiado',
    errorMessage = 'Tu navegador bloqueó el acceso al portapapeles.',
  } = options

  const copy = useCallback(
    async (text: string, customSuccessMessage?: string): Promise<boolean> => {
      if (!text) return false

      try {
        await navigator.clipboard.writeText(text)
        toast.success('Copiado', {
          description: customSuccessMessage || successMessage,
        })
        return true
      } catch (err) {
        console.log('🚀 ~ useCopyToClipboard ~ err:', err)
        toast.error('No se pudo copiar', {
          description: errorMessage,
        })
        return false
      }
    },
    [successMessage, errorMessage]
  )

  return { copy }
}
