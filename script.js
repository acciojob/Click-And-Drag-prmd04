// Your code here.
const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

// Arrange items in a grid initially
const cols = 5; // 5 columns
const spacing = 220; // includes width and margin

items.forEach((item, index) => {
  const row = Math.floor(index / cols);
  const col = index % cols;
  item.style.left = `${col * spacing}px`;
  item.style.top = `${row * spacing}px`;
});

let selected = null;
let offsetX = 0;
let offsetY = 0;

items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    selected = item;
    offsetX = e.clientX - selected.offsetLeft;
    offsetY = e.clientY - selected.offsetTop;
    selected.style.zIndex = 1000;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!selected) return;

  // Calculate new position
  let x = e.clientX - offsetX;
  let y = e.clientY - offsetY;

  // Boundaries
  const containerRect = container.getBoundingClientRect();
  const itemRect = selected.getBoundingClientRect();

  const minX = 0;
  const minY = 0;
  const maxX = container.clientWidth - selected.offsetWidth;
  const maxY = container.clientHeight - selected.offsetHeight;

  // Clamp values to boundaries
  x = Math.max(minX, Math.min(x, maxX));
  y = Math.max(minY, Math.min(y, maxY));

  // Apply movement
  selected.style.left = x + 'px';
  selected.style.top = y + 'px';
});

document.addEventListener('mouseup', () => {
  if (selected) {
    selected.style.zIndex = '';
    selected = null;
  }
});
