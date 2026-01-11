// js/main.js
(() => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const byDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

  const formatDate = (yyyyMmDd) => {
    const d = new Date(`${yyyyMmDd}T00:00:00`);
    if (Number.isNaN(d.getTime())) return yyyyMmDd;
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  };

  const escapeHtml = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])
    );

  const renderItems = (items, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    items.forEach((item) => {
      const a = document.createElement("a");
      a.className = "item";
      a.href = item.url;

      a.innerHTML = `
        <div>
          <h3>${escapeHtml(item.title)}</h3>
          <div class="meta">${escapeHtml(formatDate(item.date))} • ${escapeHtml(item.excerpt)}</div>
        </div>
        <div class="arrow">›</div>
      `;

      container.appendChild(a);
    });
  };

  // POSTS
  if (Array.isArray(window.POSTS)) {
    const sorted = [...window.POSTS].sort(byDateDesc);
    renderItems(sorted.slice(0, 3), "latestPosts"); // for Home + Projects (optional)
    renderItems(sorted, "allPosts");                // for Blog page
  }

  // PROJECTS
  if (Array.isArray(window.PROJECTS)) {
    const sorted = [...window.PROJECTS].sort(byDateDesc);
    renderItems(sorted.slice(0, 3), "latestProjects"); // for Home
    renderItems(sorted, "allProjects");                // for Projects page
  }
})();
