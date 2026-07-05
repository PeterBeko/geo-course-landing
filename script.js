const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const fallbackForm = document.querySelector(".fallback-form");

if (fallbackForm) {
  fallbackForm.addEventListener("submit", (event) => {
    if (fallbackForm.action.includes("example.com")) {
      event.preventDefault();
      const note = fallbackForm.querySelector(".form-note");
      if (note) {
        note.textContent = "MailerLite is not connected yet. This placeholder form is ready for the embed code.";
      }
    }
  });
}
