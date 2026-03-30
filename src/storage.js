const STORAGE_KEY = 'devotional-progress-v1'

export function getProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export function isDayComplete(day) {
  const progress = getProgress()
  return Boolean(progress[String(day)])
}

export function markDayComplete(day) {
  const progress = getProgress()
  progress[String(day)] = true
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY)
}

export function getCompletedCount() {
  return Object.keys(getProgress()).length
}
