const BASE_URL = window.location.protocol === 'file:' ? 'http://localhost:3000' : '';

// --- TOAST NOTIFICATIONS ---
function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  const icon = type === "success" ? "fa-check-circle" : type === "error" ? "fa-times-circle" : "fa-info-circle";
  
  toast.innerHTML = `<i class="fas ${icon}" style="font-size: 18px;"></i> <span>${message}</span>`;
  
  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add("show"), 10);

  // Remove after 3s
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --- THEME TOGGLE ---
function toggleTheme() {
  const isLight = document.body.classList.toggle("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  
  const themeIcon = document.getElementById("themeIcon");
  if (themeIcon) {
    themeIcon.className = isLight ? "fas fa-moon" : "fas fa-sun";
  }
}

// Apply saved theme on load
document.addEventListener("DOMContentLoaded", () => {
  const isLight = localStorage.getItem("theme") === "light";
  if (isLight) {
    document.body.classList.add("light-mode");
  }
  const themeIcon = document.getElementById("themeIcon");
  if (themeIcon) {
    themeIcon.className = isLight ? "fas fa-moon" : "fas fa-sun";
  }
});

// --- PARTICLES INIT ---
function initParticles() {
  if (typeof particlesJS !== "undefined") {
    // Add particle container
    const pdiv = document.createElement("div");
    pdiv.id = "particles-js";
    document.body.prepend(pdiv);

    particlesJS("particles-js", {
      particles: {
        number: { value: 40, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.1, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.1, width: 1 },
        move: { enable: true, speed: 1, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
      },
      interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: false }, resize: true },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.3 } } }
      },
      retina_detect: true
    });
  }
}

document.addEventListener("DOMContentLoaded", initParticles);
