import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';

import { ApplicationEmbed } from '@/components/application-embed';
import { philosophies, profile, sessionSteps, siteLinks } from '@/lib/content';

const philosophyImages = [
  {
    src: '/images/window-light-v2.png',
    alt: '生成りのカーテンに植物の影が落ちる静かな窓辺',
  },
  {
    src: '/images/wildflower-hand-v2.png',
    alt: '小さな白い花をそっと手に取る様子',
  },
  {
    src: '/images/forest-path-v2.png',
    alt: '朝の光が差し込む森の小径',
  },
];

function SectionHeading({ index, label, title }: { index: string; label: string; title: React.ReactNode }) {
  return (
    <div className="section-heading" data-reveal>
      <p className="section-heading__eyebrow">
        <span>{index}</span>
        {label}
      </p>
      <h2>{title}</h2>
    </div>
  );
}

function ExternalTextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="text-link" href={href} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight aria-hidden="true" />
    </a>
  );
}

export function HomeHero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title" data-hero>
      <div className="hero__paper" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__eyebrow" data-hero-reveal="eyebrow">
          INNER INSIGHT · INTROSPECTION SESSION
        </p>
        <h1 id="hero-title" data-hero-reveal="copy">
          自分の声を、
          <br />
          <em>置き去りにしない。</em>
        </h1>
        <div className="hero__lead" data-hero-reveal="lead">
          <p>感情や思考の奥に、そっと耳を澄ます。</p>
          <p>本当のあなたと話すための、内観セッション。</p>
        </div>
        <div className="hero__actions" data-hero-reveal="actions">
          <a className="button button--primary" href={siteLinks.form} target="_blank" rel="noreferrer">
            セッションを予約する
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a className="button button--quiet" href="#about">
            内観について知る
            <ArrowDown aria-hidden="true" />
          </a>
        </div>
      </div>
      <figure className="hero__visual" data-hero-reveal="visual" data-hero-visual>
        <div className="hero__image-shell">
          <video
            className="hero__video"
            data-hero-video
            src="/movie/Hero Movie.mp4"
            poster="/images/inner-insight-mark.png"
            muted
            playsInline
            preload="auto"
            style={{ display: 'block' }}
            aria-label="Inner Insight video"
          />
        </div>
        <p className="hero__script" aria-hidden="true">
          Inner Insight
        </p>
        <figcaption>Listen closely to what lives within.</figcaption>
      </figure>
      <a className="hero__scroll" href="#about" aria-label="内観とはのセクションへ">
        SCROLL
        <span aria-hidden="true" />
      </a>
    </section>
  );
}

export function HomeAbout() {
  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <div className="section-frame about__grid">
        <figure className="about__visual" data-reveal>
          <img
            src="/images/window-light-v2.png"
            alt="生成りのカーテンに植物の影が落ちる、やわらかな朝の窓辺"
            width="1102"
            height="1378"
            loading="lazy"
          />
          <figcaption>
            <span>01</span>
            A quiet place to meet yourself.
          </figcaption>
        </figure>
        <SectionHeading
          index="01"
          label="ABOUT INTROSPECTION"
          title={
            <>
              内側にある気づきが、
              <br />
              生き方を選び直す。
            </>
          }
        />
        <div className="about__body" data-reveal>
          <p className="about__intro">内観とは、自分と向き合い、心の動きを観察すること。</p>
          <p>
            何を感じ、何を考え、何が嫌で、何が嬉しいのか。すぐに答えを出そうとせず、まずは自分の心の話を聞いてあげます。
          </p>
          <p>
            その気づきをもとに「では、自分はどうしたいのか」を見つめることが、より素の自分で生きるための小さなきっかけになります。
          </p>
        </div>
        <div className="about__keywords" aria-label="内観の三つの視点" data-reveal>
          <span>FEEL</span>
          <span>LISTEN</span>
          <span>CHOOSE</span>
        </div>
      </div>
    </section>
  );
}

export function HomePhilosophy() {
  return (
    <section className="philosophy section" aria-labelledby="philosophy-title">
      <div className="section-frame">
        <SectionHeading
          index="02"
          label="PHILOSOPHY"
          title={
            <>
              あなたの内側にある、
              <br />
              大切なものを守る。
            </>
          }
        />
        <div className="philosophy__grid">
          {philosophies.map((item, index) => (
            <article className="philosophy-card" key={item.number} data-reveal>
              <span>{item.number}</span>
              <div className="philosophy-card__image">
                <img
                  src={philosophyImages[index].src}
                  alt={philosophyImages[index].alt}
                  width="1254"
                  height="1254"
                  loading="lazy"
                />
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="philosophy__note" data-reveal>
          <div className="philosophy__note-copy">
            <p>幸せは、いつも大きな形をしているわけではありません。</p>
            <p>誰かといることや、今日を生きている肌感も、大切な心の手がかりです。</p>
          </div>
          <ExternalTextLink href={siteLinks.note}>noteで考えを読む</ExternalTextLink>
        </div>
      </div>
    </section>
  );
}

export function HomeSession() {
  return (
    <section className="session section" id="session" aria-labelledby="session-title">
      <div className="section-frame session__grid">
        <div className="session__mark" aria-hidden="true" data-reveal>
          <img src="/images/forest-path-v2.png" alt="" width="1254" height="1254" loading="lazy" />
          <span>I</span>
          <p>WITHIN / DIALOGUE / AWARENESS</p>
        </div>
        <div className="session__copy">
          <SectionHeading index="03" label="SESSION" title="答えを渡すのではなく、一緒に見つけていく。" />
          <div className="session__body" data-reveal>
            <p>
              このセッションは、あなたの代わりに人生を変えるものではありません。内観はきっかけであり、変化を選ぶのはあなた自身です。
            </p>
            <p>最初は約2時間。堅い面談ではなく、雑談も交えながら人生や今の心について対話します。</p>
            <p>そこで見えてきた状態に合わせ、これからの進め方を一緒に考えます。</p>
            <p className="session__promise">魔法は起きません。ただ、少しずつ確実に変わっていきます。</p>
            <p className="session__aside">相性が合わないと感じたときは、いつでもやめていただけます。</p>
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
        <SectionHeading index="04" label="FLOW" title="お会いするまでの流れ" />
        <ol className="flow__list">
          {sessionSteps.map((step) => (
            <li key={step.number} data-reveal>
              <span>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
              <ArrowRight aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function HomeProfile() {
  return (
    <section className="profile section" id="profile" aria-labelledby="profile-title">
      <div className="section-frame profile__grid">
        <div className="profile__visual" data-reveal>
          <div className="profile__portrait-placeholder" aria-label="Inner Insight モノグラム">
            <img
              src="/images/wildflower-hand-v2.png"
              alt="小さな白い花をそっと手に取る様子"
              width="1254"
              height="1254"
              loading="lazy"
            />
            <span>I</span>
          </div>
          <p>{profile.reading}</p>
        </div>
        <div className="profile__copy">
          <SectionHeading index="05" label="ABOUT ME" title="あなたが、あなたでいるための土台を。" />
          <div className="profile__name" data-reveal>
            <p>{profile.role}</p>
            <h3 id="profile-title">{profile.name}</h3>
          </div>
          <div className="profile__body" data-reveal>
            <p>
              自分自身が心と向き合い、「自分はどう生きたいか」を問い続けてきた経験から、誰かが自分のままで生きるための内観をお手伝いしています。
            </p>
            <p>人のために生きようとする優しさを大切にしながらも、まずはあなた自身が折れないこと。</p>
            <p>自分の声を聞き、その望みを選べることを大切にしています。</p>
          </div>
          <div className="profile__links" data-reveal>
            <ExternalTextLink href={siteLinks.x}>Xを見る</ExternalTextLink>
            <ExternalTextLink href={siteLinks.instagram}>Instagramを見る</ExternalTextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeJournal() {
  return (
    <section className="journal section" aria-labelledby="journal-title">
      <div className="section-frame">
        <SectionHeading index="06" label="JOURNAL" title="言葉から、考えに触れる。" />
        <div className="journal__grid">
          <a
            className="journal-card journal-card--note"
            href={siteLinks.note}
            target="_blank"
            rel="noreferrer"
            data-reveal
          >
            <span>note</span>
            <p>自分の心の変化や、日常で感じたこと</p>
            <h3>「自分はどう生きたいか」を、言葉にする。</h3>
            <small>
              ARTICLES <ArrowUpRight aria-hidden="true" />
            </small>
          </a>
          <a className="journal-card journal-card--x" href={siteLinks.x} target="_blank" rel="noreferrer" data-reveal>
            <span>X</span>
            <p>心の土台を作るための、小さな気づき</p>
            <h3>今日の感情に、立ち止まってみる。</h3>
            <small>
              POSTS <ArrowUpRight aria-hidden="true" />
            </small>
          </a>
        </div>
      </div>
    </section>
  );
}

export function HomeApplication() {
  return (
    <section className="application section" id="application" aria-labelledby="application-title">
      <div className="section-frame">
        <SectionHeading
          index="07"
          label="APPLICATION"
          title={
            <>
              自分の内側へ、
              <br />
              はじめの一歩を。
            </>
          }
        />
        <div className="application__lead" data-reveal>
          <p>まずは、今のあなたについて聞かせてください。</p>
          <p>お会いできることを、心から楽しみにしています。</p>
        </div>
        <ApplicationEmbed formUrl={siteLinks.form} />
      </div>
    </section>
  );
}
