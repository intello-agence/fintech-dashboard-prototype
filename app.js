// public/prototypes/fintech-dashboard/app.js
// VERSION FINALE — Stable + Complet

(() => {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const CountUpClass = (window.CountUp && (window.CountUp.CountUp || window.CountUp)) || null;

  // State
  let mainChart = null;
  let sparkCharts = {};
  let period = 7;
  let product = 'all';
  let clientFilter = 'all';
  let clients = [];

  // Formats
  const fmtFCFA = (n) => `${Math.round(n).toLocaleString('fr-FR')} FCFA`;
  const fmtPct = (n) => `${n.toFixed(1).replace('.', ',')}%`;

  // Noms clients
  const CLIENT_NAMES = [
    'Alpha Corp', 'Beta SARL', 'Gamma Inc', 'Delta Ltd', 'Epsilon Group',
    'Zeta SA', 'Oméga Tech', 'Nova Labs', 'Atlas Finance', 'Pulsar Systems',
    'Kappa Digital', 'Orion Holding', 'Apex Solutions', 'Vertex Cloud', 'Nimbus Co.'
  ];

  const PLANS = ['Premium', 'Business', 'Enterprise'];

  const PRODUCT_MULT = {
    all: 1.0,
    premium: 1.2,
    business: 1.1,
    enterprise: 1.35,
  };

  // Génération données MRR
  function genData(n) {
    const base = 1500000 * (PRODUCT_MULT[product] || 1.0);
    const data = [];
    for (let i = 0; i < n; i++) {
      data.push(base + Math.random() * 300000 - 150000);
    }
    return data;
  }

  // Génération clients
  function genClients() {
    return CLIENT_NAMES.map((name, i) => {
      const plan = PLANS[i % PLANS.length];
      const baseRevenue = 60000 + Math.random() * 220000;
      let revenue = baseRevenue * (PRODUCT_MULT[product] || 1.0);

      // Boost si filtre client spécifique
      if (clientFilter !== 'all') {
        const target = clientFilter.charAt(0).toUpperCase() + clientFilter.slice(1);
        if (name.toLowerCase().includes(target.toLowerCase())) {
          revenue *= 1.25;
        }
      }

      const status = revenue > 200000 ? 'Actif' : revenue < 90000 ? 'À risque' : 'En observation';
      return { name, plan, revenue, status };
    });
  }

  // Update KPI avec animation
  function updateKPI(id, value, isPct = false) {
    const el = document.getElementById(id);
    if (!el) return;

    if (!CountUpClass) {
      el.textContent = isPct ? fmtPct(value) : fmtFCFA(value);
      return;
    }

    const cu = new CountUpClass(el, value, {
      duration: 1.2,
      separator: ' ',
      formattingFn: isPct ? (v) => fmtPct(v) : (v) => fmtFCFA(v),
    });

    if (!cu.error) cu.start();
    else el.textContent = isPct ? fmtPct(value) : fmtFCFA(value);
  }

  // Update changement
  function updateChange(id, pct, goodWhenUp = true) {
    const el = document.getElementById(id);
    if (!el) return;

    const isUp = pct >= 0;
    const isGood = goodWhenUp ? isUp : !isUp;

    el.classList.toggle('positive', isGood);
    el.classList.toggle('negative', !isGood);

    const span = el.querySelector('span');
    if (span) span.textContent = `${isUp ? '+' : ''}${fmtPct(pct)}`;
  }

  // Build sparkline
  function buildSparkline(id, data, color) {
    const canvas = document.getElementById(id);
    if (!canvas) return;

    // DÉTRUIRE ancienne instance
    if (sparkCharts[id]) {
      sparkCharts[id].destroy();
      delete sparkCharts[id];
    }

    const ctx = canvas.getContext('2d');

    // Force dimensions canvas AVANT création
    canvas.width = canvas.parentElement.offsetWidth || 200;
    canvas.height = 46;
    canvas.style.width = '100%';
    canvas.style.height = '46px';

    // Gradient subtil
    const gradient = ctx.createLinearGradient(0, 0, 0, 46);
    gradient.addColorStop(0, `${color}33`);
    gradient.addColorStop(1, `${color}05`);

    sparkCharts[id] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, i) => i + 1),
        datasets: [{
          data: data,
          borderColor: color,
          backgroundColor: gradient,
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.4,
          fill: true,
        }],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        scales: {
          x: { display: false },
          y: { display: false },
        },
        animation: {
          duration: 600,
          easing: 'easeOutQuart',
        },
      },
    });
  }

  // Update tous les KPIs + Sparklines
  function updateKPIs(data) {
    const last = data[data.length - 1];
    const prev = data[data.length - 2] || last;

    const mrr = last;
    const arr = mrr * 12;
    const cac = mrr / 8;
    const churn = 2.5 + Math.random() * 1.5;

    const mrrChange = ((mrr - prev) / prev) * 100;
    const arrChange = mrrChange;
    const cacChange = -2 + Math.random() * 4;
    const churnChange = -1.5 + Math.random() * 3;

    // Update valeurs
    updateKPI('mrr-value', mrr);
    updateKPI('arr-value', arr);
    updateKPI('cac-value', cac);

    const churnEl = $('#churn-value');
    if (churnEl) churnEl.textContent = fmtPct(churn);

    // Update changements
    updateChange('mrr-change', mrrChange, true);
    updateChange('arr-change', arrChange, true);
    updateChange('cac-change', cacChange, false);
    updateChange('churn-change', churnChange, false);

    // Sparklines (fenêtre glissante)
    const winSize = Math.min(20, data.length);
    const recent = data.slice(-winSize);
    const recentArr = recent.map(v => v * 12);
    const recentCac = recent.map(v => v / 8);
    const recentChurn = recent.map(() => 2.5 + Math.random() * 1.5);

    buildSparkline('sparkline-mrr', recent, '#06b6d4');
    buildSparkline('sparkline-arr', recentArr, '#8b5cf6');
    buildSparkline('sparkline-cac', recentCac, '#f59e0b');
    buildSparkline('sparkline-churn', recentChurn, '#ef4444');
  }

  // Build chart principal
  function buildChart() {
    const canvas = document.getElementById('mainChart');
    if (!canvas) return;

    // DÉTRUIRE ancien chart
    if (mainChart) {
      mainChart.destroy();
      mainChart = null;
    }

    const ctx = canvas.getContext('2d');
    const data = genData(period);

    // Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 320);
    gradient.addColorStop(0, 'rgba(6,182,212,0.4)');
    gradient.addColorStop(1, 'rgba(6,182,212,0.02)');

    mainChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: period }, (_, i) => i + 1),
        datasets: [{
          label: 'MRR',
          data: data,
          borderColor: '#06b6d4',
          backgroundColor: gradient,
          borderWidth: 2.5,
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#06b6d4',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(10, 15, 26, 0.95)',
            titleColor: '#e6eef5',
            bodyColor: '#9aa3b2',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              title: (items) => `Jour ${items[0].label}`,
              label: (item) => ` MRR: ${Math.round(item.parsed.y).toLocaleString('fr-FR')} FCFA`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#9aa3b2', maxTicksLimit: 12 },
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: {
              color: '#9aa3b2',
              callback: (v) => {
                const m = v / 1000000;
                return m >= 1 ? `${m.toFixed(1)}M` : `${(v / 1000).toFixed(0)}k`;
              },
            },
          },
        },
        animation: {
          duration: 750,
          easing: 'easeInOutQuart',
        },
      },
    });

    // Update KPIs + Sparklines
    updateKPIs(data);

    console.log('✅ Chart + KPIs + Sparklines:', period, 'jours');
  }

  // Render table
  function renderTable(list) {
    const tbody = $('#tableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    list.forEach((c) => {
      const badgeClass = c.status === 'Actif' ? 'good' : c.status.includes('risque') ? 'bad' : 'warn';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${c.name}</strong></td>
        <td>${c.plan}</td>
        <td><strong>${fmtFCFA(c.revenue)}</strong></td>
        <td><span class="badge ${badgeClass}">${c.status}</span></td>
        <td><button class="table-action" data-client="${c.name}">👁️ Voir</button></td>
      `;
      tbody.appendChild(tr);
    });

    // Events boutons
    $$('#tableBody .table-action').forEach((btn) => {
      btn.addEventListener('click', () => {
        alert(`📊 Détails client: ${btn.dataset.client}\n\n(Fonctionnalité future: modal détails)`);
      });
    });
  }

  // Appliquer recherche + tri
  function applySearchSort() {
    const query = ($('#searchInput')?.value || '').toLowerCase();
    const sortBy = $('#sortSelect')?.value || 'revenue';

    let list = clients.filter((c) => c.name.toLowerCase().includes(query));

    list.sort((a, b) => {
      if (sortBy === 'revenue') return b.revenue - a.revenue;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'plan') return a.plan.localeCompare(b.plan);
      return 0;
    });

    renderTable(list);
  }

  // Export CSV
  function toCSV(rows) {
    return rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  }

  function doExportCSV() {
    const data = genData(period);

    // Section 1: Données MRR
    const rows1 = [['Jour', 'MRR (FCFA)']];
    data.forEach((val, i) => rows1.push([i + 1, Math.round(val)]));

    // Section 2: Clients
    const rows2 = [['Client', 'Plan', 'CA Mensuel (FCFA)', 'Statut']];
    clients.forEach((c) => rows2.push([c.name, c.plan, Math.round(c.revenue), c.status]));

    const csv = toCSV(rows1) + '\n\n' + toCSV(rows2);

    // Téléchargement avec BOM UTF-8
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fintech-dashboard-${period}j-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    console.log('✅ Export CSV téléchargé');
  }

  // Modal
  function openModal() { $('#exportModal')?.classList.add('show'); }
  function closeModal() { $('#exportModal')?.classList.remove('show'); }

  // Refresh all
  function refreshAll() {
    clients = genClients();
    buildChart();
    applySearchSort();
  }

  // Events
  document.addEventListener('DOMContentLoaded', () => {
    // Période
    $$('.btn-filter').forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('.btn-filter').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        period = parseInt(btn.dataset.period, 10);
        refreshAll();
      });
    });

    // Filtres produit/client
    $('#productFilter')?.addEventListener('change', (e) => {
      product = e.target.value;
      refreshAll();
    });

    $('#clientFilter')?.addEventListener('change', (e) => {
      clientFilter = e.target.value;
      refreshAll();
    });

    // Recherche (debounced)
    let searchTimeout;
    $('#searchInput')?.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(applySearchSort, 200);
    });

    // Tri
    $('#sortSelect')?.addEventListener('change', applySearchSort);

    // Export
    $('#exportBtn')?.addEventListener('click', openModal);
    $('#closeModal')?.addEventListener('click', closeModal);
    $('#confirmExport')?.addEventListener('click', () => {
      doExportCSV();
      closeModal();
    });

    // Refresh
    $('#refreshBtn')?.addEventListener('click', () => {
      const btn = $('#refreshBtn');
      if (btn) {
        btn.style.transform = 'rotate(360deg)';
        btn.style.transition = 'transform 0.6s ease';
        setTimeout(() => { btn.style.transform = ''; }, 600);
      }
      refreshAll();
    });

    // Close modal overlay + Escape
    $('#exportModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'exportModal') closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // Init
    refreshAll();
    console.log('%c💎 FinTech Dashboard Pro', 'color: #06b6d4; font-size: 18px; font-weight: bold;');
    console.log('%cPrototype Premium — Intello', 'color: #9aa3b2; font-size: 12px;');
  });
})();