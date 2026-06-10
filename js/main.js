console.log("Personalized Trip Planner frontend structure loaded.");

document.addEventListener("DOMContentLoaded", function () {
  initializeMobileNavigation();
  updateNavigationForLoginState();
});

// Toggles the mobile navigation menu when the Menu button is clicked.
// Expects a .nav-toggle button and a .site-nav element on the page.
// Updates the visible menu state and aria-expanded value for accessibility.
function initializeMobileNavigation() {
  const navToggleButton = document.querySelector(".nav-toggle");
  const siteNavigation = document.querySelector(".site-nav");

  if (navToggleButton && siteNavigation) {
    navToggleButton.addEventListener("click", function () {
      const isOpen = siteNavigation.classList.toggle("is-open");
      navToggleButton.setAttribute("aria-expanded", isOpen);
    });
  }
}

// Updates the shared navigation for the current login state.
// Expects window.appStorage when storage.js is loaded on a page.
// Shows a greeting and Log Out button for logged-in users.
function updateNavigationForLoginState() {
  if (!window.appStorage || !window.appStorage.isUserLoggedIn()) {
    return;
  }

  const siteNavigationList = document.querySelector(".site-nav ul");
  const currentUser = window.appStorage.getCurrentUser();

  if (!siteNavigationList || !currentUser) {
    return;
  }

  const loginLink = siteNavigationList.querySelector('a[href="login.html"], a[href="pages/login.html"], .nav-greeting');
  const signupLink = siteNavigationList.querySelector('a[href="signup.html"], a[href="pages/signup.html"], .logout-link');

  if (loginLink) {
    loginLink.textContent = "Hi, " + currentUser.firstName;
    loginLink.removeAttribute("href");
    loginLink.classList.add("nav-greeting");
  }

  if (signupLink) {
    signupLink.textContent = "Log Out";
    signupLink.removeAttribute("href");
    signupLink.classList.remove("nav-cta");
    signupLink.classList.add("logout-link");
    signupLink.setAttribute("role", "button");

    if (!signupLink.dataset.logoutReady) {
      signupLink.dataset.logoutReady = "true";
      signupLink.addEventListener("click", function () {
        window.appStorage.clearCurrentUser();
        redirectAfterLogout();
      });
    }
  }
}

window.updateNavigationForLoginState = updateNavigationForLoginState;

// Redirects after logout using the correct relative path.
// Expects no input.
// Sends users back to the real homepage from root or page files.
function redirectAfterLogout() {
  const isRootPage = !window.location.pathname.includes("/pages/");
  window.location.href = isRootPage ? "index.html" : "../index.html";
}
