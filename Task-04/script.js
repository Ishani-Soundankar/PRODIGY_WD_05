// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 60,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          hamburger.classList.remove('active');
        }
      }
    });
  });

  // Animate elements when they come into view
  const fadeElements = document.querySelectorAll('.fade-in');
  
  function checkScroll() {
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.style.animation = 'fadeIn 1s forwards';
      }
    });
  }
  
  // Check on initial load
  checkScroll();
  
  // Check on scroll
  window.addEventListener('scroll', checkScroll);
});