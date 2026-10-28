# Inner Insight

平田光さんの「内観セッション」を紹介し、申し込みフォームへ案内するための独立したウェブサイトです。隣接する `kidoairaku-marche` とは別プロジェクトとして管理しています。

## ローカルで確認する

```bash
pnpm install
pnpm dev
```

開発サーバーは通常 `http://localhost:3000` で起動します。

## 品質確認

```bash
pnpm test
pnpm lint
pnpm build
```

## 掲載している公式リンク

- [内観セッション申し込みフォーム](https://docs.google.com/forms/d/e/1FAIpQLSdm8nubPbm62zAnRIucGQa4mc22KrQW790tQTbZEC3TlgMtZw/viewform)
- [note](https://note.com/ripe_briony7413)
- [X](https://x.com/hikaruhirata242)
- [Instagram](https://www.instagram.com/hikaruhirata_24/)

## 2026-10-27 リニューアル

本人提供の紹介文を原文の順序・表記のまま掲載し、象徴の `public/images/inner-insight-mark.png` は元のファイルを加工せず使用しています。文章は `lib/introduction.ts`、原文照合用の独立したテストデータは `lib/introduction.fixture.txt` にあります。

ページの目的は最後のGoogleフォームへの回答です。ヘッダー・冒頭・本文途中から最終セクションへ移動でき、埋め込みが使えない場合もフォームを直接開けます。フォームは2026-10-27の確認時点でGoogleログインが必要です。

スマートフォンの追従ボタンは冒頭とフォーム表示中には非表示になります。JavaScriptがない場合も本文と申し込みリンクを利用でき、動きを減らす設定にも対応しています。

水彩の背景素材と参照情報は `docs/superpowers/specs/2026-10-27-watercolor-reference.md` に記録しています。紹介文は表示上の意味の切れ目に分けていますが、文字列と段落の順序は元のままです。
