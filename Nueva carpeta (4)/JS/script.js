document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const nav = document.querySelector("nav");
  if (header && nav) {
    const toggle = document.createElement("button");
    toggle.className = "nav-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "main-navigation");
    toggle.innerHTML = '<span class="visually-hidden">Abrir menú</span><span></span><span></span><span></span>';
    nav.id = "main-navigation";
    header.insertBefore(toggle, nav);
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
    });
  }

  const yearNodes = document.querySelectorAll("[data-current-year]");
  yearNodes.forEach((node) => (node.textContent = new Date().getFullYear()));

  const form = document.querySelector(".aura-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) return;
      event.preventDefault();
      const button = form.querySelector("button[type=submit]");
      if (button) {
        button.textContent = "¡Inscripción preparada!";
        button.disabled = true;
      }
      const notice = document.createElement("p");
      notice.className = "form-success";
      notice.setAttribute("role", "status");
      notice.textContent = "Gracias. Revisá tu correo para recibir la confirmación de tu actividad.";
      form.append(notice);
    });
  }

  const revealItems = document.querySelectorAll("article, .photo-story, .callout, .contact-card, .mini-gallery");
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => {
    item.classList.add("reveal");
    observer.observe(item);
  });
});
