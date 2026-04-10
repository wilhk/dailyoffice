import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getBibleSettings, getProgress, saveProgress, setBibleSettings as setLocalBibleSettings } from '../storage'
import { normalizeBibleSettings } from '../scripture'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

const USER_STATE_TABLE = 'user_app_state'

const AppStateContext = createContext(null)

export function AppStateProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured)
  const [dataLoading, setDataLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [progress, setProgress] = useState(() => getProgress())
  const [bibleSettings, setBibleSettings] = useState(() => getBibleSettings())

  const authEnabled = isSupabaseConfigured

  const syncRemoteState = useCallback(async (nextProgress, nextBibleSettings) => {
    if (!authEnabled || !user) return

    const { error } = await supabase
      .from(USER_STATE_TABLE)
      .upsert({
        user_id: user.id,
        progress: nextProgress,
        bible_settings: nextBibleSettings,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' })

    if (error) {
      setErrorMessage(`Cloud sync failed: ${error.message}`)
    }
  }, [authEnabled, user])

  const persistState = useCallback(async (nextProgress, nextBibleSettings) => {
    saveProgress(nextProgress)
    setLocalBibleSettings(nextBibleSettings)
    await syncRemoteState(nextProgress, nextBibleSettings)
  }, [syncRemoteState])

  useEffect(() => {
    if (!authEnabled) {
      setAuthLoading(false)
      return
    }

    let active = true

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return

      if (error) {
        setErrorMessage(`Session check failed: ${error.message}`)
      }

      const currentSession = data?.session ?? null
      setSession(currentSession)
      setUser(currentSession?.user ?? null)
      setAuthLoading(false)
    })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setUser(nextSession?.user ?? null)
      setAuthLoading(false)
    })

    return () => {
      active = false
      subscription.subscription.unsubscribe()
    }
  }, [authEnabled])

  useEffect(() => {
    if (!authEnabled) return

    let active = true

    async function loadUserState() {
      if (!user) {
        setProgress(getProgress())
        setBibleSettings(getBibleSettings())
        setDataLoading(false)
        return
      }

      setDataLoading(true)

      const localProgress = getProgress()
      const localSettings = getBibleSettings()

      const { data, error, status } = await supabase
        .from(USER_STATE_TABLE)
        .select('progress,bible_settings')
        .eq('user_id', user.id)
        .maybeSingle()

      if (!active) return

      if (error && status !== 406) {
        setErrorMessage(`Failed to load cloud state: ${error.message}`)
        setProgress(localProgress)
        setBibleSettings(localSettings)
        setDataLoading(false)
        return
      }

      if (data) {
        const remoteProgress = data.progress && typeof data.progress === 'object' ? data.progress : localProgress
        const remoteSettings = normalizeBibleSettings(data.bible_settings ?? localSettings)

        setProgress(remoteProgress)
        setBibleSettings(remoteSettings)
        saveProgress(remoteProgress)
        setLocalBibleSettings(remoteSettings)
      } else {
        setProgress(localProgress)
        setBibleSettings(localSettings)
        await syncRemoteState(localProgress, localSettings)
      }

      setDataLoading(false)
    }

    loadUserState()

    return () => {
      active = false
    }
  }, [authEnabled, user, syncRemoteState])

  const markDayComplete = useCallback(async (day) => {
    const key = String(day)
    const nextProgress = {
      ...progress,
      [key]: true
    }

    setProgress(nextProgress)
    await persistState(nextProgress, bibleSettings)
  }, [progress, bibleSettings, persistState])

  const resetProgress = useCallback(async () => {
    const nextProgress = {}
    setProgress(nextProgress)
    await persistState(nextProgress, bibleSettings)
  }, [bibleSettings, persistState])

  const updateBibleSettings = useCallback(async (partialSettings) => {
    const nextSettings = normalizeBibleSettings({
      ...bibleSettings,
      ...partialSettings
    })

    setBibleSettings(nextSettings)
    await persistState(progress, nextSettings)
  }, [bibleSettings, progress, persistState])

  const signUp = useCallback(async ({ email, password }) => {
    if (!authEnabled) {
      setErrorMessage('Supabase is not configured.')
      return false
    }

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setErrorMessage(`Sign-up failed: ${error.message}`)
      return false
    }

    setErrorMessage('')
    return true
  }, [authEnabled])

  const signIn = useCallback(async ({ email, password }) => {
    if (!authEnabled) {
      setErrorMessage('Supabase is not configured.')
      return false
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setErrorMessage(`Sign-in failed: ${error.message}`)
      return false
    }

    setErrorMessage('')
    return true
  }, [authEnabled])

  const signOut = useCallback(async () => {
    if (!authEnabled) return

    const { error } = await supabase.auth.signOut()
    if (error) {
      setErrorMessage(`Sign-out failed: ${error.message}`)
    }
  }, [authEnabled])

  const value = useMemo(() => ({
    authEnabled,
    authLoading,
    dataLoading,
    errorMessage,
    setErrorMessage,
    session,
    user,
    progress,
    completedCount: Object.keys(progress).length,
    bibleSettings,
    markDayComplete,
    resetProgress,
    updateBibleSettings,
    signUp,
    signIn,
    signOut
  }), [
    authEnabled,
    authLoading,
    dataLoading,
    errorMessage,
    session,
    user,
    progress,
    bibleSettings,
    markDayComplete,
    resetProgress,
    updateBibleSettings,
    signUp,
    signIn,
    signOut
  ])

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const context = useContext(AppStateContext)

  if (!context) {
    throw new Error('useAppState must be used inside AppStateProvider')
  }

  return context
}
