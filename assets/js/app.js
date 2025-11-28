// JavaScript for Countdown Timer

// Set the date we're counting down to (1 year from now)
const countDownDate = new Date().getTime() + 365 * 24 * 60 * 60 * 1000;

// Update the countdown every 1 second
const timer = setInterval(function () {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  // Time calculations
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result
  document.getElementById("days").innerHTML = days.toString().padStart(2, "0");
  document.getElementById("hours").innerHTML = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").innerHTML = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").innerHTML = seconds
    .toString()
    .padStart(2, "0");

  // If the countdown is finished
  if (distance < 0) {
    clearInterval(timer);
    document.getElementById("days").innerHTML = "00";
    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = "00";
  }
}, 1000);

// Logo Management System
class LogoManager {
  constructor() {
    this.navLogo = document.getElementById("nav-logo");
    this.footerLogo = document.getElementById("footer-logo");
    this.navTitle = document.getElementById("nav-title");
    this.footerTitle = document.getElementById("footer-title");
    this.themeToggle = document.getElementById("theme-toggle");
    this.themeIconDark = document.getElementById("theme-icon-dark");
    this.themeIconLight = document.getElementById("theme-icon-light");

    this.init();
  }

  init() {
    // Initialize theme
    this.updateTheme();
    this.updateLogos();

    // Event listeners
    this.themeToggle.addEventListener("click", () => this.toggleTheme());
    window.addEventListener("resize", () => this.updateLogos());

    // DEBUG: Log initial state
    console.log("=== LOGO MANAGER INITIALIZED ===");
    console.log("Current theme:", this.getCurrentTheme());
    console.log("Screen width:", window.innerWidth);
    console.log("Is mobile:", this.isMobile());
    console.log("=== END INIT ===");
  }

  getCurrentTheme() {
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  }

  isMobile() {
    return window.innerWidth < 768;
  }

  toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");

    if (isDark) {
      html.classList.remove("dark");
      html.classList.add("light");
    } else {
      html.classList.remove("light");
      html.classList.add("dark");
    }

    this.updateTheme();
    this.updateLogos();

    console.log("Theme toggled to:", this.getCurrentTheme());
  }

  updateTheme() {
    const isDark = this.getCurrentTheme() === "dark";

    // Update theme icons
    if (isDark) {
      this.themeIconDark.classList.add("hidden");
      this.themeIconLight.classList.remove("hidden");
    } else {
      this.themeIconDark.classList.remove("hidden");
      this.themeIconLight.classList.add("hidden");
    }
  }

  updateLogos() {
    const theme = this.getCurrentTheme();
    const isMobile = this.isMobile();

    // Determine logo path
    let logoPath;
    if (isMobile) {
      logoPath = "./assets/images/logo.png";
    } else {
      logoPath =
        theme === "dark"
          ? "./assets/images/logo-light.png"
          : "./assets/images/logo-dark.png";
    }

    // Update logo sources
    if (this.navLogo) this.navLogo.src = logoPath;
    if (this.footerLogo) this.footerLogo.src = logoPath;

    // Update logo sizes for mobile
    if (isMobile) {
      if (this.navLogo) {
        this.navLogo.className = "h-10 rounded-lg transition-all duration-300";
      }
      if (this.footerLogo) {
        this.footerLogo.className =
          "h-10 rounded-lg transition-all duration-300";
      }
    } else {
      if (this.navLogo) {
        this.navLogo.className = "h-12 rounded-lg transition-all duration-300";
      }
      if (this.footerLogo) {
        this.footerLogo.className =
          "h-12 rounded-lg transition-all duration-300";
      }
    }

    // Conditional title visibility - hide title when logo is present and visible
    const shouldHideTitle = !isMobile; // Hide title on desktop, show on mobile
    if (this.navTitle) {
      this.navTitle.style.display = shouldHideTitle ? "none" : "block";
    }
    if (this.footerTitle) {
      this.footerTitle.style.display = shouldHideTitle ? "none" : "block";
    }

    console.log("Logos updated:", {
      theme,
      isMobile,
      logoPath,
      titleVisible: !shouldHideTitle,
    });
  }
}

// Initialize logo manager when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new LogoManager();

  // Mobile menu toggle
  document
    .getElementById("mobile-menu-btn")
    .addEventListener("click", function () {
      const mobileMenu = document.getElementById("mobile-menu");
      mobileMenu.classList.toggle("hidden");
    });

  // Back to top button
  const backToTopButton = document.getElementById("back-to-top");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.remove("opacity-0", "pointer-events-none");
      backToTopButton.classList.add("opacity-100");
    } else {
      backToTopButton.classList.add("opacity-0", "pointer-events-none");
      backToTopButton.classList.remove("opacity-100");
    }
  });

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Contact form submission
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Show success modal
      document.getElementById("success-modal").classList.remove("hidden");

      // Reset form
      this.reset();
    });

  // Close modal
  document.getElementById("close-modal").addEventListener("click", function () {
    document.getElementById("success-modal").classList.add("hidden");
  });

  // Close modal when clicking outside
  document
    .getElementById("success-modal")
    .addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.add("hidden");
      }
    });

  // Active navigation highlighting
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("text-yellow-400");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("text-yellow-400");
      }
    });
  });
});
