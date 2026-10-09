// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  const closeNav = () => {
    navToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("is-open");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    mainNav.classList.toggle("is-open", !isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });
}

// Click-to-copy for the email address
const copyButton = document.querySelector(".contact-item__copy");

if (copyButton) {
  const originalLabel = copyButton.textContent;

  const fallbackCopy = (text) => {
    const input = document.createElement("textarea");
    input.value = text;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.focus();
    input.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (err) {
      ok = false;
    }
    document.body.removeChild(input);
    return ok;
  };

  copyButton.addEventListener("click", () => {
    // execCommand runs synchronously inside the click, so it never loses
    // the user-gesture context the way an awaited clipboard call can.
    const copied = fallbackCopy(copyButton.dataset.copy);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(copyButton.dataset.copy).catch(() => {});
    }

    if (!copied) return;
    copyButton.textContent = "Copied!";
    copyButton.classList.add("is-copied");
    setTimeout(() => {
      copyButton.textContent = originalLabel;
      copyButton.classList.remove("is-copied");
    }, 1500);
  });
}
