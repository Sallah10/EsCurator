const STORAGE_KEY = 'escurator.session'

function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export function getSessionId() {
  try {
    const existing = window.localStorage.getItem(STORAGE_KEY)
    if (existing) return existing
    const created = createId()
    window.localStorage.setItem(STORAGE_KEY, created)
    return created
  } catch {
    // Private mode / storage disabled: fall back to an in-memory id.
    if (!window.__escuratorSession) {
      window.__escuratorSession = createId()
    }
    return window.__escuratorSession
  }
}
