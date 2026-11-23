import { questions, type Answer } from './quiz.ts'
import { isAnswer, scoreAnswers, type Result } from './scoring.ts'

export type Draft = { index: number; answers: (Answer | null)[] }
export type Route = { view: 'home' | 'quiz' | 'reveal' } | { view: 'result'; result: Result }
const draftKey = 'office-mood-lab:draft:v1'
const originalResultPrefix = '#result='
export const resultPrefix = '#result-v2='

export function blankDraft(): Draft {
  return { index: 0, answers: questions.map(() => null) }
}

export function readDraft(): Draft {
  try {
    const saved = JSON.parse(sessionStorage.getItem(draftKey) ?? 'null') as Partial<Draft> | null
    if (!saved || !Array.isArray(saved.answers) || saved.answers.length !== questions.length) return blankDraft()
    const { answers, index } = saved
    if (typeof index !== 'number' || !Number.isInteger(index) || index < 0 || index >= questions.length) {
      return blankDraft()
    }
    if (answers.every((answer, i) => isAnswer(answer) || (i >= index && answer === null))) {
      return { answers, index }
    }
  } catch {
    // The test remains usable when browser storage is restricted.
  }
  return blankDraft()
}

export function storeDraft(draft: Draft) {
  try {
    if (draft.answers.some(isAnswer)) {
      sessionStorage.setItem(draftKey, JSON.stringify(draft))
    } else {
      sessionStorage.removeItem(draftKey)
    }
  } catch {
    // The in-memory draft is still available for this visit.
  }
}

export function readRoute(hash = window.location.hash): Route {
  if (hash === '#test') return { view: 'quiz' }
  const isOriginal = hash.startsWith(originalResultPrefix)
  if (isOriginal || hash.startsWith(resultPrefix)) {
    const prefix = isOriginal ? originalResultPrefix : resultPrefix
    const result = scoreAnswers(hash.slice(prefix.length), isOriginal ? 'original' : 'expanded')
    if (result) return { view: 'result', result }
  }
  return { view: 'home' }
}
