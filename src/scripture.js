const SUGGESTED_READING_PREFIX = 'Suggested reading:'
const PROVIDER_BIBLE_GATEWAY = 'biblegateway'
const PROVIDER_BIBLE_COM = 'biblecom'

export const BIBLE_PROVIDER_OPTIONS = [
  { value: PROVIDER_BIBLE_GATEWAY, label: 'BibleGateway' },
  { value: PROVIDER_BIBLE_COM, label: 'Bible.com' }
]

export const BIBLE_VERSION_OPTIONS = ['NIV', 'ESV', 'NLT', 'NKJV', 'KJV']

export const DEFAULT_BIBLE_SETTINGS = {
  provider: PROVIDER_BIBLE_GATEWAY,
  version: 'NIV'
}

function normalizeReference(reference) {
  return String(reference ?? '').replace(/\s+/g, ' ').trim()
}

function encodeReference(reference) {
  return encodeURIComponent(normalizeReference(reference))
}

function normalizeVersion(version) {
  const normalized = String(version ?? '').trim().toUpperCase()
  return BIBLE_VERSION_OPTIONS.includes(normalized) ? normalized : DEFAULT_BIBLE_SETTINGS.version
}

function normalizeProvider(provider) {
  const normalized = String(provider ?? '').trim().toLowerCase()
  return BIBLE_PROVIDER_OPTIONS.some((p) => p.value === normalized) ? normalized : DEFAULT_BIBLE_SETTINGS.provider
}

export function normalizeBibleSettings(settings = {}) {
  return {
    provider: normalizeProvider(settings.provider),
    version: normalizeVersion(settings.version)
  }
}

export function getFullScriptureText(day) {
  if (!day) return ''

  const explicitFullText = String(day.scriptureFullText ?? '').trim()
  if (explicitFullText) return explicitFullText

  const scriptureText = String(day.scriptureText ?? '').trim()
  const isPlaceholder = scriptureText.toLowerCase().startsWith(SUGGESTED_READING_PREFIX.toLowerCase())

  return isPlaceholder ? '' : scriptureText
}

export function getBibleGatewayUrl(reference, version = 'NIV') {
  const encodedReference = encodeReference(reference)
  const encodedVersion = encodeURIComponent(normalizeVersion(version))
  return `https://www.biblegateway.com/passage/?search=${encodedReference}&version=${encodedVersion}`
}

export function getBibleComSearchUrl(reference, version = 'NIV') {
  const query = `${normalizeReference(reference)} ${normalizeVersion(version)}`.trim()
  const encodedReference = encodeURIComponent(query)
  return `https://www.bible.com/search/bible?q=${encodedReference}`
}

export function getBibleProviderLabel(provider) {
  const normalizedProvider = normalizeProvider(provider)
  const providerOption = BIBLE_PROVIDER_OPTIONS.find((p) => p.value === normalizedProvider)
  return providerOption?.label ?? 'BibleGateway'
}

export function getBibleUrl(reference, settings = DEFAULT_BIBLE_SETTINGS) {
  const normalizedSettings = normalizeBibleSettings(settings)

  if (normalizedSettings.provider === PROVIDER_BIBLE_COM) {
    return getBibleComSearchUrl(reference, normalizedSettings.version)
  }

  return getBibleGatewayUrl(reference, normalizedSettings.version)
}
