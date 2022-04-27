const container = document.querySelector('.container');
const gridButton = document.querySelector('.generate-grid-button');

gridButton.addEventListener('click', (e) => {
  const gridSize = parseInt(prompt('How many squares?'));
  generateGrid(gridSize);
});

function generateGrid(size) {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.innerHTML = '';
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.addEventListener('mouseenter', (e) => {
      e.target.classList.add('filled');
    });
    container.appendChild(div);
  }
}

generateGrid(16);
