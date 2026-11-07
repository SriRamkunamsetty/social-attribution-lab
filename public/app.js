const app = document.querySelector("#app");
const slug = location.pathname.startsWith("/apps/") ? location.pathname.split("/").pop() : new URLSearchParams(location.search).get("project");

const esc = (value) => String(value).replace(/[&<>"]/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" })[c]);
function chart(points, color) { const max = Math.max(...points); const coords = points.map((p, i) => `${(i / (points.length - 1)) * 100},${100 - (p / max) * 84 - 8}`).join(" "); return `<svg class="chart" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="12 period trend"><polyline points="${coords}" fill="none" stroke="${color}" stroke-width="2.6" vector-effect="non-scaling-stroke"/><polyline points="0,100 ${coords} 100,100" fill="${color}" opacity=".11"/></svg>`; }
function render(p, all) {
  document.title = `${p.name} · Social Analytics`;
  app.innerHTML = `<aside><a class="brand" href="/"><span>${p.icon}</span> SOCIAL<br>INTELLIGENCE</a><p class="eyebrow">Portfolio suite</p><nav>${all.map(x => `<a class="nav ${x.slug === p.slug ? "active" : ""}" href="/apps/${x.slug}"><b>${x.number}</b><span>${esc(x.name)}</span></a>`).join("")}</nav><div class="sidebar-note"><strong>Demo environment</strong><br>Seeded data · no client data<br><a href="/health">System health</a></div></aside><main style="--accent:${p.accent}"><header><div><p class="eyebrow">${esc(p.kicker)}</p><h1>${esc(p.name)}</h1><p class="subtitle">${esc(p.description)}</p></div><div class="fresh"><span></span> Data quality: 92% complete<br><small>Last refresh: demo dataset</small></div></header><section class="context"><div><p class="eyebrow">Decision objective</p><strong>${esc(p.objective)}</strong></div><div class="controls"><button data-action="period">Last 14 days ▾</button><button data-action="export" class="primary">Export brief</button></div></section><section class="kpis">${p.kpis.map(k => `<article><p>${esc(k.label)}</p><h2>${esc(k.value)}</h2><small class="up">${esc(k.delta)}</small></article>`).join("")}</section><section class="grid"><article class="panel trend"><div class="panel-title"><div><p class="eyebrow">Performance trajectory</p><h2>Momentum over time</h2></div><button data-action="detail">View query</button></div>${chart(p.chart, p.accent)}<div class="axis"><span>12 periods ago</span><span>Current</span></div></article><article class="panel insight"><p class="eyebrow">Decision-ready insight</p><h2>What changed—and what to do next</h2><p>${esc(p.insight)}</p><div class="evidence">✓ ${esc(p.evidence)}</div><div class="actions">${p.actions.map(a => `<button data-action="${esc(a)}">${esc(a)} →</button>`).join("")}</div></article></section><section class="panel table-panel"><div class="panel-title"><div><p class="eyebrow">Evidence table</p><h2>Comparable performance view</h2></div><span class="pill">Auditable</span></div><div class="table-wrap"><table><thead><tr><th>Dimension</th><th>Performance</th><th>Quality / sentiment</th><th>Channel / sample</th><th>Decision</th></tr></thead><tbody>${p.table.map(row => `<tr>${row.map(cell => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></section><footer>Metric definitions are versioned · Findings are evidence-linked · Recommendations require analyst review</footer></main>`;
  document.querySelectorAll("button").forEach((button) => button.addEventListener("click", async () => {
    const action = button.dataset.action;
    if (!action) return;
    button.disabled = true;
    try {
      if (action === "export") {
        const result = await fetch("/api/v1/reports", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ projectSlug: p.slug }) });
        if (!result.ok) throw new Error("report_failed");
        button.textContent = "Brief queued ✓";
      } else {
        const types = { "Approve final-week creator boost": "recommendation_assigned", "Open evidence sample": "alert_acknowledged", "Draft test hypothesis": "creative_test_drafted", "Compare shortlists": "creator_reviewed" };
        const result = await fetch("/api/v1/actions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ projectSlug: p.slug, type: types[action] ?? "alert_acknowledged", note: action }) });
        if (!result.ok) throw new Error("action_failed");
        button.textContent = "Action logged ✓";
      }
    } catch { button.textContent = "Try again"; button.disabled = false; }
  }));
}
fetch("/api/projects").then(r => r.json()).then(async (list) => {
  const target = slug ?? list.data[0]?.slug;
  const project = await fetch(`/api/projects/${target}`).then(r => r.json());
  if (!project.data) throw new Error("project_not_found");
  render(project.data, list.data);
}).catch(() => app.innerHTML = "<main><h1>Unable to load the demo.</h1><p>Start the local server with npm run dev.</p></main>");
