// The markers are existing text. They give the browser natural wrapping points
// while the joined spans remain exactly the author's original paragraphs.
const boundaries: ReadonlyArray<ReadonlyArray<string>> = [
  ['内観セッションを行っております、', '平田 光（ひらた ひかる）'],
  ['私は幼いころから、', '家庭環境が良いというわけではなく、', 'さまざまな感情を抱えながら'],
  [
    'そんな私が',
    '自分自身の心と',
    '向き合うようになったのは、',
    '思うように日々を',
    '過ごせない時期を経験し、',
    '自分の気持ちや生き方を',
    '見つめ直すようになったことが',
  ],
  ['その中で、', '自分が何を感じ、', '何を考え、', '本当はどうしたいのか。', '一つひとつ'],
  [
    '自分の感情に気づき、',
    'その気持ちを否定せずに',
    '受け止めていく。',
    'そうした積み重ねによって、',
    '少しずつ自分自身への理解が深まり、',
    '自分の心を大切にすることの意味を',
  ],
  [
    'この経験から、',
    '自分の気持ちが分からなくなったり、',
    '周りに合わせすぎてしまったり、',
    '自分よりも他人を',
    '優先してしまったりする人が、',
    '自分自身の心を理解し、',
    '大切にしていくことの重要性を',
  ],
  [
    '現在は、',
    '内観セッションを通して、',
    '自分の感情や思考に目を向け、',
    '自分の心の声に耳を傾けながら、',
    '自分自身への理解を深める',
  ],
  ['自分の気持ちが', '分からなくなってしまった方、', '周りに合わせすぎてしまう方、', '自分に自信が持てない方。'],
  [
    'そんな方々が、',
    '自分の気持ちを置き去りにせず、',
    '自分自身の味方でいられるように。',
    '一人ひとりの想いやペースを',
    '大切にしながら、',
  ],
  [
    '私が大切にしているのは、',
    '誰かの正解に',
    '自分を当てはめることではなく、',
    '自分自身を知り続け、',
    '自分の心に正直に',
  ],
  [],
  ['どのような経験をしてきた人も、', '自分の気持ちを大切にし、', 'その人らしい人生を'],
  ['これからも、', '一人ひとりと丁寧に向き合いながら、', '自分自身を大切にできる人を'],
];

function splitAtMarkers(text: string, markers: ReadonlyArray<string>): string[] {
  const parts: string[] = [];
  let cursor = 0;
  for (const marker of markers) {
    const found = text.indexOf(marker, cursor);
    if (found < 0) return [text];
    const end = found + marker.length;
    parts.push(text.slice(cursor, end));
    cursor = end;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

export function splitIntoPhrases(text: string, index: number): string[] {
  return splitAtMarkers(text, boundaries[index] ?? []);
}

export function splitFlowPhrases(text: string, index: number): string[] {
  const steps = [
    ['ご希望や候補日を', 'Googleフォームから'],
    ['メールまたはDMで、', '確定日時と', 'Google Meetを'],
    ['Google Meetで、', '今の心の動きを'],
  ];
  return splitAtMarkers(text, steps[index] ?? []);
}
