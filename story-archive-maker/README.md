# Story Type Test / ポーネグリフメーカー

9問を直感で選ぶと、1万通りの四桁コードと自分の物語タイプが生成される無料Webアプリです。

## Live app

https://kujo-jotarou.github.io/web-uranai/story-archive-maker/

## What it does

- 9つの三択から、0000〜9999の四桁コードを決定
- 強み、ハマりやすい罠、3つの選択傾向、次の10分を生成
- 共有用の1200×675 PNGをブラウザ内で生成
- 結果文のコピーとXへの共有に対応

## Privacy

登録、課金、広告、解析用トラッカーはありません。入力内容と生成結果はブラウザ内だけで処理し、サーバーへ送信・保存しません。

## Development

```bash
npm install
npm run dev
```

品質確認:

```bash
npm run lint
npm run build
```

## Project note

本プロジェクトは非公式のファン発想による創作ツールです。既存作品の画像・文字・固有設定は使用していません。画面、石板、記号、文章生成ロジックは本プロジェクト独自のものです。
