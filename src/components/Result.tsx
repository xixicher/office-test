import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { BarChart3, Binoculars, Check, Coffee, Copy, Download, Handshake, ImageDown, Lightbulb, RotateCcw, Sparkles, X, Zap } from 'lucide-react'
import { portraits } from '../assets'
import { profileIds, profiles, questions } from '../model/quiz'
import type { Result as QuizResult } from '../model/scoring'
import { makeShareCard } from './shareCard'

export function Reveal() {
  return (
    <main className="reveal shell" aria-labelledby="page-title" aria-busy="true">
      <div className="reveal-icon"><Coffee size={49} strokeWidth={1.5} aria-hidden="true" /></div>
      <h1 id="page-title" tabIndex={-1}>职场本体即将揭晓</h1>
      <div className="reveal-dots" aria-hidden="true"><i /><i /><i /></div>
    </main>
  )
}

function ShareCard({ result }: { result: QuizResult }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [blob, setBlob] = useState<Blob>()
  const [url, setUrl] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!blob) return
    const objectUrl = URL.createObjectURL(blob)
    setUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [blob])

  async function open() {
    dialog.current?.showModal()
    if (blob || pending) return
    setError(false)
    setPending(true)
    try {
      setBlob(await makeShareCard(result))
    } catch {
      setError(true)
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <button className="button primary" type="button" onClick={open}>
        <ImageDown size={19} aria-hidden="true" /> 保存结果卡
      </button>
      <dialog ref={dialog} className="share-dialog" aria-labelledby="share-title"
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close() }}>
        <div className="share-dialog-body">
          <header>
            <h2 id="share-title">保存结果卡</h2>
            <form method="dialog">
              <button type="submit" className="icon-button" aria-label="关闭" autoFocus><X size={21} /></button>
            </form>
          </header>
          {url ? (
            <>
              <img src={url} alt={`${profiles[result.profileId].name}的分享卡，答案组合 ${result.code}`} width={1080} height={1440} />
              <p>手机上也可以长按图片保存。</p>
              <a className="button primary" href={url} download={`职场鉴定-${result.code}.png`}>
                <Download size={18} aria-hidden="true" /> 下载 PNG
              </a>
            </>
          ) : error ? (
            <>
              <p role="alert">图片生成失败，请重试。</p>
              <button className="button secondary" type="button" onClick={() => {
                dialog.current?.close()
                void open()
              }}>重新生成</button>
            </>
          ) : <p role="status" className="share-loading">正在生成结果卡…</p>}
        </div>
      </dialog>
    </>
  )
}

export function Result({ result, onRestart }: { result: QuizResult; onRestart: () => void }) {
  const profile = profiles[result.profileId]
  const partner = profiles[profile.partner]
  const primary = 'primary' in profile ? profile.primary : result.profileId
  const [copyStatus, setCopyStatus] = useState('')
  const codeText = useRef<HTMLElement>(null)
  const color = { '--paper': profile.paper, '--ink': profile.ink } as CSSProperties

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(result.code)
      setCopyStatus('已复制答案组合')
    } catch {
      const selection = window.getSelection()
      if (selection && codeText.current) {
        const range = document.createRange()
        range.selectNodeContents(codeText.current)
        selection.removeAllRanges()
        selection.addRange(range)
      }
      setCopyStatus('请手动复制答案组合')
    }
  }

  return (
    <main className="report shell enter">
      <section className="result-hero" aria-labelledby="page-title" style={color}>
        <div className="result-copy">
          <p className="result-kicker"><Sparkles size={16} aria-hidden="true" /> 你的职场本体是</p>
          <h1 id="page-title" tabIndex={-1}>{profile.name}</h1>
          <p className="character-name">{profile.character}</p>
          <blockquote>「{profile.quote}」</blockquote>
          <ul className="traits" aria-label="人格特征">
            {profile.traits.map((trait) => <li key={trait}>{trait}</li>)}
          </ul>
        </div>
        <img className="result-portrait" src={portraits[result.profileId]} alt={profile.character} width={512} height={512} />
      </section>

      <div className="share-strip">
        <div className="answer-code">
          <span id="code-label">我的答案组合</span>
          <code ref={codeText} aria-labelledby="code-label">{result.code}</code>
          <button className="icon-button copy-button" type="button" aria-label="复制答案组合" onClick={copyCode}>
            {copyStatus === '已复制答案组合' ? <Check size={18} /> : <Copy size={17} />}
          </button>
          <span className="copy-status" role="status">{copyStatus}</span>
        </div>
        <div className="report-actions">
          <ShareCard result={result} />
          <button className="button secondary" type="button" onClick={onRestart}>
            <RotateCcw size={17} aria-hidden="true" /> 重新测试
          </button>
        </div>
      </div>

      <div className="report-grid">
        <div className="report-main">
          <section className="report-panel about">
            <h2><Coffee size={21} aria-hidden="true" /> 工位侧写</h2>
            <p>{profile.summary}</p>
            <div className="report-notes">
              <div>
                <h3><Zap size={17} aria-hidden="true" /> 你的拿手项</h3>
                <p>{profile.strength}</p>
              </div>
              <div>
                <h3><Binoculars size={18} aria-hidden="true" /> 容易漏看的一面</h3>
                <p>{profile.blindSpot}</p>
              </div>
            </div>
          </section>
          <section className="report-panel tip">
            <h2><Lightbulb size={21} aria-hidden="true" /> 明天上班试一试</h2>
            <p>{profile.tip}</p>
          </section>
        </div>
        <div className="report-side">
          <section className="report-panel scores">
            <h2><BarChart3 size={21} aria-hidden="true" /> 职场风格得分</h2>
            <p>每题计 1 分，共 {questions.length} 分。</p>
            {'secondary' in profile && (
              <p>你的结果结合了「{profiles[profile.primary].name}」和「{profiles[profile.secondary].name}」两种风格。</p>
            )}
            <ul>
              {profileIds.map((id) => (
                <li key={id} className={id === primary ? 'winning-score' : ''}>
                  <span>{profiles[id].name}</span>
                  <div className="score-track" aria-hidden="true">
                    <span style={{ width: `${result.scores[id] / questions.length * 100}%`, background: profiles[id].bar }} />
                  </div>
                  <strong>{result.scores[id]}<span className="sr-only"> 分</span></strong>
                </li>
              ))}
            </ul>
          </section>
          <section className="report-panel partner" style={{ background: partner.paper }}>
            <h2><Handshake size={21} aria-hidden="true" /> 默契搭档</h2>
            <div className="partner-content">
              <img src={portraits[profile.partner]} alt="" width={88} height={88} />
              <div><h3>{partner.name}</h3><p>{profile.chemistry}</p></div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
