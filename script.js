const paper = document.getElementById('entry');
const basePaperClass = 'paper';

document.querySelectorAll('.paper-thumb').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.template; // ruled | grid | dotted | plain
    paper.className = `${basePaperClass} paper--${type}`;
  });
});
