import { devotionalDays } from './content.js'
import { workplaceDays } from './workplaceContent.js'

export const DEFAULT_THEME_ID = 'job-seeking'

export const devotionalThemes = [
  {
    id: DEFAULT_THEME_ID,
    label: 'Job Seeking',
    subtitle: 'A daily office for trust, identity, discernment, and perseverance.',
    days: devotionalDays
  },
  {
    id: 'challenges-at-work',
    label: 'Challenges at Work',
    subtitle: 'A daily office for wisdom, integrity, courage, and peace in your working life.',
    days: workplaceDays
  }
]

export function getTheme(themeId) {
  return devotionalThemes.find((theme) => theme.id === themeId) ?? devotionalThemes[0]
}

// Preserve existing numeric Job Seeking keys, including saved cloud progress.
export function progressKey(themeId, day) {
  return themeId === DEFAULT_THEME_ID ? String(day) : `${themeId}:${day}`
}

export function getThemeProgress(progress, theme) {
  return Object.fromEntries(theme.days
    .filter((day) => progress[progressKey(theme.id, day.day)] === true)
    .map((day) => [String(day.day), true]))
}

export function clearThemeProgress(progress, theme) {
  const next = { ...progress }
  theme.days.forEach((day) => delete next[progressKey(theme.id, day.day)])
  return next
}
