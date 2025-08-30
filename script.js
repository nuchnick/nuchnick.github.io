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

// Carousel auto-play + touch support
const track = document.querySelector(".carousel-track");
if (track) {
  let index = 0;
  const slides = track.children.length;
  let startX = 0;
  let currentX = 0;

  // Auto-play
  setInterval(() => {
    index = (index + 1) % slides;
    track.style.transform = `translateX(-${index * 100}%)`;
    track.style.transition = "transform 0.8s ease";
  }, 4000);

  // Touch start
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    track.style.transition = "none"; // cancel smooth for drag
  });

  // Touch move
  track.addEventListener("touchmove", (e) => {
    currentX = e.touches[0].clientX - startX;
    track.style.transform = `translateX(calc(-${index * 100}% + ${currentX}px))`;
  });

  // Touch end
  track.addEventListener("touchend", (e) => {
    if (currentX > 50 && index > 0) {
      index--; // swipe right → previous slide
    } else if (currentX < -50 && index < slides - 1) {
      index++; // swipe left → next slide
    }
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${index * 100}%)`;

    // reset drag distance
    currentX = 0;
  });
}