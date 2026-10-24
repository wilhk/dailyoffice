import test from 'node:test'
import assert from 'node:assert/strict'
import { clearThemeProgress, DEFAULT_THEME_ID, devotionalThemes, getTheme, getThemeProgress, progressKey } from '../src/themes.js'
import { getScriptureTextForVersion, getBibleUrl } from '../src/scripture.js'
import { getActiveThemeId, saveActiveThemeId } from '../src/storage.js'

test('both themes have complete, consecutively numbered devotional content', () => {
  assert.equal(getTheme(DEFAULT_THEME_ID).days.length, 30)
  assert.equal(getTheme('challenges-at-work').days.length, 60)
  for (const theme of devotionalThemes) {
    assert.equal(new Set(theme.days.map((day) => day.title)).size, theme.days.length)
    for (const [index, day] of theme.days.entries()) {
      assert.equal(day.day, index + 1)
      for (const field of ['title', 'scripture', 'scriptureFullText', 'devotional', 'reflection', 'prayer']) {
        assert.ok(day[field]?.trim(), `${theme.id} day ${day.day}: missing ${field}`)
      }
      assert.equal(day.questions.length, 3)
      assert.equal(new Set(day.questions).size, 3)
      assert.ok(day.questions.every((question) => question?.trim()))
      assert.ok(!/<[^>]+>|Suggested reading:/.test(day.scriptureFullText))
    }
  }
})

test('legacy numeric progress stays assigned to Job Seeking', () => {
  const saved = { 1: true, 3: true, 'challenges-at-work:2': true }
  assert.deepEqual(getThemeProgress(saved, getTheme(DEFAULT_THEME_ID)), { 1: true, 3: true })
  assert.deepEqual(getThemeProgress(saved, getTheme('challenges-at-work')), { 2: true })
  assert.equal(progressKey(DEFAULT_THEME_ID, 1), '1')
  assert.equal(progressKey('challenges-at-work', 1), 'challenges-at-work:1')
})

test('completion and reset affect only the selected theme', () => {
  const saved = { 1: true, 30: true, 'challenges-at-work:1': true, 'challenges-at-work:60': true }
  assert.deepEqual(clearThemeProgress(saved, getTheme('challenges-at-work')), { 1: true, 30: true })
  assert.deepEqual(clearThemeProgress(saved, getTheme(DEFAULT_THEME_ID)), { 'challenges-at-work:1': true, 'challenges-at-work:60': true })
  assert.equal(Object.keys(saved).length, 4, 'reset does not mutate the original state')
})

test('counts ignore false values, unknown days, and other themes', () => {
  const saved = { 1: true, 2: false, 31: true, 'challenges-at-work:60': true, 'challenges-at-work:61': true }
  assert.equal(Object.keys(getThemeProgress(saved, getTheme(DEFAULT_THEME_ID))).length, 1)
  assert.deepEqual(getThemeProgress(saved, getTheme('challenges-at-work')), { 60: true })
})

test('theme selection persists and invalid selections use the existing theme', () => {
  const values = new Map()
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value)
  }
  assert.equal(getActiveThemeId(), DEFAULT_THEME_ID)
  saveActiveThemeId('challenges-at-work')
  assert.equal(getActiveThemeId(), 'challenges-at-work')
  assert.equal(getTheme('unknown').id, DEFAULT_THEME_ID)
  assert.equal(getTheme(null).id, DEFAULT_THEME_ID)
  delete globalThis.localStorage
  assert.equal(getActiveThemeId(), DEFAULT_THEME_ID, 'unavailable storage falls back safely')
})

test('workplace passages have offline text and links retain the preferred version', () => {
  for (const day of getTheme('challenges-at-work').days) {
    assert.equal(day.scriptureTranslation, 'World English Bible (WEB)')
    assert.equal(getScriptureTextForVersion(day, 'NIV'), day.scriptureFullText)
    const url = new URL(getBibleUrl(day.scripture, { provider: 'biblegateway', version: 'CNV' }))
    assert.equal(url.searchParams.get('version'), 'CNVT')
    assert.equal(url.searchParams.get('search'), day.scripture)
  }
})
