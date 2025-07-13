const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// ▼ 保存用メモリ（1人1回制限）
let words = [];
let submittedUsers = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/word', (req, res) => {
  let { nickname, word } = req.body;

  nickname = nickname.trim().toLowerCase(); // ニックネームを正規化

  if (submittedUsers.includes(nickname)) {
    return res.status(400).json({ message: 'このユーザーはすでに送信しました！' });
  }

  submittedUsers.push(nickname);
  words.push(word);

  if (words.length === 3) {
    const sentence = words.join(' ');
    return res.json({ message: '完成！', sentence });
  }

  res.json({ message: '受け取りました！' });
});

app.get('/api/sentence', (req, res) => {
  if (words.length === 3) {
    const sentence = words.join(' ');
    res.json({ sentence });
  } else {
    res.json({ sentence: null });
  }
});

app.post('/api/reset', (req, res) => {
  words = [];
  submittedUsers = [];
  res.json({ message: 'リセットしました！' });
});

app.listen(PORT, () => {
  console.log(`✅ サーバーが http://localhost:${PORT} で起動しました`);
});
