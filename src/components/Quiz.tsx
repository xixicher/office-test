import { Check, ChevronLeft, ClipboardList, Fingerprint } from 'lucide-react'
import { letters, questions, type Answer } from '../model/quiz'
import type { Draft } from '../model/session'

type Props = {
  draft: Draft
  onSelect: (answer: Answer) => void
  onPrevious: () => void
  onNext: () => void
  onHome: () => void
}

export function Quiz({ draft, onSelect, onPrevious, onNext, onHome }: Props) {
  const { index, answers } = draft
  const question = questions[index]
  const selected = answers[index]
  const last = index === questions.length - 1

  return (
    <main className="quiz shell" aria-labelledby="page-title">
      <div className="quiz-progress">
        <div className="progress-label">
          <span><ClipboardList size={17} aria-hidden="true" /> 鉴定进度</span>
          <strong aria-live="polite">{index + 1} / {questions.length}</strong>
        </div>
        <div className="progress-track" role="progressbar" aria-label="鉴定进度"
          aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={index + 1}>
          {questions.map(({ prompt }, segment) => (
            <span key={prompt} className={segment <= index ? 'filled' : ''} />
          ))}
        </div>
      </div>
      <div className="question-card">
        <div className="question-content enter" key={index}>
          <p className="question-label">情景 {String(index + 1).padStart(2, '0')}</p>
          <h1 id="page-title" tabIndex={-1}>{question.prompt}</h1>
          <fieldset className="choices">
            <legend className="sr-only">选择和你最像的反应</legend>
            {letters.map((letter) => (
              <label className="choice" key={letter}>
                <input type="radio" name="answer" value={letter} checked={letter === selected}
                  onChange={() => onSelect(letter)} />
                <span className="choice-letter">{letter}</span>
                <span className="choice-text">{question.options[letter].text}</span>
                <span className="choice-check" aria-hidden="true"><Check size={15} strokeWidth={2.6} /></span>
              </label>
            ))}
          </fieldset>
        </div>

        <div className="quiz-actions">
          <button className="button subtle" type="button" onClick={index === 0 ? onHome : onPrevious}>
            <ChevronLeft size={19} aria-hidden="true" /> {index === 0 ? '回到封面' : '上一题'}
          </button>
          <button className="button primary" type="button" disabled={!selected} onClick={onNext}>
            {last && <Fingerprint size={19} aria-hidden="true" />}
            {last ? '揭晓结果' : '下一题'}
          </button>
        </div>
      </div>
    </main>
  )
}
