document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImage = lightbox?.querySelector(".lightbox-image");
  const closeButton = lightbox?.querySelector(".lightbox-close");
  const triggers = document.querySelectorAll(".work-image img");
  let activeTrigger = null;

  if (!lightbox || !lightboxImage || !closeButton || triggers.length === 0) {
    return;
  }

  const openLightbox = (img) => {
    activeTrigger = img;
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
    activeTrigger?.focus();
    activeTrigger = null;
  };

  triggers.forEach((img) => {
    img.classList.add("work-lightbox-trigger");
    img.setAttribute("role", "button");
    img.setAttribute("tabindex", "0");
    img.setAttribute("aria-label", `${img.alt || "作品画像"}を大きく表示`);

    img.addEventListener("click", () => openLightbox(img));
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(img);
      }
    });
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  closeButton.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
});
