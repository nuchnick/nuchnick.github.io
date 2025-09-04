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


// Expand clicked thumbnail
function expandImage(img) {
  const expandedImg = document.getElementById("expandedImg");
  expandedImg.src = img.src;
  expandedImg.alt = img.alt;

}


// Show selected album
function showAlbum(albumId) {
  // Hide all albums
  document.querySelectorAll(".gallery-row").forEach(row => {
    row.classList.remove("active");
  });

  // Show chosen album
  document.getElementById(albumId).classList.add("active");

  // Update album buttons
  document.querySelectorAll(".album-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");

  // Reset preview to first image of new album
  const firstImg = document.querySelector(`#${albumId} img`);
  if (firstImg) expandImage(firstImg);
}

// Enable swipe on scrollable gallery rows
function enableSwipeScroll() {
  const rows = document.querySelectorAll(".gallery-row");

  rows.forEach(row => {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Desktop mouse drag
    row.addEventListener("mousedown", (e) => {
      isDown = true;
      row.classList.add("dragging");
      startX = e.pageX - row.offsetLeft;
      scrollLeft = row.scrollLeft;
    });

    row.addEventListener("mouseleave", () => {
      isDown = false;
      row.classList.remove("dragging");
    });

    row.addEventListener("mouseup", () => {
      isDown = false;
      row.classList.remove("dragging");
    });

    row.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - row.offsetLeft;
      const walk = (x - startX) * 1.5; // scroll speed factor
      row.scrollLeft = scrollLeft - walk;
    });

    // Touch swipe (mobile)
    let touchStartX = 0;
    row.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      scrollLeft = row.scrollLeft;
    });

    row.addEventListener("touchmove", (e) => {
      const touchX = e.touches[0].clientX;
      const walk = (touchX - touchStartX) * 1.5;
      row.scrollLeft = scrollLeft - walk;
    });
  });
}

// Call this on page load
document.addEventListener("DOMContentLoaded", enableSwipeScroll);