/* ---- sticky header ---- */
window.addEventListener('scroll', () => {
  document.getElementById('site-header').classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- mobile menu ---- */
function toggleMenu() {
  document.getElementById('main-nav').classList.toggle('open');
  document.getElementById('menu-btn').classList.toggle('open');
}

const profileImage = document.querySelector('.profile-pic');
if (profileImage) {
  profileImage.addEventListener('dragstart', (event) => {
    event.preventDefault();
  });
}

/* ---- search bar ---- */
function toggleSearch() {
  const bar = document.getElementById('search-bar');
  const input = document.getElementById('search-input');
  bar.classList.toggle('visible');
  if (bar.classList.contains('visible')) {
    input.focus();
    // Automatically scroll down to the Projects section so the user can see the results!
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    input.value = '';
    filterProjects();
  }
}

const searchInput = document.getElementById('search-input');
const projectCards = document.querySelectorAll('.project-card');
const projectsEmpty = document.getElementById('projects-empty');

function filterProjects() {
  if (!searchInput) {
    return;
  }

  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  projectCards.forEach(card => {
    const text = card.textContent.toLowerCase();
    const isVisible = searchTerm === '' || text.includes(searchTerm);
    card.style.display = isVisible ? '' : 'none';

    if (isVisible) {
      visibleCount += 1;
    }
  });

  if (projectsEmpty) {
    projectsEmpty.hidden = visibleCount !== 0;
  }
}

if (searchInput) {
  searchInput.addEventListener('input', filterProjects);
}

filterProjects();

/* ---- contact form ---- */
function handleSubmit(e) {
  e.preventDefault();
  document.getElementById('form-success').classList.add('show');
  e.target.reset();
}

/* ---- scroll reveal ---- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.project-card, .about-grid, .skills-grid, .contact-inner, .about-strip')
  .forEach(el => observer.observe(el));
