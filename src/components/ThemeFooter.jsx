import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { devotionalThemes } from '../themes'
import { useAppState } from '../context/AppStateContext'

export default function ThemeFooter() {
  const { activeTheme, changeTheme } = useAppState()
  const dialogRef = useRef(null)
  const navigate = useNavigate()

  function selectTheme(themeId) {
    dialogRef.current.close()
    if (themeId === activeTheme.id) return
    changeTheme(themeId)
    navigate('/')
    window.scrollTo(0, 0)
  }

  return (
    <footer className="theme-footer">
      <button
        className="theme-trigger"
        aria-haspopup="dialog"
        aria-controls="theme-dialog"
        onClick={() => dialogRef.current.showModal()}
      >
        <span className="theme-caption">Current theme</span>
        <span className="theme-name">{activeTheme.label} <span aria-hidden="true">⌃</span></span>
      </button>

      <dialog
        id="theme-dialog"
        ref={dialogRef}
        className="theme-dialog modal-card"
        aria-labelledby="theme-dialog-title"
        aria-describedby="theme-dialog-description"
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            const rect = dialogRef.current.getBoundingClientRect()
            if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
              dialogRef.current.close()
            }
          }
        }}
      >
        <div className="modal-header">
          <h2 id="theme-dialog-title">Choose your theme</h2>
          <button className="icon-btn" onClick={() => dialogRef.current.close()} aria-label="Close theme selector">×</button>
        </div>
        <p id="theme-dialog-description" className="muted-text">Find encouragement for your season. Your progress is saved separately for each theme.</p>
        <div className="theme-options">
          {devotionalThemes.map((theme) => (
            <button
              key={theme.id}
              className={`theme-option${theme.id === activeTheme.id ? ' selected' : ''}`}
              aria-pressed={theme.id === activeTheme.id}
              onClick={() => selectTheme(theme.id)}
            >
              <span className="theme-option-heading">
                <strong>{theme.label}</strong>
                <span>{theme.id === activeTheme.id ? 'Active ✓' : `${theme.days.length} days`}</span>
              </span>
              <span>{theme.days.length} days · {theme.subtitle}</span>
            </button>
          ))}
        </div>
      </dialog>
    </footer>
  )
}
