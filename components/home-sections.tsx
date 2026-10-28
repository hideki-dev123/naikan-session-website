import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { ApplicationEmbed } from '@/components/application-embed';
import { sessionSteps, siteLinks } from '@/lib/content';
import { introduction } from '@/lib/introduction';
import { splitFlowPhrases, splitIntoPhrases } from '@/lib/phrase-breaks';

function ChapterLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="chapter-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

function OriginalParagraphs({ start, end }: { start: number; end: number }) {
  return introduction.slice(start, end).map((paragraph, index) => (
    <p data-original-copy data-reveal="text" key={start + index}>
      {splitIntoPhrases(paragraph, start + index).map((phrase, phraseIndex) => (
        <span className="phrase" key={phraseIndex}>
          {phrase}
        </span>
      ))}
    </p>
  ));
}

export function HomeHero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__content">
        <p className="eyebrow hero__eyebrow">A QUIET DIALOGUE WITH YOURSELF</p>
        <h1 id="hero-title">
          <span>誰もが</span>
          <span>自分の味方で</span>
          <span>いられる社会へ。</span>
        </h1>
        <p className="hero__lead">
          自分の心の声に耳を傾けながら、
          <br />
          自分自身への理解を深める内観セッション。
        </p>
        <a className="button button--primary" href="#application">
          内観セッションに申し込む
          <ArrowUpRight aria-hidden="true" />
        </a>
        <div className="hero__signature">
          <span>平田 光</span>
          <span>HIKARU HIRATA</span>
        </div>
      </div>
      <figure className="hero__visual">
        <img
          src="/images/inner-insight-mark.png"
          alt="Inner Insightの象徴。和紙の上に、葡萄色から夜紺へと移ろうIの文字。"
          width="1587"
          height="2245"
          fetchPriority="high"
        />
        <figcaption>
          <span>INNER INSIGHT</span>
          <span>内側にある、あなたへ。</span>
        </figcaption>
      </figure>
      <div className="hero__bottom">
        <span>INTROSPECTION SESSION / HIKARU HIRATA</span>
        <a href="#profile">
          想いを読む
          <ArrowDown aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function HomeStory() {
  return (
    <section className="story section" id="profile" aria-labelledby="profile-title">
      <div className="section-frame chapter-grid">
        <div className="chapter-aside" data-reveal="heading">
          <ChapterLabel number="01">MY STORY</ChapterLabel>
          <h2 id="profile-title" data-original-copy>
            はじめまして。
          </h2>
          <p className="chapter-aside__name">
            平田 光<span>HIKARU HIRATA</span>
          </p>
          <figure className="story__image" data-reveal>
            <img
              src="/images/window-light-v2.png"
              alt="やわらかな光と植物の影が差し込む静かな窓辺"
              width="1102"
              height="1378"
              loading="lazy"
            />
            <figcaption>It begins with listening.</figcaption>
          </figure>
        </div>
        <div className="letter" id="about">
          <OriginalParagraphs start={0} end={6} />
          <a className="text-link" href="#application">
            セッションのお申し込みへ
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function HomeSession() {
  return (
    <section className="session section" id="session" aria-labelledby="session-title">
      <div className="section-frame chapter-grid">
        <div className="chapter-aside" data-reveal="heading">
          <ChapterLabel number="02">THE SESSION</ChapterLabel>
          <h2 id="session-title">
            内観セッション
            <br />
            について。
          </h2>
          <div className="session__ornament" aria-hidden="true">
            <span />
            <i />
            <span />
          </div>
          <p className="eyebrow session__caption">FEEL. LISTEN. UNDERSTAND.</p>
        </div>
        <div className="letter">
          <OriginalParagraphs start={6} end={9} />
          <a className="text-link" href="#application">
            セッションのお申し込みへ
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function HomeBelief() {
  return (
    <section className="belief section" id="philosophy" aria-labelledby="belief-title">
      <div className="section-frame">
        <div className="belief__intro">
          <div data-reveal="heading">
            <ChapterLabel number="03">MY BELIEF</ChapterLabel>
            <h2 id="belief-title">大切にしていること。</h2>
          </div>
          <div className="letter">
            <OriginalParagraphs start={9} end={10} />
          </div>
        </div>
        <p className="belief__statement" data-original-copy data-reveal="statement">
          <strong>
            <span>誰もが自分の味方で</span>
            <span>いられる社会へ。</span>
          </strong>
        </p>
        <div className="belief__closing">
          <figure className="belief__image" data-reveal>
            <img
              src="/images/forest-path-v2.png"
              alt="木々の間から光が差し込む森の小径"
              width="1254"
              height="1254"
              loading="lazy"
            />
          </figure>
          <div className="letter">
            <OriginalParagraphs start={11} end={13} />
            <p className="belief__signature" aria-label="平田光">
              平田 光<span>HIKARU HIRATA</span>
            </p>
            <a className="text-link" href="#application">
              セッションのお申し込みへ
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeFlow() {
  return (
    <section className="flow section" id="flow" aria-labelledby="flow-title">
      <div className="section-frame">
        <div className="flow__heading" data-reveal="heading">
          <div>
            <ChapterLabel number="04">FIRST STEP</ChapterLabel>
            <h2 id="flow-title">お会いするまで。</h2>
          </div>
          <p>お申し込みは、下のGoogleフォームから。</p>
        </div>
        <ol className="flow__list">
          {sessionSteps.map((step, index) => (
            <li key={step.number} data-reveal>
              <span className="flow__number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>
                {splitFlowPhrases(step.body, index).map((phrase, phraseIndex) => (
                  <span className="phrase" key={phraseIndex}>
                    {phrase}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function HomeApplication() {
  return (
    <section className="application section" id="application" aria-labelledby="application-title">
      <div className="section-frame">
        <div className="application__heading" data-reveal="heading">
          <div>
            <ChapterLabel number="05">APPLICATION</ChapterLabel>
            <h2 id="application-title">
              ここから、
              <br />
              自分と向き合う時間を。
            </h2>
          </div>
          <div className="application__lead">
            <p>
              内観セッションへのお申し込みは、
              <br />
              こちらのGoogleフォームから受け付けています。
            </p>
            <a className="button button--primary" href={siteLinks.form} target="_blank" rel="noreferrer" data-form-link>
              Googleフォームに回答する
              <ArrowUpRight aria-hidden="true" />
            </a>
            <p className="application__hint">回答にはGoogleアカウントへのログインが必要です。</p>
          </div>
        </div>
        <ApplicationEmbed formUrl={siteLinks.form} />
      </div>
    </section>
  );
}
