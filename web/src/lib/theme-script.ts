// Runs before paint via a blocking inline <script> in the document head.
// Keeping it tiny and dependency-free is intentional — this must execute
// synchronously before first paint to avoid a flash of the wrong theme.
//
// The class applied must be `dark`, since that is the only theme class
// globals.css defines (`@custom-variant dark`). Light (cream) is the default.
export const THEME_STORAGE_KEY = 'theme'

export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    // Cream is the brand: dark is opt-in via the toggle only, and the
    // OS colour scheme is deliberately not consulted.
    document.documentElement.classList.toggle('dark', stored === 'dark');
  } catch (e) {}
})();
`
