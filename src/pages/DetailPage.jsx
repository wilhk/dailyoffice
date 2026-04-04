import { Link, useParams } from 'react-router-dom'
import { devotionalDays } from '../content'
import { getBibleSettings, isDayComplete, markDayComplete } from '../storage'
import { useState } from 'react'
import { getBibleProviderLabel, getBibleUrl, getFullScriptureText } from '../scripture'

export default function DetailPage() {
  const { dayId } = useParams()
  const day = devotionalDays.find((d) => String(d.day) === String(dayId))
  const [completed, setCompleted] = useState(day ? isDayComplete(day.day) : false)

  if (!day) {
    return (
      <div className="page">
        <div className="container narrow">
          <p>Day not found.</p>
          <Link to="/" className="link-btn">Back to list</Link>
        </div>
      </div>
    )
  }

  function handleFinish() {
    markDayComplete(day.day)
    setCompleted(true)
  }

  const fullScriptureText = getFullScriptureText(day)
  const bibleSettings = getBibleSettings()
  const preferredProviderLabel = getBibleProviderLabel(bibleSettings.provider)
  const preferredBibleUrl = getBibleUrl(day.scripture, bibleSettings)
  const alternateProvider = bibleSettings.provider === 'biblegateway' ? 'biblecom' : 'biblegateway'
  const alternateProviderLabel = getBibleProviderLabel(alternateProvider)
  const alternateBibleUrl = getBibleUrl(day.scripture, { ...bibleSettings, provider: alternateProvider })

  return (
    <div className="page">
      <div className="container narrow">
        <Link to="/" className="back-link">← Back</Link>
        <article className="card">
          <div className="eyebrow">Day {day.day}</div>
          <h1>{day.title.replace(`Day ${day.day} — `, '')}</h1>

          <section className="section">
            <h2>Scripture</h2>
            <p className="scripture-ref">{day.scripture}</p>
            {fullScriptureText ? (
              <p>{fullScriptureText}</p>
            ) : (
              <p className="muted-text">Full scripture text is not stored for this day yet.</p>
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

          <button className="primary-btn" onClick={handleFinish} disabled={completed}>
            {completed ? 'Finished' : 'Mark as Finished'}
          </button>
        </article>
      </div>
    </div>
  )
}
