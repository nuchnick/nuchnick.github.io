// Fade-in + fade-out using Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible"); // fade out when leaving
    }
  });
}, {
  threshold: 0.2 // 20% of section visible triggers animation
});

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach(el => {
  observer.observe(el);
});

// Carousel with auto-slide + buttons
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  if (track && prevBtn && nextBtn) {
    let index = 0;
    const slides = track.children.length;
    let autoSlideInterval;

    function updateCarousel() {
      track.style.transition = "transform 0.8s ease";
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        index = (index + 1) % slides;
        updateCarousel();
      }, 4000); // slide every 4s
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    // Button controls
    nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides;
      updateCarousel();
      resetAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides) % slides;
      updateCarousel();
      resetAutoSlide();
    });

    // Start autoplay when page loads
    startAutoSlide();
  }
});