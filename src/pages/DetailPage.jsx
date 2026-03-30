import { Link, useNavigate, useParams } from 'react-router-dom'
import { devotionalDays } from '../content'
import { isDayComplete, markDayComplete } from '../storage'
import { useState } from 'react'

export default function DetailPage() {
  const { dayId } = useParams()
  const navigate = useNavigate()
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
            <p>{day.scriptureText}</p>
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
