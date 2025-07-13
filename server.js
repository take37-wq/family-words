const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 状態管理
let words = [];
let submittedUsers = [];

function makeSentence(words) {
  let sentence = words.join(' ');
  sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
  if (!/[。.!?！？]$/.test(sentence)) {
    sentence += '。';
  }
  return sentence;
}

app.post('/api/word', (req, res) => {
  let { nickname, word } = req.body;
  nickname = nickname.trim().toLowerCase();

  if (submittedUsers.includes(nickname)) {
    return res.status(400).json({ message: 'このユーザーはすでに送信しました！' });
  }

  submittedUsers.push(nickname);
  words.push(word.trim());

  if (words.length === 3) {
    const sentence = makeSentence(words);
    return res.json({ message: '完成！', sentence });
  }

  res.json({ message: '受け取りました！' });
});

// データをリセットする（例：ボタンから呼ばれる用）
app.post('/api/reset', (req, res) => {
  words = [];
  submittedUsers = [];
  res.json({ message: 'リセットしました' });
});

app.listen(PORT, () => {
  console.log(`✅ サーバーが http://localhost:${PORT} で起動しました`);
});
