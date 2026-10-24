import { BIBLE_PROVIDER_OPTIONS, BIBLE_VERSION_OPTIONS } from '../scripture'
import { useAppState } from '../context/AppStateContext'

export default function BibleSettingsDialog({ isOpen, onClose }) {
  const { bibleSettings, updateBibleSettings } = useAppState()

  async function handleSettingsChange(field, value) {
    await updateBibleSettings({ [field]: value })
  }

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bible-settings-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="bible-settings-dialog-title">Bible Settings</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="settings-grid settings-grid-modal">
          <label className="setting-field">
            <span>Provider</span>
            <select
              value={bibleSettings.provider}
              onChange={(e) => handleSettingsChange('provider', e.target.value)}
            >
              {BIBLE_PROVIDER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="setting-field">
            <span>Version</span>
            <select
              value={bibleSettings.version}
              onChange={(e) => handleSettingsChange('version', e.target.value)}
            >
              {BIBLE_VERSION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>
  )
}
