async function getData() {
  try {
    const res = await fetch('/all');
    console.log('Getting Images! 🌠');
    const data = await res.json();
    const container = document.getElementById('fileNames');
    container.innerHTML = '';
    data.forEach(f => {
      const node = document.createElement('img');
      node.src = f;
      node.width = 500;
      container.appendChild(node);
    });
  } catch (err) {
    console.error(err);
  }
}

function loadData() {
  getData();
  // fetch data all five minutes
  setInterval(getData, 1000 * 60 * 5);
}
