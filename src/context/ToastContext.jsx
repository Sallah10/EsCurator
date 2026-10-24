import { useCallback, useEffect, useRef, useState } from 'react'
import { ToastContext } from './toastContext'

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timer = useRef(null)

  const notify = useCallback((message) => {
    if (!message) return
    window.clearTimeout(timer.current)
    setToast({ message, id: Date.now() })
    timer.current = window.setTimeout(() => setToast(null), 2600)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div className="toast-region" role="status" aria-live="polite">
        {toast && (
          <div className="toast" key={toast.id}>
            {toast.message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  )
}
