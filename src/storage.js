import { DEFAULT_BIBLE_SETTINGS, normalizeBibleSettings } from './scripture'

const STORAGE_KEY = 'devotional-progress-v1'
const SETTINGS_STORAGE_KEY = 'devotional-settings-v1'

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

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY)
}

export function getCompletedCount() {
  return Object.keys(getProgress()).length
}

export function getBibleSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (!raw) return { ...DEFAULT_BIBLE_SETTINGS }
    const parsed = JSON.parse(raw)
    return normalizeBibleSettings(parsed)
  } catch {
    return { ...DEFAULT_BIBLE_SETTINGS }
  }
}

export function saveBibleSettings(nextSettings) {
  const merged = normalizeBibleSettings({
    ...getBibleSettings(),
    ...nextSettings
  })

  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged))
  return merged
}

export function setBibleSettings(settings) {
  const normalized = normalizeBibleSettings(settings)
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(normalized))
  return normalized
}
