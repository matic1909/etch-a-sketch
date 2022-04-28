const container = document.querySelector('.container');
const gridButton = document.querySelector('#generate-grid-button');
const toggleColorButton = document.querySelector('#color');
const clearButton = document.querySelector('#clear-button');
const modeButtons = document.querySelectorAll('.mode-button');

const rainbowColors = [
  [255, 0, 0],
  [255, 64, 0],
  [255, 127, 0],
  [255, 192, 0],
  [255, 255, 0],
  [192, 255, 0],
  [127, 255, 0],
  [64, 255, 0],
  [0, 255, 0],
  [0, 255, 64],
  [0, 255, 127],
  [0, 255, 192],
  [0, 255, 255],
  [0, 192, 255],
  [0, 127, 255],
  [0, 64, 255],
  [0, 0, 255],
  [64, 0, 255],
  [127, 0, 255],
  [192, 0, 255],
  [255, 0, 255],
  [255, 0, 192],
  [255, 0, 127],
  [255, 0, 64],
];
let currentMode = 'color';
let colorValues = [0, 0, 0];
let rainbow = false;
let rainbowIndex = 0;
let randomColor = false;
let drawing = false;
let erasing = false;

window.addEventListener('mousedown', (e) => {
  e.preventDefault();
  if (e.button === 0) drawing = true;
  if (e.button === 2) erasing = true;
});

window.addEventListener('mouseup', (e) => {
  e.preventDefault();
  drawing = false;
  erasing = false;
});

modeButtons.forEach((modeButton) => {
  modeButton.addEventListener('click', (e) => {
    currentMode = e.target.id;
    modeButton.classList.add('active');
    modeButtons.forEach((button) => {
      if (button.id !== e.target.id) button.classList.remove('active');
    });
  });
});

gridButton.addEventListener('click', (e) => {
  gridSize = getGridSize();
  if (gridSize) {
    generateGrid(gridSize);
    currentMode = 'color';
    modeButtons.forEach((button) => {
      if (button.id !== color) {
        button.classList.remove('active');
      } else {
        button.classList.add('active');
      }
    });
  }
});

const getGridSize = () => {
  while (true) {
    let input = prompt('How many squares?');
    if (input === null) {
      alert("I'm out of here");
      return false;
    } else {
      if (isNaN(input)) {
        alert('Invalid input, please enter a number');
      } else if (input.length <= 0) {
        return 16;
      } else {
        return parseInt(input);
      }
    }
  }
};

clearButton.addEventListener('click', (e) => {
  container.childNodes.forEach((div) => {
    div.style.backgroundColor = '';
  });
});

const handleMouseEnter = (e) => {
  if (erasing) {
    e.target.style.backgroundColor = '';
  } else if (drawing) {
    setColor();
    e.target.style.backgroundColor = getColorString(colorValues);
  }
};

const handleClick = (e) => {
  setColor();
  e.target.style.backgroundColor = getColorString(colorValues);
};

const handleRightClick = (e) => {
  e.preventDefault();
  e.target.style.backgroundColor = '';
};

const generateGrid = (size) => {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.innerHTML = '';
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.addEventListener('mouseenter', handleMouseEnter);
    div.addEventListener('mousedown', handleClick);
    div.addEventListener('contextmenu', handleRightClick);
    container.appendChild(div);
  }
};

const setColor = () => {
  if (currentMode === 'color') {
    colorValues = [0, 0, 0];
    return;
  }
  if (currentMode === 'random') {
    getRandomRGB();
  }
  if (currentMode === 'rainbow' || currentMode === 'rainbow-fine') {
    getNextColorInRainbow();
  }
};

const getColorString = (color) => {
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
};

const getRandomRGB = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  colorValues = [r, g, b];
};

const getNextColorInRainbow = () => {
  let step = 1;
  if (currentMode === 'rainbow') step = 2;
  colorValues = rainbowColors[rainbowIndex];
  rainbowIndex = (rainbowIndex + step) % rainbowColors.length;
};

generateGrid(16);
