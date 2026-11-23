import { ClipboardList, Clock3, Coffee, Fingerprint, Sparkles } from 'lucide-react'
import { portraits } from '../assets'
import office from '../assets/office.webp'
import { profiles, questions, resultProfileIds } from '../model/quiz'

export function Home({ onStart, hasDraft }: { onStart: () => void; hasDraft: boolean }) {
  return (
    <main className="home shell">
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <div className="hero-label"><Sparkles size={15} aria-hidden="true" /> 职场趣味测试</div>
          <h1 id="page-title" tabIndex={-1}>工位上的你，<br />究竟是哪种<span>生物？</span></h1>
          <p className="hero-slogan">6道灵魂拷问，测出你的职场本体。</p>
          <p className="hero-description">测测你的打工精神状态，看看谁是你的职场同类。</p>
        </div>

        <figure className="hero-visual">
          <img src={office} alt="清醒猫、垂耳兔、水豚、仓鼠、柴犬和绵羊在小办公室里工作" width={1440} height={960} fetchPriority="high" />
          <figcaption><Coffee size={14} aria-hidden="true" /> 工位合影</figcaption>
        </figure>

        <div className="hero-controls">
          <button className="button primary start-button" type="button" onClick={onStart}>
            <Fingerprint size={21} aria-hidden="true" /> {hasDraft ? '继续鉴定' : '开始鉴定'}
          </button>
          <div className="hero-meta">
            <span><ClipboardList size={17} aria-hidden="true" /> {questions.length} 道情景题</span>
            <span><Clock3 size={17} aria-hidden="true" /> 约 1 分钟</span>
          </div>
        </div>
      </section>

      <section className="lineup" id="profiles" aria-labelledby="profiles-title">
        <div className="section-heading">
          <h2 id="profiles-title">认识你的职场同类</h2>
          <span>{resultProfileIds.length} 种职场本体</span>
        </div>
        <ul className="profiles-grid">
          {resultProfileIds.map((id) => (
            <li className="profile-preview" key={id}>
              <img src={portraits[id]} alt="" width={512} height={512} loading="lazy" />
              <div>
                <h3>{profiles[id].name}</h3>
                <p>{profiles[id].character}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
