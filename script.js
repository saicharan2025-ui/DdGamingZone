document.getElementById('sessionForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById('name').value,
    mobile: document.getElementById('mobile').value,
    address: document.getElementById('address').value,
    system: document.getElementById('system').value,
    isChild: document.getElementById('isChild').checked,
    duration: parseInt(document.getElementById('duration').value)
  };

  const res = await fetch('https://your-backend-url.onrender.com/api/start-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  alert(result.message);
});