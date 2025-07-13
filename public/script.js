async function submitWord() {
  const nickname = document.getElementById('nickname').value;
  const word = document.getElementById('word').value;
  const message = document.getElementById('message');
  const result = document.getElementById('result');

  const res = await fetch('/api/word', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nickname, word })
  });

  const data = await res.json();

  if (res.ok) {
    message.textContent = data.message;
    if (data.sentence) {
      result.textContent = '完成した文：' + data.sentence;
    }
  } else {
    message.textContent = data.message;
  }

  document.getElementById('word').value = '';
}
