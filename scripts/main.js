/* =========================
   MAIN UI HANDLER
   ========================= */
import "./interactions.js";
import "./animations.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio loaded");

  /* ---------- MOBILE NAV ---------- */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
      });
    });
  }

  /* ---------- SCROLL SPY ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");

  function activateLink(id) {
    [...navLinks, ...mobileLinks].forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${id}`
      );
    });
  }

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.id;
      }
    });

    if (current) activateLink(current);
  });

  /* ---------- HASH SCROLL FIX ---------- */
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  }
});
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach(el => revealObserver.observe(el));
document.querySelectorAll(".education-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });
});

const timeline = document.querySelector(".timeline");
const progress = document.querySelector(".timeline-progress");

let currentHeight = 0;

window.addEventListener("scroll", () => {
  const timelineRect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  let target =
    ((windowHeight - timelineRect.top) / timeline.offsetHeight) * 100;

  target = Math.max(0, Math.min(100, target));

  // smooth interpolation (THIS makes it human)
  currentHeight += (target - currentHeight) * 0.08;

  progress.style.height = `${currentHeight}%`;
});


const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});