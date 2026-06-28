/* ============================================
   PORTFOLIO SCRIPTS - John Lloyd Patosa
   Separated JavaScript for maintainability
   ============================================ */

/**
 * smoothScrollToSection()
 * Enables smooth scrolling when clicking navigation links.
 * Intercepts anchor link clicks and scrolls smoothly to the target section.
 */
function smoothScrollToSection() {
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * highlightActiveNavLink()
 * Highlights the navigation link corresponding to the currently visible section.
 * Uses the Intersection Observer API to detect which section is in view.
 */
function highlightActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Create an observer that watches when sections enter the viewport
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Remove active class from all links
          navLinks.forEach(function (link) {
            link.style.color = '';
            link.style.background = '';
          });

          // Add active style to the matching nav link
          const activeLink = document.querySelector(
            '.nav-links a[href="#' + entry.target.id + '"]'
          );
          if (activeLink) {
            activeLink.style.color = '#667eea';
            activeLink.style.background = 'rgba(102, 126, 234, 0.08)';
          }
        }
      });
    },
    {
      // Trigger when 30% of the section is visible
      threshold: 0.3
    }
  );

  // Observe each section
  sections.forEach(function (section) {
    observer.observe(section);
  });
}

/**
 * animateOnScroll()
 * Adds fade-in animation to elements as they scroll into view.
 * Cards and content sections animate upward when they become visible.
 */
function animateOnScroll() {
  const animatedElements = document.querySelectorAll(
    '.skill-card, .exp-card, .project-card, .edu-card, .cert-card, .contact-card'
  );

  // Initially hide all animated elements
  animatedElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Create observer to trigger animation when element enters viewport
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          // Stop observing after animation plays
          observer.unobserve(entry.target);
        }
      });
    },
    {
      // Trigger when 10% of the element is visible
      threshold: 0.1
    }
  );

  // Observe each element
  animatedElements.forEach(function (el) {
    observer.observe(el);
  });
}

/**
 * hideNavOnScroll()
 * Hides the navigation bar when scrolling down and shows it when scrolling up.
 * Provides more screen space for content while reading.
 */
function hideNavOnScroll() {
  const nav = document.querySelector('.nav');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      // Scrolling down - hide nav
      nav.style.transform = 'translateY(-100%)';
      nav.style.transition = 'transform 0.3s ease';
    } else {
      // Scrolling up - show nav
      nav.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
  });
}

/**
 * init()
 * Initializes all portfolio functions when the page finishes loading.
 * This is the main entry point for all JavaScript functionality.
 */
function init() {
  smoothScrollToSection();
  highlightActiveNavLink();
  animateOnScroll();
  hideNavOnScroll();
}

// Run init when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
