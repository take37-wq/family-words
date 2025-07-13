// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/hello', (req, res) => {
  res.send('サーバーは動いています！');
});
// 単語データを一時的に保存（あとでリセットできるように）
let wordEntries = [];

// POST /api/word を受け取る
app.post('/api/word', (req, res) => {
  const { nickname, word } = req.body;

  if (!nickname || !word) {
    return res.status(400).json({ message: 'ニックネームと単語を送ってください' });
  }

  // データを保存
  wordEntries.push({ nickname, word });

  // 3人集まったら文を生成する（仮で結合）
  if (wordEntries.length === 3) {
    const sentence = wordEntries.map(entry => entry.word).join(' ');
    const message = `みんなの文：${sentence}`;

    // 一時保存した単語をリセット
    wordEntries = [];

    return res.json({ message });
  }

  res.json({ message: '受け取りました！他の人の入力を待っています。' });
});

app.listen(PORT, () => {
  console.log(`✅ サーバーが http://localhost:${PORT} で起動しました`);
});
