import { useNavigate } from 'react-router-dom'
import { devotionalDays } from '../content'
import { useState } from 'react'
import { BIBLE_PROVIDER_OPTIONS, BIBLE_VERSION_OPTIONS } from '../scripture'
import { useAppState } from '../context/AppStateContext'

export default function ListingPage() {
  const navigate = useNavigate()
  const {
    authEnabled,
    authLoading,
    dataLoading,
    errorMessage,
    setErrorMessage,
    user,
    progress,
    completedCount,
    bibleSettings,
    resetProgress,
    updateBibleSettings,
    signUp,
    signIn,
    signOut
  } = useAppState()

  const [authMode, setAuthMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authBusy, setAuthBusy] = useState(false)
  const [authSuccessMessage, setAuthSuccessMessage] = useState('')

  async function handleReset() {
    await resetProgress()
  }

  async function handleSettingsChange(field, value) {
    await updateBibleSettings({ [field]: value })
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
        setAuthSuccessMessage('Account created. If email confirmation is enabled, please confirm your email before signing in.')
      }
    } else {
      ok = await signIn(payload)
      if (ok) {
        setAuthSuccessMessage('Signed in successfully.')
      }
    }

    setAuthBusy(false)
  }

  async function handleSignOut() {
    await signOut()
    setAuthSuccessMessage('Signed out.')
  }

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <div>
            <h1>30-Day Daily Office during job searching</h1>
            <p className="subtitle">A daily office for trust, identity, discernment, and perseverance.</p>
          </div>
          <div className="actions">
            <div className="progress-pill">{completedCount}/{devotionalDays.length} completed</div>
            <button className="secondary-btn" onClick={handleReset} disabled={dataLoading}>Reset Progress</button>
          </div>
        </header>

        <section className="settings-card" aria-label="Account settings">
          <h2>Account</h2>

          {!authEnabled && (
            <p className="muted-text">Supabase is not configured yet. The app is running in local-only mode.</p>
          )}

          {authEnabled && authLoading && (
            <p className="muted-text">Checking session...</p>
          )}

          {authEnabled && !authLoading && user && (
            <div className="auth-status-row">
              <p className="muted-text">Signed in as {user.email}</p>
              <button className="secondary-btn" onClick={handleSignOut}>Sign out</button>
            </div>
          )}

          {authEnabled && !authLoading && !user && (
            <form className="auth-form" onSubmit={handleAuthSubmit}>
              <div className="auth-mode-row">
                <button
                  type="button"
                  className={authMode === 'signin' ? 'auth-mode-btn active' : 'auth-mode-btn'}
                  onClick={() => setAuthMode('signin')}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  className={authMode === 'signup' ? 'auth-mode-btn active' : 'auth-mode-btn'}
                  onClick={() => setAuthMode('signup')}
                >
                  Sign up
                </button>
              </div>

              <div className="settings-grid">
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
              </div>

              <button className="primary-btn auth-submit" type="submit" disabled={authBusy}>
                {authBusy ? 'Working...' : authMode === 'signup' ? 'Create account' : 'Sign in'}
              </button>
            </form>
          )}

          {authSuccessMessage && <p className="success-text">{authSuccessMessage}</p>}
          {errorMessage && <p className="error-text">{errorMessage}</p>}
        </section>

        <section className="settings-card" aria-label="Bible settings">
          <h2>Bible Settings</h2>
          <div className="settings-grid">
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
        </section>

        <div className="list">
          {devotionalDays.map((day) => {
            const complete = Boolean(progress[String(day.day)])
            return (
              <button
                key={day.day}
                className="list-item"
                onClick={() => navigate(`/day/${day.day}`)}
              >
                <div className="list-main">
                  <div className="day-num">Day {day.day}</div>
                  <div>
                    <div className="list-title">{day.title.replace(`Day ${day.day} — `, '')}</div>
                    <div className="list-scripture">{day.scripture}</div>
                  </div>
                </div>
                <div className={complete ? 'check complete' : 'check'} aria-label={complete ? 'completed' : 'not completed'}>
                  {complete ? '✓' : ''}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
