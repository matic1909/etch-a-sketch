const container = document.querySelector('.container');
const gridButton = document.querySelector('#generate-grid-button');
const toggleColorButton = document.querySelector('#color');
const clearButton = document.querySelector('#clear-button');
const modeButtons = document.querySelectorAll('.mode-button');
const colorPicker = document.querySelector('#colorpicker');

const rainbowColors = [
  '#ff0000',
  '#ff1f00',
  '#ff3f00',
  '#ff7f00',
  '#ff9f00',
  '#ffbf00',
  '#ffdf00',
  '#dfff00',
  '#bfff00',
  '#9fff00',
  '#5fff00',
  '#3fff00',
  '#1fff00',
  '#00ff1f',
  '#00ff3f',
  '#00ff5f',
  '#00ff7f',
  '#00ff9f',
  '#00ffbf',
  '#00ffdf',
  '#00feff',
  '#00dfff',
  '#009fff',
  '#007fff',
  '#005fff',
  '#003fff',
  '#001fff',
  '#0000ff',
  '#3f00ff',
  '#5f00ff',
  '#7f00ff',
  '#bf00ff',
  '#df00ff',
  '#ff00fe',
  '#ff00bf',
  '#ff009f',
  '#ff007f',
  '#ff005f',
  '#ff003f',
  '#ff001f',
];
let currentMode = 'color';
let currentColor = '#000000';
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
      } else if (parseInt(input) > 100) {
        alert('Maximum is 100, sorry :(');
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
    e.target.style.backgroundColor = currentColor;
  }
};

const handleClick = (e) => {
  setColor();
  e.target.style.backgroundColor = currentColor;
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
    currentColor = colorPicker.value;
    return;
  }
  if (currentMode === 'random') {
    currentColor = getRandomColor();
  }
  if (currentMode === 'rainbow') {
    getNextColorInRainbow();
  }
};

const getColorString = (color) => {
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
};

const getRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + randomColor;
};

const getNextColorInRainbow = () => {
  let step = 1;
  currentColor = rainbowColors[rainbowIndex];
  rainbowIndex = (rainbowIndex + step) % rainbowColors.length;
};

generateGrid(16);
