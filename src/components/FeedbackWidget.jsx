import { useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { useAppState } from '../context/AppStateContext'

const FEEDBACK_TABLE = 'user_feedback'

export default function FeedbackWidget() {
  const { user } = useAppState()
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [feedbackText, setFeedbackText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function openDialog() {
    setSuccessMessage('')
    setErrorMessage('')
    setIsOpen(true)
  }

  function closeDialog() {
    if (isSubmitting) return
    setIsOpen(false)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const trimmedFeedback = feedbackText.trim()
    if (!trimmedFeedback) {
      setErrorMessage('Please enter your feedback before submitting.')
      return
    }

    if (!isSupabaseConfigured) {
      setErrorMessage('Supabase is not configured. Feedback cannot be sent right now.')
      return
    }

    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    const payload = {
      user_id: user?.id ?? null,
      user_email: user?.email ?? null,
      name: name.trim() || null,
      feedback_text: trimmedFeedback,
      source_page: window.location.hash || '/'
    }

    try {
      const { error } = await supabase.from(FEEDBACK_TABLE).insert(payload)

      if (error) {
        setErrorMessage(`Failed to submit feedback: ${error.message}`)
        return
      }

      setSuccessMessage('Thanks! Your feedback has been submitted.')
      setName('')
      setFeedbackText('')

      window.setTimeout(() => {
        setIsOpen(false)
      }, 900)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button className="feedback-fab" onClick={openDialog} aria-label="Submit feedback">
        Submit Feedback
      </button>

      {isOpen && (
        <div className="modal-backdrop" onClick={closeDialog}>
          <div
            className="modal-card feedback-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <h2 id="feedback-dialog-title">Submit Feedback</h2>
              <button className="icon-btn" onClick={closeDialog} aria-label="Close">×</button>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="setting-field">
                <span>Name (optional)</span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  maxLength={100}
                  placeholder="Your name"
                />
              </label>

              <label className="setting-field">
                <span>Feedback</span>
                <textarea
                  value={feedbackText}
                  onChange={(event) => setFeedbackText(event.target.value)}
                  required
                  rows={5}
                  maxLength={3000}
                  placeholder="Share your thoughts, suggestions, or issues..."
                />
              </label>

              <button className="primary-btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>

            {successMessage && <p className="success-text">{successMessage}</p>}
            {errorMessage && <p className="error-text">{errorMessage}</p>}
          </div>
        </div>
      )}
    </>
  )
}
