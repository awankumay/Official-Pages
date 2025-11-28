// JavaScript for Countdown Timer

// Only run countdown timer if the elements exist (maintance.html)
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

if (daysEl && hoursEl && minutesEl && secondsEl) {
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
    daysEl.innerHTML = days.toString().padStart(2, "0");
    hoursEl.innerHTML = hours.toString().padStart(2, "0");
    minutesEl.innerHTML = minutes.toString().padStart(2, "0");
    secondsEl.innerHTML = seconds.toString().padStart(2, "0");

    // If the countdown is finished
    if (distance < 0) {
      clearInterval(timer);
      daysEl.innerHTML = "00";
      hoursEl.innerHTML = "00";
      minutesEl.innerHTML = "00";
      secondsEl.innerHTML = "00";
    }
  }, 1000);
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle (only for index.html)
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      const mobileMenu = document.getElementById("mobile-menu");
      if (mobileMenu) {
        mobileMenu.classList.toggle("hidden");
      }
    });
  }

  // Back to top button (only for index.html)
  const backToTopButton = document.getElementById("back-to-top");
  if (backToTopButton) {
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
  }

  // Contact form submission (only for index.html)
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Show success modal
      const successModal = document.getElementById("success-modal");
      if (successModal) {
        successModal.classList.remove("hidden");
      }

      // Reset form
      this.reset();
    });
  }

  // Close modal (only for index.html)
  const closeModalBtn = document.getElementById("close-modal");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", function () {
      const successModal = document.getElementById("success-modal");
      if (successModal) {
        successModal.classList.add("hidden");
      }
    });
  }

  // Close modal when clicking outside (only for index.html)
  const successModal = document.getElementById("success-modal");
  if (successModal) {
    successModal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.add("hidden");
      }
    });
  }

  // Active navigation highlighting (only for index.html)
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  if (sections.length > 0 && navLinks.length > 0) {
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
  }
});
