// public/script.js

async function submitWord() {
  const nickname = document.getElementById('nickname').value;
  const word = document.getElementById('word').value;
  const message = document.getElementById('message');
  const result = document.getElementById('result');

  // ✅ 端末のローカルストレージにも保存しておく
  if (localStorage.getItem('alreadySent') === 'true') {
    message.textContent = 'この端末からはすでに送信しています。';
    return;
  }

  const res = await fetch('/api/word', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nickname, word })
  });

  const data = await res.json();

  if (res.ok) {
    message.textContent = data.message;
    localStorage.setItem('alreadySent', 'true');
    if (data.sentence) {
      result.textContent = '完成した文：' + data.sentence;
    }
  } else {
    message.textContent = data.message;
  }
}

async function resetWords() {
  await fetch('/api/reset', { method: 'POST' });
  localStorage.removeItem('alreadySent');
  location.reload();
}
