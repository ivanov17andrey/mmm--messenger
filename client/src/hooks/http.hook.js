import { useState, useCallback } from 'react'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true)

      try {
				if (body) {
					body = JSON.stringify(body)
					headers['Content-Type'] = 'application/json'
				}

        const response = await fetch(url, { method, body, headers })
        const data = await response.json()

        if (!response.ok) {
					setError(data.errors ? data.errors[0].msg : null || data.message)
					throw new Error(data.message)
        }

        setLoading(false)

        return data
      } catch (err) {
        setLoading(false)
        setError(err.message)
      }
    },
    []
	)
	
	const clearError = useCallback(() => setError(null), [setError])

  return { loading, request, error, clearError }
}
