const steps = [...document.querySelectorAll('.passo')];
const nextButtons = document.querySelectorAll('.btn-proximo');
const restartButtons = document.querySelectorAll('[data-restart]');
const backBtn = document.getElementById('backBtn');
const restartBtn = document.getElementById('restartBtn');
const progressBar = document.getElementById('progressBar');
const progressLabel = document.getElementById('progressLabel');
const progressCount = document.getElementById('progressCount');

let currentId = 0;
let history = [];

function showStep(id, { pushHistory = true } = {}) {
  const next = document.getElementById(`passo-${id}`);
  if (!next) return;

  if (pushHistory && id !== currentId) history.push(currentId);

  steps.forEach((step) => step.classList.remove('ativo'));
  next.classList.add('ativo');
  currentId = Number(id);

  const position = Math.min(currentId + 1, steps.length);
  const percentage = Math.max(7.7, Math.round((position / steps.length) * 100));
  progressBar.style.width = `${percentage}%`;
  progressLabel.textContent = next.dataset.label || 'Aventura';
  progressCount.textContent = `${String(position).padStart(2, '0')} / ${String(steps.length).padStart(2, '0')}`;
  backBtn.disabled = history.length === 0;

  document.querySelector('.story-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function restart() {
  history = [];
  showStep(0, { pushHistory: false });
}

nextButtons.forEach((button) => {
  button.addEventListener('click', () => showStep(button.dataset.proximo));
});

restartButtons.forEach((button) => button.addEventListener('click', restart));
restartBtn.addEventListener('click', restart);

backBtn.addEventListener('click', () => {
  const previousId = history.pop();
  if (previousId === undefined) return;
  showStep(previousId, { pushHistory: false });
});

backBtn.disabled = true;
showStep(0, { pushHistory: false });
