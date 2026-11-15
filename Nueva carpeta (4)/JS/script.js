document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const nav = document.querySelector("nav");
  if (header && nav) {
    const drawer = document.createElement("div");
    drawer.className = "navigation-drawer";
    drawer.id = "navigation-drawer";
    header.append(drawer);

    const themeToggle = document.createElement("button");
    themeToggle.className = "theme-toggle";
    themeToggle.type = "button";
    themeToggle.setAttribute("aria-pressed", "false");
    themeToggle.setAttribute("aria-label", "Cambiar entre modo claro y modo oscuro");
    drawer.append(nav);
    header.insertBefore(themeToggle, drawer);

    const themeCookie = "descabellada-theme";
    const readSavedTheme = () => {
      const cookie = document.cookie
        .split(";")
        .map((part) => part.trim())
        .find((part) => part.startsWith(`${themeCookie}=`));
      return cookie?.slice(themeCookie.length + 1) === "dark";
    };
    const setTheme = (dark) => {
      document.body.classList.toggle("dark-mode", dark);
      themeToggle.setAttribute("aria-pressed", String(dark));
      themeToggle.textContent = dark ? "☀ Modo claro" : "☾ Modo oscuro";
      document.cookie = `${themeCookie}=${dark ? "dark" : "light"}; Max-Age=31536000; Path=/; SameSite=Lax`;
    };

    setTheme(readSavedTheme());
    themeToggle.addEventListener("click", () => {
      setTheme(!document.body.classList.contains("dark-mode"));
    });

    const toggle = document.createElement("button");
    toggle.className = "nav-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "navigation-drawer");
    toggle.setAttribute("aria-label", "Abrir menú de navegación");
    toggle.innerHTML = '<span></span><span></span><span></span>';
    header.insertBefore(toggle, drawer);
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      drawer.classList.toggle("is-open", !expanded);
    });
  }
  document.querySelectorAll("[data-current-year]").forEach((node) => (node.textContent = new Date().getFullYear()));
  const form = document.querySelector(".aura-form"); if (form) form.addEventListener("submit", (event) => { if (!form.checkValidity()) return; event.preventDefault(); const button = form.querySelector("button[type=submit]"); if (button) { button.textContent = "¡Inscripción preparada!"; button.disabled = true; } const notice = document.createElement("p"); notice.className = "form-success"; notice.setAttribute("role", "status"); notice.textContent = "Gracias. Revisá tu correo para recibir la confirmación de tu actividad."; form.append(notice); });
  const revealItems = document.querySelectorAll("article, .photo-story, .callout, .contact-card, .mini-gallery"); if ("IntersectionObserver" in window) { const observer = new IntersectionObserver((entries, instance) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); instance.unobserve(entry.target); } }), { threshold: 0.12 }); revealItems.forEach((item) => { item.classList.add("reveal"); observer.observe(item); }); } else revealItems.forEach((item) => item.classList.add("is-visible"));
});
