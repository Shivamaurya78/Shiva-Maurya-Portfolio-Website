document.addEventListener("DOMContentLoaded", function () {
  const roleTextElement = document.getElementById("role-text");
  const texts = ["SOFTWARE DEVELOPER", "WEB DEVELOPER"];
  let current = 0;
  const duration = 2000;

  function fadeOutInLoop() {
    roleTextElement.style.transition = `opacity ${duration / 2}ms`;
    roleTextElement.style.opacity = 0;
    setTimeout(() => {
      // Switch text
      current = (current + 1) % texts.length;
      roleTextElement.textContent = texts[current];
      // Fade in
      roleTextElement.style.transition = `opacity ${duration / 2}ms`;
      roleTextElement.style.opacity = 1;
      setTimeout(fadeOutInLoop, duration);
    }, duration / 2);
  }

  // Initialize
  roleTextElement.textContent = texts[0];
  roleTextElement.style.opacity = 1;
  setTimeout(fadeOutInLoop, duration);

  // Scroll animation for profile card
  const profileCard = document.querySelector('.profile-card');

  function checkScroll() {
    const rect = profileCard.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.8) {
      profileCard.classList.add('slide-up');
    }
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Check on load

  // Scroll-triggered animation for project cards with staggered delay using IntersectionObserver
  const projectCards = document.querySelectorAll('.project-card');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  projectCards.forEach(card => {
    observer.observe(card);
  });

  // Scroll-triggered animation for contact section
  const contactSection = document.querySelector('.contact-section');

  const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        contactObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.8 });

  if (contactSection) {
    contactObserver.observe(contactSection);
  }

  // Smooth scroll to Contact section on 'Contact Me' button click
  const contactMeBtn = document.querySelector('.profile-card .action-buttons .btn[href^="mailto:"]');
  if (contactMeBtn) {
    contactMeBtn.addEventListener('click', function (event) {
      event.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Smooth scroll for all navbar links
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Smooth scroll for Achievements section
  const achievementsLink = document.querySelector('.nav-links a[href="#achievements"]');
  if (achievementsLink) {
    achievementsLink.addEventListener('click', function (event) {
      event.preventDefault();
      const achievementsSection = document.getElementById('achievements');
      if (achievementsSection) {
        achievementsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
});
