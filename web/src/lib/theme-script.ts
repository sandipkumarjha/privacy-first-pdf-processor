// Runs before paint via a blocking inline <script> in the document head.
// Keeping it tiny and dependency-free is intentional — this must execute
// synchronously before first paint to avoid a flash of the wrong theme.
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    }
  } catch (e) {}
})();
`
