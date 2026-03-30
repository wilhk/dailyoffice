import { Link, useNavigate } from 'react-router-dom'
import { devotionalDays } from '../content'
import { getProgress, getCompletedCount, resetProgress } from '../storage'
import { useMemo, useState } from 'react'

export default function ListingPage() {
  const navigate = useNavigate()
  const [version, setVersion] = useState(0)
  const progress = useMemo(() => getProgress(), [version])
  const completed = getCompletedCount()

  function handleReset() {
    resetProgress()
    setVersion(v => v + 1)
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
            <div className="progress-pill">{completed}/{devotionalDays.length} completed</div>
            <button className="secondary-btn" onClick={handleReset}>Reset Progress</button>
          </div>
        </header>

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
