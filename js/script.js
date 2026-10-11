const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.textContent = navLinks.classList.contains('open') ? '×' : '☰';
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.textContent = '☰';
}));

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('light') ? '☾' : '☼';
});

const goals = [...document.querySelectorAll('.goal-check')];
const progressBar = document.getElementById('progressBar');
const progressPercent = document.getElementById('progressPercent');
const progressText = document.getElementById('progressText');
const progressCount = document.getElementById('progressCount');
function updateProgress() {
  const count = goals.filter(goal => goal.checked).length;
  const percent = Math.round(count / goals.length * 100);
  progressBar.style.width = percent + '%';
  progressPercent.textContent = percent;
  progressCount.textContent = `${count} / ${goals.length}`;
  progressText.textContent = count === 0 ? 'Chưa có mục tiêu nào được hoàn thành.' :
    count === goals.length ? 'Tuyệt vời! Bạn đã hoàn thành tất cả mục tiêu.' :
    'Bạn đang tiến lên từng bước. Hãy tiếp tục nhé!';
}
goals.forEach(goal => goal.addEventListener('change', updateProgress));
document.getElementById('resetGoals').addEventListener('click', () => {
  goals.forEach(goal => goal.checked = false);
  updateProgress();
});

const openLetter = document.getElementById('openLetter');
const closeLetter = document.getElementById('closeLetter');
const letterContent = document.querySelector('.letter-content');
const letterPaper = document.getElementById('letterPaper');
openLetter.addEventListener('click', () => {
  letterContent.style.display = 'none';
  letterPaper.classList.add('open');
  letterPaper.setAttribute('aria-hidden', 'false');
});
closeLetter.addEventListener('click', () => {
  letterPaper.classList.remove('open');
  letterPaper.setAttribute('aria-hidden', 'true');
  letterContent.style.display = '';
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}
document.getElementById('year').textContent = new Date().getFullYear();
updateProgress();
