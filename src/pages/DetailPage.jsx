import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { devotionalDays } from '../content'
import { getBibleProviderLabel, getBibleUrl, getScriptureTextForVersion } from '../scripture'
import { useAppState } from '../context/AppStateContext'

export default function DetailPage() {
  const navigate = useNavigate()
  const { dayId } = useParams()
  const day = devotionalDays.find((d) => String(d.day) === String(dayId))
  const { bibleSettings, progress, markDayComplete } = useAppState()
  const [isSavingFinish, setIsSavingFinish] = useState(false)
  const [isCelebratingFinish, setIsCelebratingFinish] = useState(false)
  const redirectTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        window.clearTimeout(redirectTimerRef.current)
      }
    }
  }, [])

  if (!day) {
    return (
      <div className="page page-detail">
        <div className="container narrow">
          <p>Day not found.</p>
          <Link to="/" className="link-btn">Back to list</Link>
        </div>
      </div>
    )
  }

  const completed = Boolean(progress[String(day.day)])
  const selectedScriptureText = getScriptureTextForVersion(day, bibleSettings.version)
  const preferredProviderLabel = getBibleProviderLabel(bibleSettings.provider)
  const preferredBibleUrl = getBibleUrl(day.scripture, bibleSettings)
  const alternateProvider = bibleSettings.provider === 'biblegateway' ? 'biblecom' : 'biblegateway'
  const alternateProviderLabel = getBibleProviderLabel(alternateProvider)
  const alternateBibleUrl = getBibleUrl(day.scripture, { ...bibleSettings, provider: alternateProvider })

  async function handleFinish() {
    if (completed || isSavingFinish || isCelebratingFinish) return

    setIsSavingFinish(true)
    try {
      await markDayComplete(day.day)
      setIsCelebratingFinish(true)

      redirectTimerRef.current = window.setTimeout(() => {
        navigate('/')
      }, 2400)
    } finally {
      setIsSavingFinish(false)
    }
  }

  return (
    <div className="page page-detail">
      <div className="container narrow">
        <Link to="/" className="back-link">← Back to 30 days</Link>
        <article className="card detail-card">
          <div className="detail-head-row">
            <div className="eyebrow">Day {day.day}</div>
            <div className={completed ? 'detail-complete-badge complete' : 'detail-complete-badge'}>
              {completed ? 'Completed' : 'In Progress'}
            </div>
          </div>
          <h1 className="detail-title">{day.title.replace(`Day ${day.day} — `, '')}</h1>

          <section className="section">
            <h2>Scripture</h2>
            <p className="scripture-ref">{day.scripture}</p>
            {selectedScriptureText ? (
              <p>{selectedScriptureText}</p>
            ) : (
              <p className="muted-text">Scripture text is unavailable for this version. Please use the open link below.</p>
            )}
            <p className="muted-text">Preferred app: {preferredProviderLabel} ({bibleSettings.version})</p>
            <div className="scripture-links">
              <a href={preferredBibleUrl} target="_blank" rel="noreferrer">
                Open in {preferredProviderLabel} ({bibleSettings.version})
              </a>
              <a href={alternateBibleUrl} target="_blank" rel="noreferrer">
                Open in {alternateProviderLabel}
              </a>
            </div>
          </section>

          <section className="section">
            <h2>Devotional</h2>
            {day.devotional.split('\n\n').map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </section>

          <section className="section">
            <h2>Questions</h2>
            <ul>
              {day.questions.map((q) => <li key={q}>{q}</li>)}
            </ul>
          </section>

          <section className="section">
            <h2>Reflection</h2>
            <p>{day.reflection}</p>
          </section>

          <section className="section">
            <h2>Prayer</h2>
            <p>{day.prayer}</p>
          </section>

          <button
            className={isCelebratingFinish ? 'primary-btn detail-finish-btn celebrating' : 'primary-btn detail-finish-btn'}
            onClick={handleFinish}
            disabled={completed || isSavingFinish || isCelebratingFinish}
          >
            {isCelebratingFinish ? 'Checked ✓' : isSavingFinish ? 'Saving...' : completed ? 'Finished' : 'Mark as Finished'}
          </button>
        </article>
      </div>

      {isCelebratingFinish && (
        <div className="finish-overlay" role="status" aria-live="polite">
          <div className="finish-overlay-panel">
            <span className="finish-check finish-check-overlay">✓</span>
            <p className="finish-overlay-title">Day marked as finished</p>
            <p className="finish-overlay-subtitle">Returning to your 30-day list...</p>
            <div className="finish-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
