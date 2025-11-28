// ===== Paper template switching =====
const paper = document.getElementById('entry');
const basePaperClass = 'paper';

document.querySelectorAll('.paper-thumb').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.template; // ruled | grid | dotted | plain
    paper.className = `${basePaperClass} paper--${type}`;
  });
});

// ===== Drag & drop stickers (placed where you drop) =====

// All stickers in the sidebar
const sidebarStickers = document.querySelectorAll('.sidebar .sticker');

// Remember which sticker is being dragged
let draggedSticker = null;

// Make sidebar stickers draggable
sidebarStickers.forEach(sticker => {
  sticker.setAttribute('draggable', 'true');

  sticker.addEventListener('dragstart', () => {
    draggedSticker = sticker;
  });

  sticker.addEventListener('dragend', () => {
    draggedSticker = null;
  });
});

// Allow dropping on the paper
paper.addEventListener('dragover', (e) => {
  e.preventDefault();
});

// On drop: clone sticker and place it near the cursor
paper.addEventListener('drop', (e) => {
  e.preventDefault();
  if (!draggedSticker) return;

  // 1. Clone the sticker from the sidebar
  const clone = draggedSticker.cloneNode(true);
  clone.classList.add('sticker');
  clone.style.position = 'absolute';

  // 2. Add it to the paper so we can measure it
  paper.appendChild(clone);

  // 3. Get sizes and positions
  const paperRect = paper.getBoundingClientRect();
  const stickerRect = clone.getBoundingClientRect();

  const maxX = paperRect.width - stickerRect.width;
  const maxY = paperRect.height - stickerRect.height;

  // Cursor position relative to the paper
  let x = e.clientX - paperRect.left - stickerRect.width / 2;
  let y = e.clientY - paperRect.top - stickerRect.height / 2;

  // 4. Clamp so we don't go out of bounds
  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  // 5. Place sticker exactly where you dropped it
  clone.style.left = `${x}px`;
  clone.style.top = `${y}px`;
});
