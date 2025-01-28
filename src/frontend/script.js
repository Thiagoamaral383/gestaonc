document.getElementById('form-nc').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch('http://localhost:3000/ncs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const newNC = await response.json();
      addNCToTable(newNC);
    } else {
      console.error('Erro ao cadastrar NC');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
});

function addNCToTable(nc) {
  const tbody = document.querySelector('#table-ncs tbody');
  const row = document.createElement('tr');

  for (const key in nc) {
    const cell = document.createElement('td');
    cell.textContent = nc[key];
    row.appendChild(cell);
  }

  tbody.appendChild(row);
}
