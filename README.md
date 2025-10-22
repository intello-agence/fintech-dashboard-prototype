# 💎 FinTech Dashboard Pro — Prototype SaaS Analytics

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-demo-orange.svg)

**Prototype de dashboard financier SaaS avec KPIs temps réel et visualisations interactives**  
Développé par [Intello](https://github.com/intello-agence) — Démonstration de compétences techniques sectorielles.

---

## 📋 Vue d'ensemble

FinTech Dashboard Pro est un prototype de tableau de bord financier SaaS présentant :
- **KPIs temps réel** : MRR, ARR, CAC, Churn avec animations CountUp.js
- **Graphique principal** : Évolution MRR multi-datasets (réel, objectif, prévision) avec Chart.js
- **4 Sparklines** : Mini-graphiques temps réel par métrique clé
- **Table clients** : Recherche live, tri dynamique (CA/nom/plan), filtres
- **Export CSV** : Téléchargement données avec BOM UTF-8 (Excel-compatible)
- **Filtres avancés** : Période (7j/30j/90j/1an), produit (Premium/Business/Enterprise), client

**Technologies utilisées :**
- HTML5 sémantique (accessibilité ARIA, skip link)
- CSS3 (Glassmorphism, animations, responsive 2 breakpoints)
- Vanilla JavaScript ES6+ (IIFE, strict mode, no frameworks)
- [Chart.js 4.4.0](https://www.chartjs.org/) (graphiques + sparklines)
- [CountUp.js 2.8.0](https://inorganik.github.io/countUp.js/) (animations numériques)

---

## ✨ Fonctionnalités

### 📊 KPIs Animés (4 métriques principales)

- **MRR (Monthly Recurring Revenue)** : Revenu mensuel récurrent
- **ARR (Annual Recurring Revenue)** : Revenu annuel récurrent (MRR × 12)
- **CAC (Customer Acquisition Cost)** : Coût d'acquisition client
- **Churn** : Taux d'attrition mensuel
- **Animations CountUp.js** : Transition fluide des valeurs (1.2s)
- **Badges changement** : Variation en % avec code couleur (vert = positif, rouge = négatif)
- **Sparklines** : Mini-graphique Chart.js par KPI (fenêtre glissante 20 points)

### 📈 Graphique Principal (Chart.js)

- **Multi-datasets** : MRR réel, objectif, prévision (3 courbes)
- **Responsive** : Ajustement automatique à la largeur conteneur
- **Interactions** : Tooltip au survol avec formatage FCFA
- **Gradients** : Background dégradé sous la courbe
- **Animation** : Entrée fluide (750ms, easing custom)

### 🔍 Table Clients Triable

- **Recherche live** : Filtrage instantané par nom (debounce 200ms)
- **Tri dynamique** : Par CA (décroissant), nom (alpha), plan (alpha)
- **Badges statut** : Actif (vert), En observation (orange), À risque (rouge)
- **Actions** : Bouton "Voir détails" par client (placeholder modal)
- **Responsive** : Scroll horizontal sur mobile

### ⚙️ Filtres Avancés

- **Période** : 7 jours, 30 jours, 90 jours, 1 an (boutons toggle)
- **Produit** : Tous, Premium (+20% revenus), Business (+10%), Enterprise (+35%)
- **Client** : Tous, Alpha Corp, Beta SARL, Gamma Inc (+25% revenus si sélectionné)
- **Refresh** : Bouton avec animation rotation 360° (régénération données)

### 💾 Export CSV

- **Contenu** : Données MRR par jour + liste clients complète
- **Encodage** : UTF-8 avec BOM (compatible Excel Windows)
- **Format** : Nom de fichier : `fintech-dashboard-{période}j-{timestamp}.csv`
- **Modal confirmation** : Description du contenu exporté
- **Sécurité** : Échappement guillemets dans CSV (RFC 4180)

### 🔐 Sécurité & Accessibilité

- **Validation** : Sanitization avec `escapeHTML()` sur tout innerHTML
- **XSS Prevention** : Pas de `eval()`, pas de `innerHTML` direct non sécurisé
- **Accessibilité** :
  - Skip link (navigation clavier)
  - ARIA labels complets (`aria-labelledby`, `aria-live`, `role="dialog"`)
  - Focus visible customisé (outline cyan 2px)
  - Navigation clavier complète (Tab, Shift+Tab, Escape)
  - Sémantique HTML5 (`<main>`, `<section>`, `<article>`, `<h2>`, `<h3>`)
- **Screen reader** : Labels `.sr-only`, attributs `aria-pressed` sur filtres

### 🚀 Performance

- Images lazy loading (N/A ici, pas d'images lourdes)
- Debounce sur recherche (200ms)
- Chart.js destroy avant re-création (pas de memory leak)
- Canvas dimensions forcées (fix rendering issues)
- CSS `will-change` sur animations critiques
- Scripts `defer` (non-bloquants)

---

## 🖼️ Screenshots

### Dashboard Principal (KPIs + Chart + Filtres)
![Dashboard Main](./screenshots/dashboard-overview.png)

### Table Clients (Recherche + Tri)
![Table Clients](./screenshots/table-clients.png)

---

## 📦 Installation & Utilisation

### Prérequis
- Navigateur moderne (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Serveur HTTP local (optionnel, car pas de modules ES6 dans ce proto)

### Lancement rapide

1. **Cloner le repository**
   ```bash
   git clone https://github.com/intello-agence/fintech-dashboard-prototype.git
   cd fintech-dashboard-prototype
   ```

2. **Ouvrir dans le navigateur**
   - **Méthode 1 (simple)** : Double-clic sur `index.html`
   - **Méthode 2 (serveur local)** :
     ```bash
     # Avec Python 3
     python -m http.server 8000
     # Puis ouvrir http://localhost:8000
     
     # Avec Node.js (npx http-server)
     npx http-server -p 8000
     
     # Avec VS Code extension "Live Server"
     # Clic droit > Open with Live Server
     ```

3. **Tester les fonctionnalités**
   - Changer la période (7j → 30j → 90j → 1 an)
   - Appliquer filtres produit/client
   - Rechercher un client dans la table
   - Trier par CA / nom / plan
   - Cliquer "Refresh" (régénération données)
   - Exporter CSV (vérifier ouverture Excel)

---

## 🗂️ Structure du projet

```
fintech-dashboard-prototype/
├── index.html          # Page principale (HTML5 sémantique)
├── styles.css          # Styles (Glassmorphism, responsive, animations)
├── app.js              # Logique métier (Vanilla JS, IIFE, strict mode)
├── screenshots/        # Captures d'écran du prototype
│   ├── dashboard_main.png
│   └── table_clients.png
└── README.md           # Documentation
```

---

## 🎨 Design System

### Palette de couleurs
- **Background** : `#0a0f1a` → `#0b1220` (gradient dark)
- **Accents** :
  - Primary (Cyan) : `#06b6d4` (MRR, boutons)
  - Secondary (Purple) : `#8b5cf6` (ARR, accents)
  - Success : `#22c55e` (variations positives)
  - Warning : `#f59e0b` (CAC, alertes)
  - Danger : `#ef4444` (Churn, risques)
- **Surfaces** : Glassmorphism `rgba(255,255,255,0.03-0.06)` + backdrop-filter blur

### Typographie
- Font stack : `Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial`
- Poids : 400 (regular), 600 (semibold), 700 (bold), 800 (extrabold), 900 (black)

### Responsive Breakpoints
- `1100px` : KPIs 2 colonnes (au lieu de 4)
- `780px` : KPIs 1 colonne, filtres 1 colonne, chart height réduit

---

## 📊 Données Fictives

- **15 clients générés** : Alpha Corp, Beta SARL, Gamma Inc, Delta Ltd...
- **Plans** : Premium, Business, Enterprise (rotation cyclique)
- **MRR** : Base 1.5M FCFA ± 10% (variation aléatoire)
- **CAC** : MRR / 8 (fictif)
- **Churn** : 2.5-4% (aléatoire)
- **Sparklines** : Fenêtre glissante 20 derniers points
- **CSV Export** : Données de la période sélectionnée + tous les clients

---

## 🛠️ Stack Technique Détaillée

| Composant | Technologie | Version | Usage |
|-----------|-------------|---------|-------|
| **Front-end** | HTML5 | — | Structure sémantique |
| **Styles** | CSS3 | — | Glassmorphism, animations, grid/flexbox |
| **Logic** | Vanilla JavaScript | ES6+ | IIFE, strict mode, événements délégués |
| **Graphiques** | Chart.js | 4.4.0 | Line charts (principal + 4 sparklines) |
| **Animations KPIs** | CountUp.js | 2.8.0 | Transitions numériques fluides |
| **CDN** | jsDelivr + cdnjs | — | Chargement libs (defer) |

---

## ⚡ Performance & Optimisation

- **Lighthouse Score (desktop)** :
  - Performance : 95-100
  - Accessibilité : 100
  - Best Practices : 100
  - SEO : N/A (prototype non-indexable via meta robots)

- **Optimisations appliquées** :
  - Debounce recherche table (200ms)
  - Chart.js instance cleanup (destroy avant re-création)
  - Canvas dimensions forcées (fix rendering)
  - CSS `will-change` sur animations critiques (KPI cards, modals)
  - Scripts `defer` (non-bloquants)
  - IIFE + strict mode (pas de pollution scope global)

---

## 🔒 Sécurité

- **Validation inputs** :
  - Recherche : trim + toLowerCase (sanitization basique)
  - Pas d'inputs utilisateur sensibles (données générées côté client)
- **XSS Prevention** :
  - Fonction `escapeHTML()` sur tout innerHTML (table clients)
  - Pas de `eval()` ou `Function()` constructor
  - CSV : échappement guillemets (RFC 4180)
- **No external API** : Données 100% fictives côté client (pas de backend)

---

## 🧪 Tests Manuels Recommandés

### Checklist Fonctionnelle
- [ ] Changement période (7j → 30j → 90j → 1 an) → Chart + KPIs update
- [ ] Filtre produit (Premium → Business → Enterprise) → MRR augmente
- [ ] Filtre client (Alpha → Beta → Gamma) → Revenus client boost +25%
- [ ] Recherche table (taper "Alpha") → 1 résultat affiché
- [ ] Tri table (CA → Nom → Plan) → Ordre change
- [ ] Bouton Refresh → Animation rotation + nouvelles données
- [ ] Export CSV → Téléchargement + ouverture Excel OK
- [ ] Modal export → Escape ferme + overlay ferme
- [ ] Responsive : tester sur mobile (DevTools, viewport 375px)

### Checklist Accessibilité
- [ ] Navigation clavier (Tab, Shift+Tab)
- [ ] Skip link visible au focus (Tab sur page chargée)
- [ ] Modal : Escape ferme
- [ ] Focus visible sur tous les interactifs
- [ ] Filtres période : `aria-pressed` toggle
- [ ] Screen reader (NVDA/JAWS) : ARIA labels audibles

---

## 📝 Limitations & Améliorations Futures

### Limitations actuelles (prototype)
- Données 100% fictives (pas de backend/base de données)
- Pas de sauvegarde état (pas de localStorage)
- Modal "Détails client" : placeholder (alert)
- Export CSV : pas d'API backend (téléchargement client-side)
- Pas de tests unitaires (Jest/Vitest)

### Roadmap (passage en production)
- [ ] Backend API (Node.js/Express + MongoDB ou PostgreSQL)
- [ ] Authentification utilisateurs (JWT + refresh tokens)
- [ ] Connexion API Stripe/PayPal (revenus réels)
- [ ] Webhooks clients (synchronisation MRR en temps réel)
- [ ] Dashboard personnalisable (drag & drop widgets)
- [ ] Alertes email (seuils CAC/Churn)
- [ ] Export PDF (rapports automatisés)
- [ ] Tests E2E (Playwright/Cypress)
- [ ] CI/CD (GitHub Actions → Vercel/Netlify)

---

## 🎮 Guide d'utilisation

### Filtres

**Période** : Cliquez sur `7j`, `30j`, `90j` ou `1 an` pour changer la fenêtre temporelle.  
**Produit** : Sélectionnez un plan pour simuler son impact sur les revenus (+10% à +35%).  
**Client** : Filtrez par client pour booster ses revenus (+25% dans la génération).

### Recherche & Tri

**Recherche** : Tapez dans le champ "Rechercher..." pour filtrer les clients par nom (live, debounce 200ms).  
**Tri** : Sélectionnez "Trier par CA" (défaut), "par nom" ou "par plan" dans le dropdown.

### Export

1. Cliquez sur "Exporter CSV"
2. Vérifiez le contenu dans la modal
3. Cliquez "Télécharger le CSV"
4. Ouvrez avec Excel/LibreOffice (encodage UTF-8 avec BOM)

### Personnalisation (API)

Pour connecter une vraie API, remplacez dans `app.js` :

```javascript
// Remplacer generateMRRData() par :
async function fetchMRRData(period) {
  const response = await fetch(`/api/mrr?period=${period}`);
  if (!response.ok) throw new Error('API error');
  return response.json();
}

// Remplacer generateClients() par :
async function fetchClients() {
  const response = await fetch('/api/clients');
  if (!response.ok) throw new Error('API error');
  return response.json();
}
```

---

## 👤 Auteur

**Patrick Junior Samba Ntadi**  
Fondateur — [Intello](https://github.com/intello-agence)  
📍 Dakar, Sénégal  

**Contact :**
- GitHub : [@intello-agence](https://github.com/intello-agence)
- Portfolio : [En construction]

---

## 📄 Licence

MIT License — Libre d'utilisation pour démonstration/apprentissage.

**Note :** Ce projet est un **prototype de démonstration** créé pour illustrer les compétences techniques d'Intello. Les données sont fictives et ne doivent pas être utilisées en production.

---

## 🙏 Crédits

- **Graphiques** : [Chart.js](https://www.chartjs.org) — Chart.js contributors
- **Animations** : [CountUp.js](https://inorganik.github.io/countUp.js/) — Jamie Perkins
- **Icônes** : SVG Heroicons (inline)
- **Design inspiration** : Stripe Dashboard, Notion Analytics

---

**✨ Conçu par Intello | © 2025**
