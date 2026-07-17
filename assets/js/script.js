'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    if (modalImg && modalTitle && modalText) {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    }
  });
}

// add click event to modal close button
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formInputs && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link for smooth scroll
navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    const targetPage = this.dataset.navLink || this.textContent.trim().toLowerCase();
    const targetElement = document.querySelector(`[data-page="${targetPage}"]`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// intersection observer for ScrollSpy
const observerOptions = {
  root: null,
  rootMargin: "-20% 0px -60% 0px",
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const pageName = entry.target.dataset.page;
      navigationLinks.forEach(link => {
        const linkPage = link.dataset.navLink || link.textContent.trim().toLowerCase();
        if (linkPage === pageName) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  });
}, observerOptions);

pages.forEach(page => observer.observe(page));

// Theme Toggle functionality
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIconLight = document.querySelector(".theme-icon-light");
const themeIconDark = document.querySelector(".theme-icon-dark");

const applyTheme = (theme) => {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeIconLight) themeIconLight.style.display = "none";
    if (themeIconDark) themeIconDark.style.display = "block";
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (themeIconLight) themeIconLight.style.display = "block";
    if (themeIconDark) themeIconDark.style.display = "none";
  }
}

// Initial theme check
const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const savedTheme = getPreferredTheme();
applyTheme(savedTheme);

// Listen to system theme changes in real-time
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    applyTheme(e.matches ? "dark" : "light");
  }
});

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  });
}

// Language Switcher functionality
const langButtons = document.querySelectorAll("[data-lang-btn]");

const translateCategories = (lang) => {
  const categories = document.querySelectorAll(".blog-category");
  categories.forEach(el => {
    if (!el.dataset.originalId) {
      el.dataset.originalId = el.textContent.trim();
    }
    const orig = el.dataset.originalId.toLowerCase();
    if (lang === "en") {
      if (orig === "sosial") el.textContent = "Social";
      else if (orig === "teknologi") el.textContent = "Technology";
      else if (orig === "kognitif") el.textContent = "Cognitive";
      else if (orig === "perkembangan") el.textContent = "Development";
    } else {
      el.textContent = el.dataset.originalId;
    }
  });
}

const translateLinks = (lang) => {
  const articleLinks = document.querySelectorAll(".blog-posts-list a");
  articleLinks.forEach(link => {
    if (!link.dataset.originalUrl) {
      link.dataset.originalUrl = link.getAttribute("href");
    }
    if (lang === "en") {
      const origUrl = link.dataset.originalUrl;
      if (origUrl.startsWith("http")) {
        link.href = `https://translate.google.com/translate?sl=id&tl=en&u=${encodeURIComponent(origUrl)}`;
      } else {
        link.href = origUrl;
      }
    } else if (lang === "ms") {
      const origUrl = link.dataset.originalUrl;
      if (origUrl.startsWith("http")) {
        link.href = `https://translate.google.com/translate?sl=id&tl=ms&u=${encodeURIComponent(origUrl)}`;
      } else {
        link.href = origUrl;
      }
    } else {
      link.href = link.dataset.originalUrl;
    }
  });
}

const translatePlaceholders = (lang) => {
  const searchInput = document.getElementById("project-search");
  if (searchInput) {
    searchInput.placeholder = lang === "en" ? "Search projects..." : lang === "ms" ? "Cari projek..." : "Cari proyek...";
  }
}

const filterAndSortProjects = () => {
  const searchVal = document.getElementById("project-search")?.value.toLowerCase() || "";
  const activeCat = document.querySelector(".filter-cat-btn.active")?.dataset.filterCat || "all";
  const customSortSelect = document.querySelector("[data-sort-select]");
  const sortVal = customSortSelect ? customSortSelect.getAttribute("data-current-sort") : "newest";

  const list = document.querySelector(".blog-posts-list");
  if (!list) return;

  const items = Array.from(list.querySelectorAll(".blog-post-item"));
  let visibleCount = 0;

  items.forEach(item => {
    const type = item.dataset.projectType || "artikel";
    const titleText = item.querySelector(".blog-item-title")?.textContent.toLowerCase() || "";
    const excerptText = item.querySelector(".blog-text")?.textContent.toLowerCase() || "";
    const searchTextCombined = titleText + " " + excerptText;

    const matchesSearch = searchTextCombined.includes(searchVal);
    const matchesCat = activeCat === "all" || type === activeCat;

    if (matchesSearch && matchesCat) {
      item.style.display = "block";
      visibleCount++;
    } else {
      item.style.display = "none";
    }
  });

  // Toggle "No projects found" message
  const noProjectsMsg = document.getElementById("no-projects-msg");
  if (noProjectsMsg) {
    noProjectsMsg.style.display = visibleCount === 0 ? "block" : "none";
  }

  items.sort((a, b) => {
    const dateA = new Date(a.dataset.date || "");
    const dateB = new Date(b.dataset.date || "");
    return sortVal === "newest" ? dateB - dateA : dateA - dateB;
  });

  items.forEach(item => list.appendChild(item));
}

const initProjectFilters = () => {
  const searchInput = document.getElementById("project-search");
  const catButtons = document.querySelectorAll(".filter-cat-btn");

  const customSortSelect = document.querySelector("[data-sort-select]");
  const sortValueBox = document.querySelector("[data-sort-value-box]");
  const sortBtns = document.querySelectorAll("[data-sort-btn]");
  const sortValueDisplay = document.querySelector("[data-sort-value]");

  if (sortValueBox && customSortSelect) {
    sortValueBox.addEventListener("click", () => {
      customSortSelect.classList.toggle("active");
    });
  }

  if (sortBtns.length > 0) {
    sortBtns.forEach(btn => {
      btn.addEventListener("click", function() {
        const value = this.getAttribute("data-sort-btn");
        customSortSelect.setAttribute("data-current-sort", value);
        sortValueDisplay.innerHTML = this.innerHTML;
        customSortSelect.classList.remove("active");
        filterAndSortProjects();
      });
    });
  }

  // Close custom select when clicking outside
  document.addEventListener("click", (e) => {
    if (customSortSelect && !customSortSelect.contains(e.target)) {
      customSortSelect.classList.remove("active");
    }
  });

  if (searchInput) {
    searchInput.addEventListener("input", filterAndSortProjects);
  }

  catButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      catButtons.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      filterAndSortProjects();
    });
  });
}

const applyLanguage = (lang) => {
  document.documentElement.setAttribute("lang", lang);
  langButtons.forEach(btn => {
    if (btn.getAttribute("data-lang-btn") === lang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  translateCategories(lang);
  translateLinks(lang);
  translatePlaceholders(lang);
  filterAndSortProjects();
}

// Initial language check
const savedLang = localStorage.getItem("lang") || "id";
applyLanguage(savedLang);
initProjectFilters();

langButtons.forEach(btn => {
  btn.addEventListener("click", function() {
    const lang = this.getAttribute("data-lang-btn");
    localStorage.setItem("lang", lang);
    applyLanguage(lang);
  });
});