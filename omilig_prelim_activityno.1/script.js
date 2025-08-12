document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.querySelector('.scroll-btn');
  const icon = scrollBtn.querySelector('i');

  // Initially, arrow points down and button scrolls down
  icon.className = 'fa-solid fa-arrow-down';
  scrollBtn.onclick = e => {
    e.preventDefault();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Fade in/out animation for sections every time they appear/disappear
  const fadeSections = document.querySelectorAll('.fade-section');
  const fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    },
    { threshold: 0.2 }
  );
  fadeSections.forEach(sec => fadeObserver.observe(sec));

  // Skills fill animation once when visible
  const skillsSection = document.getElementById('skills');
  const skillElements = document.querySelectorAll('.skill');
  let skillsAnimated = false;

  const skillsObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
          skillElements.forEach(skill => {
            const targetPercent = parseInt(skill.dataset.percent) || 0;
            const fill = skill.querySelector('.fill');
            const percentText = skill.querySelector('.percent');
            let progress = 0;

            fill.style.width = '0%';
            percentText.textContent = '0%';

            const interval = setInterval(() => {
              if (progress >= targetPercent) {
                clearInterval(interval);
              } else {
                progress++;
                fill.style.width = progress + '%';
                percentText.textContent = progress + '%';
              }
            }, 15);
          });
          skillsAnimated = true;
          skillsObserver.unobserve(skillsSection);
        }
      });
    },
    { threshold: 0.5 }
  );
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }

  function updateScrollBtn() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const windowHeight = window.innerHeight;

    scrollBtn.classList.remove('top-position', 'bottom-position');

    if (scrollTop <= 20) {
      // At top: arrow down, scroll down on click
      icon.className = 'fa-solid fa-arrow-down';
      scrollBtn.classList.add('top-position');
      scrollBtn.onclick = e => {
        e.preventDefault();
        window.scrollTo({ top: docHeight, behavior: 'smooth' });
      };
    } else if (scrollTop + windowHeight >= docHeight - 5) {
      // At bottom: arrow up, scroll up on click
      icon.className = 'fa-solid fa-arrow-up';
      scrollBtn.classList.add('bottom-position');
      scrollBtn.onclick = e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    } else {
      // Middle: arrow up, scroll up on click
      icon.className = 'fa-solid fa-arrow-up';
      scrollBtn.classList.remove('top-position', 'bottom-position');
      scrollBtn.onclick = e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    }
  }

  window.addEventListener('scroll', updateScrollBtn, { passive: true });
  window.addEventListener('resize', updateScrollBtn);

  // Call once to initialize state
  updateScrollBtn();
});
