import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../context/AppStateContext'
import BibleSettingsDialog from '../components/BibleSettingsDialog'

export default function ListingPage() {
  const navigate = useNavigate()
  const {
    authEnabled,
    authLoading,
    dataLoading,
    errorMessage,
    setErrorMessage,
    user,
    activeTheme,
    progress,
    completedCount,
    resetProgress,
    signUp,
    signIn,
    signOut
  } = useAppState()
  const devotionalDays = activeTheme.days

  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const [authMode, setAuthMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authBusy, setAuthBusy] = useState(false)
  const [authSuccessMessage, setAuthSuccessMessage] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isBibleSettingsOpen, setIsBibleSettingsOpen] = useState(false)
  const cardGridRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const cardGrid = cardGridRef.current
    if (!cardGrid) return

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotionQuery.matches) return

    let frameId = 0
    let ticking = false

    const updateCards = () => {
      ticking = false
      const cards = cardGrid.querySelectorAll('.list-item')
      const viewportCenter = window.innerHeight * 0.52
      const viewportRange = window.innerHeight * 0.68

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const cardCenter = rect.top + rect.height / 2
        const distance = (cardCenter - viewportCenter) / viewportRange
        const clamped = Math.max(-1, Math.min(1, distance))
        const depth = 1 - Math.min(1, Math.abs(clamped))

        card.style.setProperty('--scroll-progress', clamped.toFixed(4))
        card.style.setProperty('--scroll-depth', depth.toFixed(4))
      })
    }

    const requestUpdate = () => {
      if (ticking) return
      ticking = true
      frameId = window.requestAnimationFrame(updateCards)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    function handlePointerDown(event) {
      if (!menuRef.current) return
      if (!menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isMenuOpen])

  async function handleReset() {
    await resetProgress()
    setIsMenuOpen(false)
  }

  function openBibleSettingsDialog() {
    setIsMenuOpen(false)
    setIsBibleSettingsOpen(true)
  }

  function closeBibleSettingsDialog() {
    setIsBibleSettingsOpen(false)
  }

  function openAuthDialog() {
    setIsMenuOpen(false)
    setAuthMode('signin')
    setAuthSuccessMessage('')
    setErrorMessage('')
    setIsAuthDialogOpen(true)
  }

  function closeAuthDialog() {
    if (authBusy) return
    setIsAuthDialogOpen(false)
    setPassword('')
  }

  async function handleAuthSubmit(event) {
    event.preventDefault()

    setAuthSuccessMessage('')
    setErrorMessage('')
    setAuthBusy(true)

    const payload = {
      email: email.trim(),
      password
    }

    let ok = false

    if (authMode === 'signup') {
      ok = await signUp(payload)
      if (ok) {
        setAuthMode('signin')
        setPassword('')
        setAuthSuccessMessage('Account created. Please sign in with your new account.')
      }
    } else {
      ok = await signIn(payload)
      if (ok) {
        setAuthSuccessMessage('Signed in successfully.')
        setIsAuthDialogOpen(false)
        setPassword('')
      }
    }

    setAuthBusy(false)
  }

  async function handleSignOut() {
    setIsMenuOpen(false)
    setAuthSuccessMessage('')
    setErrorMessage('')
    await signOut()
    setAuthSuccessMessage('Signed out.')
  }

  return (
    <div className="page page-listing">
      <div className="container">
        <header className="header">
          <div>
            <h1>{devotionalDays.length}-Day Daily Office: {activeTheme.label}</h1>
            <p className="subtitle">{activeTheme.subtitle}</p>
          </div>
          <div className="actions">
            <div className="progress-pill">{completedCount}/{devotionalDays.length} completed</div>
            <div className="header-menu-wrap" ref={menuRef}>
              <button
                className="secondary-btn menu-toggle"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-expanded={isMenuOpen}
                aria-haspopup="menu"
              >
                Menu
              </button>

              {isMenuOpen && (
                <div className="header-menu" role="menu" aria-label="Page menu">
                  <button className="menu-item-btn" onClick={handleReset} disabled={dataLoading}>
                    Reset {activeTheme.label} Progress
                  </button>
                  <button className="menu-item-btn" onClick={openBibleSettingsDialog}>
                    Bible Settings
                  </button>

                  <div className="menu-divider" />

                  {authEnabled && authLoading && <p className="menu-meta">Checking session...</p>}

                  {authEnabled && !authLoading && !user && (
                    <button className="menu-item-btn" onClick={openAuthDialog}>Log in</button>
                  )}

                  {authEnabled && !authLoading && user && (
                    <>
                      <p className="menu-meta">Signed in as {user.email}</p>
                      <button className="menu-item-btn" onClick={handleSignOut}>Sign out</button>
                    </>
                  )}

                  {!authEnabled && (
                    <p className="menu-meta">Cloud sync is disabled until Supabase env vars are set.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {authEnabled && user && dataLoading && (
          <p className="muted-text state-loading">Loading your saved progress...</p>
        )}

        {authSuccessMessage && <p className="success-text">{authSuccessMessage}</p>}
        {errorMessage && <p className="error-text">{errorMessage}</p>}

        <div className="list" ref={cardGridRef}>
          {devotionalDays.map((day, index) => {
            const complete = Boolean(progress[String(day.day)])
            return (
              <button
                key={day.day}
                className="list-item"
                onClick={() => navigate(`/day/${day.day}`)}
                style={{ '--card-index': index }}
              >
                <div className="list-item-head">
                  <div className="day-num">Day {day.day}</div>
                  <div className={complete ? 'check complete' : 'check'} aria-label={complete ? 'completed' : 'not completed'}>
                    {complete ? '✓' : ''}
                  </div>
                </div>

                <div className="list-main">
                  <div className="list-title">{day.title.replace(`Day ${day.day} — `, '')}</div>
                  <div className="list-scripture">{day.scripture}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {authEnabled && isAuthDialogOpen && (
        <div className="modal-backdrop" onClick={closeAuthDialog}>
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <h2 id="auth-dialog-title">{authMode === 'signup' ? 'Create account' : 'Log in'}</h2>
              <button className="icon-btn" onClick={closeAuthDialog} aria-label="Close">×</button>
            </div>

            <form className="auth-form" onSubmit={handleAuthSubmit}>
              <div className="auth-mode-row">
                <button
                  type="button"
                  className={authMode === 'signin' ? 'auth-mode-btn active' : 'auth-mode-btn'}
                  onClick={() => setAuthMode('signin')}
                >
                  Log in
                </button>
                <button
                  type="button"
                  className={authMode === 'signup' ? 'auth-mode-btn active' : 'auth-mode-btn'}
                  onClick={() => setAuthMode('signup')}
                >
                  Sign up
                </button>
              </div>

              <label className="setting-field">
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                />
              </label>

              <label className="setting-field">
                <span>Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'}
                  minLength={6}
                />
              </label>

              <button className="primary-btn" type="submit" disabled={authBusy}>
                {authBusy ? 'Working...' : authMode === 'signup' ? 'Create account' : 'Log in'}
              </button>
            </form>

            {authSuccessMessage && <p className="success-text">{authSuccessMessage}</p>}
            {errorMessage && <p className="error-text">{errorMessage}</p>}
          </div>
        </div>
      )}

      <BibleSettingsDialog isOpen={isBibleSettingsOpen} onClose={closeBibleSettingsDialog} />
    </div>
  )
}
