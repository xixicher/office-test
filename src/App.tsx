import { useEffect, useState } from 'react'
import { Coffee } from 'lucide-react'
import { Home } from './components/Home'
import { Quiz } from './components/Quiz'
import { Result, Reveal } from './components/Result'
import { questions, type Answer } from './model/quiz'
import { scoreAnswers } from './model/scoring'
import { blankDraft, readDraft, readRoute, storeDraft, type Route } from './model/session'

export function App() {
  const [route, setRoute] = useState(readRoute)
  const [draft, setDraft] = useState(readDraft)

  useEffect(() => {
    const restore = () => {
      const next = readRoute()
      setRoute(next)
      if (next.view === 'home' && window.location.hash === '#profiles') {
        requestAnimationFrame(() => document.getElementById('profiles')?.scrollIntoView())
      }
    }
    window.addEventListener('popstate', restore)
    window.addEventListener('hashchange', restore)
    return () => {
      window.removeEventListener('popstate', restore)
      window.removeEventListener('hashchange', restore)
    }
  }, [])

  useEffect(() => {
    storeDraft(draft)
  }, [draft])

  useEffect(() => {
    if (window.location.hash === '#profiles') return
    window.scrollTo(0, 0)
    if (route.view !== 'home') document.getElementById('page-title')?.focus({ preventScroll: true })
  }, [route.view, draft.index])

  useEffect(() => {
    if (route.view !== 'reveal') return
    const result = scoreAnswers(draft.answers.join(''))
    if (!result) {
      setRoute({ view: 'quiz' })
      return
    }
    const delay = matchMedia('(prefers-reduced-motion: reduce)').matches ? 30 : 1100
    const timer = window.setTimeout(() => {
      window.history.replaceState(null, '', `#result=${result.code}`)
      setRoute({ view: 'result', result })
      setDraft(blankDraft())
    }, delay)
    return () => window.clearTimeout(timer)
  }, [route.view, draft.answers])

  function start() {
    const method = route.view === 'result' ? 'replaceState' : 'pushState'
    window.history[method](null, '', '#test')
    setRoute({ view: 'quiz' })
  }

  function home() {
    if (route.view === 'home' && !location.hash) return
    window.history.pushState(null, '', location.pathname + location.search)
    setRoute({ view: 'home' })
    window.scrollTo(0, 0)
    requestAnimationFrame(() => document.getElementById('page-title')?.focus({ preventScroll: true }))
  }

  function select(answer: Answer) {
    setDraft((current) => ({
      ...current,
      answers: current.answers.map((pick, index) => index === current.index ? answer : pick),
    }))
  }

  function next() {
    if (!draft.answers[draft.index]) return
    if (draft.index === questions.length - 1) {
      if (scoreAnswers(draft.answers.join(''))) setRoute({ view: 'reveal' })
      return
    }
    setDraft({ ...draft, index: draft.index + 1 })
  }

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner shell">
          <a className="brand" href={location.pathname + location.search} onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
            event.preventDefault()
            home()
          }}>
            <span className="brand-mark"><Coffee size={20} strokeWidth={2.1} aria-hidden="true" /></span>
            <span>打工人精神状态鉴定所</span>
          </a>
          <div className="header-right">
            {route.view === 'home' && <a className="header-link" href="#profiles">职场档案</a>}
            <span className="edition">内部体验版</span>
          </div>
        </div>
      </header>
      {route.view === 'home' && <Home onStart={start} hasDraft={draft.answers.some(Boolean)} />}
      {route.view === 'quiz' && <Quiz draft={draft} onSelect={select} onNext={next} onHome={home}
        onPrevious={() => setDraft((current) => ({ ...current, index: Math.max(0, current.index - 1) }))} />}
      {route.view === 'reveal' && <Reveal />}
      {route.view === 'result' && (
        <Result key={route.result.code} result={route.result} onRestart={() => {
          setDraft(blankDraft())
          start()
        }} />
      )}
      <footer className="site-footer shell">
        <span>打工人精神状态鉴定所</span>
        <span>测试仅供娱乐，不作为专业心理测评。</span>
      </footer>
    </>
  )
}
