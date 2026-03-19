// ===== SOAT =====
const soatEl = document.getElementById('soat');
const minutEl = document.getElementById('minut');
const sekundEl = document.getElementById('sekund');
const tzSelect = document.getElementById('tzSelect');

let oldSoat = '', oldMinut = '', oldSekund = '';

function soatniYangila() {
  const tz = tzSelect.value;
  let now;
  
  if (tz === 'local') now = new Date();
  else now = new Date(new Date().toLocaleString('en-US', { timeZone: tz }));

  const soat = now.getHours().toString().padStart(2, '0');
  const minut = now.getMinutes().toString().padStart(2, '0');
  const sekund = now.getSeconds().toString().padStart(2, '0');

  soatEl.textContent = soat;
  minutEl.textContent = minut;
  sekundEl.textContent = sekund;

  setTimeout(soatniYangila, 1000 - now.getMilliseconds());
}

soatniYangila();

tzSelect.addEventListener('change', soatniYangila);

// ===== FULLSCREEN =====
const fsBtn = document.getElementById('fsBtn');
const body = document.body;

fsBtn.addEventListener('click', () => {
  body.classList.toggle('fullscreen');
  fsBtn.textContent = body.classList.contains('fullscreen') ? '✕ Exit' : '⤢ Fullscreen';
});

// ESC bilan chiqish
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && body.classList.contains('fullscreen')) {
    body.classList.remove('fullscreen');
    fsBtn.textContent = '⤢ Fullscreen';
  }
});

// ===== TIMER =====
const timerDisplay = document.getElementById('timerDisplay');
const minInput = document.getElementById('minInput');
const secInput = document.getElementById('secInput');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const alertBox = document.getElementById('alertBox');

let timerInterval = null;
let qolganVaqt = 300; // 5:00

function formatVaqt(sek) {
  const m = Math.floor(Math.max(0, sek) / 60).toString().padStart(2, '0');
  const s = Math.floor(Math.max(0, sek) % 60).toString().padStart(2, '0');
  return m + ':' + s;
}

function displeyYangila() {
  timerDisplay.textContent = formatVaqt(qolganVaqt);
}

function alertShow() {
  alertBox.classList.add('active');
}

function alertHide() {
  alertBox.classList.remove('active');
}

function timerStop() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function timerStart() {
  timerStop();
  alertHide();

  const min = parseInt(minInput.value, 10) || 0;
  const sec = parseInt(secInput.value, 10) || 0;
  
  if (min > 0 || sec > 0) {
    qolganVaqt = (min * 60) + sec;
  }

  displeyYangila();

  timerInterval = setInterval(() => {
    if (qolganVaqt > 0) {
      qolganVaqt--;
      displeyYangila();
    }

    if (qolganVaqt <= 0) {
      timerStop();
      alertShow();
    }
  }, 1000);
}

function timerReset() {
  timerStop();
  alertHide();
  qolganVaqt = 300;
  minInput.value = '5';
  secInput.value = '0';
  displeyYangila();
}

startBtn.addEventListener('click', timerStart);
resetBtn.addEventListener('click', timerReset);

// Sekund 59 dan oshmasin
secInput.addEventListener('change', () => {
  let val = parseInt(secInput.value, 10);
  if (val > 59) secInput.value = 59;
  if (val < 0) secInput.value = 0;
});

// Alertni bosish bilan yopish
alertBox.addEventListener('click', () => {
  alertHide();
});

// Boshlang'ich qiymat
displeyYangila();
minInput.value = '5';
secInput.value = '0';