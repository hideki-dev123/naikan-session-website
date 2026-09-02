export const siteLinks = {
  form: 'https://docs.google.com/forms/d/e/1FAIpQLSdm8nubPbm62zAnRIucGQa4mc22KrQW790tQTbZEC3TlgMtZw/viewform',
  note: 'https://note.com/ripe_briony7413',
  x: 'https://x.com/Hikaruhirata242',
  instagram: 'https://www.instagram.com/hikaruhirata_24/',
} as const;

export const navigation = [
  { label: '内観とは', href: '#about' },
  { label: 'セッション', href: '#session' },
  { label: '流れ', href: '#flow' },
  { label: '平田光について', href: '#profile' },
  { label: 'お申し込み', href: '#application' },
] as const;

export const philosophies = [
  {
    number: '01',
    title: '痛みを、比べない。',
    body: '世間から小さく見えても、自分の中で痛いものなら、その痛みは確かにそこにあります。',
  },
  {
    number: '02',
    title: '小さな石ころを、守る。',
    body: '外側の評価よりも、あなたの根にある小さく大切なものを見失わないために。',
  },
  {
    number: '03',
    title: 'まず、自分を生きる。',
    body: '誰かに手を差し伸べる前に、自分が折れないこと。自分の声を聞くことから始めます。',
  },
] as const;

export const sessionSteps = [
  {
    number: '01',
    title: 'フォームから申し込む',
    body: 'ご希望や候補日をGoogleフォームからお知らせください。',
  },
  {
    number: '02',
    title: '日程を整える',
    body: 'メールまたはDMで、確定日時とGoogle Meetをご案内します。',
  },
  {
    number: '03',
    title: '対話から始める',
    body: '最初は約2時間。雑談も交えながら、今の心の動きを一緒に見ていきます。',
  },
] as const;

export const profile = {
  name: '平田 光',
  reading: 'HIKARU HIRATA',
  role: '心の土台を作る人',
} as const;
