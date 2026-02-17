const pallino = document.getElementById('pallino');
const overlay = document.getElementById('overlay');
const chiudi = document.getElementById('chiudi');

pallino.addEventListener('click', () => {
  overlay.style.display = 'flex';
});

chiudi.addEventListener('click', () => {
  overlay.style.display = 'none';
});
