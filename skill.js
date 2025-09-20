document.addEventListener('DOMContentLoaded', () => {
  const progressCircles = document.querySelectorAll('.progress-circle');

  const animateProgress = (circle) => {
    const progress = circle.getAttribute('data-progress');
    const percentageText = circle.querySelector('.percentage-text');
    const circlePath = circle.querySelector('.circle');

    if (percentageText) {
      percentageText.textContent = progress + '%';
    }

    if (circlePath) {
      // Set initial stroke-dasharray to 0 for animation
      circlePath.style.strokeDasharray = '0, 100';
      // Trigger animation after a short delay
      setTimeout(() => {
        circlePath.style.strokeDasharray = `${progress}, 100`;
      }, 100);
    }
  };

  // Use IntersectionObserver to animate when in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const circle = entry.target;
      const circlePath = circle.querySelector('.circle');
      if (entry.isIntersecting) {
        animateProgress(circle);
        // Removed unobserve to allow replay on re-entry
      } else {
        // Reset progress bar when out of view
        if (circlePath) {
          circlePath.style.strokeDasharray = '0, 100';
        }
      }
    });
  }, { threshold: 0.5 });

  progressCircles.forEach(circle => {
    observer.observe(circle);
  });

  // New IntersectionObserver for advantage-card animations
  const cards = document.querySelectorAll('.advantage-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Removed unobserve to allow replay on re-entry
      } else {
        entry.target.classList.remove('visible');
        // Reset animation when out of view
      }
    });
  }, { threshold: 0.3 });

  cards.forEach(card => {
    card.classList.add('fade-in', 'slide-up'); // Initial state
    cardObserver.observe(card);
  });
});
