// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Update copyright year
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Mobile navigation
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Close mobile menu after clicking a link
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  });

  // Add scroll event listener for navbar
  let lastScroll = 0;
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      navbar.classList.remove("scroll-up");
      return;
    }

    if (
      currentScroll > lastScroll &&
      !navbar.classList.contains("scroll-down")
    ) {
      // Scroll Down
      navbar.classList.remove("scroll-up");
      navbar.classList.add("scroll-down");
    } else if (
      currentScroll < lastScroll &&
      navbar.classList.contains("scroll-down")
    ) {
      // Scroll Up
      navbar.classList.remove("scroll-down");
      navbar.classList.add("scroll-up");
    }
    lastScroll = currentScroll;
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section);
  });

  // Theme Toggle Functionality
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const themeIcon = themeToggle.querySelector("i");
  const themeText = themeToggle.querySelector("span");

  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeIcon.className = "fas fa-sun";
    themeText.textContent = "Light";
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Update icon and text
    if (body.classList.contains("dark-mode")) {
      themeIcon.className = "fas fa-sun";
      themeText.textContent = "Light";
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.className = "fas fa-moon";
      themeText.textContent = "Dark";
      localStorage.setItem("theme", "light");
    }
  });
});
