const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const imageModal = document.querySelector("#image-modal");
const imageModalImg = imageModal.querySelector("img");
const imageModalClose = imageModal.querySelector(".image-modal-close");
const imageZoomTriggers = document.querySelectorAll(".image-zoom-trigger");
const sitePreviewModal = document.querySelector("#site-preview-modal");
const sitePreviewFrame = sitePreviewModal.querySelector("iframe");
const sitePreviewClose = sitePreviewModal.querySelector(".site-preview-close");
const sitePreviewTriggers = document.querySelectorAll(".preview-site-trigger");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

imageZoomTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const image = trigger.querySelector("img");
    imageModalImg.src = image.src;
    imageModalImg.alt = image.alt;
    imageModal.classList.add("is-open");
    imageModal.setAttribute("aria-hidden", "false");
    imageModalClose.focus();
  });
});

const closeImageModal = () => {
  imageModal.classList.remove("is-open");
  imageModal.setAttribute("aria-hidden", "true");
  imageModalImg.src = "";
  imageModalImg.alt = "";
};

imageModalClose.addEventListener("click", closeImageModal);

imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal) {
    closeImageModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && imageModal.classList.contains("is-open")) {
    closeImageModal();
  }

  if (event.key === "Escape" && sitePreviewModal.classList.contains("is-open")) {
    closeSitePreview();
  }
});

sitePreviewTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    sitePreviewFrame.src = trigger.dataset.previewUrl;
    sitePreviewModal.classList.add("is-open");
    sitePreviewModal.setAttribute("aria-hidden", "false");
    sitePreviewClose.focus();
  });
});

const closeSitePreview = () => {
  sitePreviewModal.classList.remove("is-open");
  sitePreviewModal.setAttribute("aria-hidden", "true");
  sitePreviewFrame.src = "";
};

sitePreviewClose.addEventListener("click", closeSitePreview);

sitePreviewModal.addEventListener("click", (event) => {
  if (event.target === sitePreviewModal) {
    closeSitePreview();
  }
});
