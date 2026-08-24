# 🚀 Geek Room JIMS - Frontend Repository

Welcome to the official web application for **Geek Room JIMS**. This repository contains the interactive React + Vite web application structured into modular domain-based folders (`home`, `events`, `achievements`, `about`, `contact`, `shared`).

---

## 🏗️ Repository Architecture & Directory Structure

```
Geekroom_rest/
├── docs/                      # Component Guides & Documentation
│   └── CARDS.md               # Department Heads card component snippet guide
├── src/                       # React + Vite Frontend Application
│   ├── assets/                # Event graphics, banners & branding assets
│   ├── components/            # Sub-components grouped by domain
│   │   ├── about/             # Hero, Purpose, Presidents, DepartmentHeads, Contributors, Gallery, Faq
│   │   ├── achievements/      # Hero, Achievement, Timeline, Card, Fame, Gallery
│   │   ├── contact/           # Contact form components
│   │   ├── events/            # Hero, EventCard, EventsSection
│   │   ├── home/              # Hero, WhyJoin, Partners, ContactModal, Background
│   │   └── shared/            # Navbar, Footer, Header, Logo, InteractiveBackground
│   ├── data/                  # Static & mock datasets (events.js, mockData.js, highlightsData.js)
│   ├── pages/                 # Full Page Views
│   │   ├── about/AboutPage.jsx
│   │   ├── achievements/AchievementsPage.jsx
│   │   ├── contact/ContactPage.jsx
│   │   ├── events/EventsPage.jsx
│   │   ├── gallery/GalleryPage.jsx
│   │   ├── highlights/HighlightsPage.jsx
│   │   ├── home/HomePage.jsx
│   │   ├── team/TeamPage.jsx
│   │   └── index.js
│   ├── routes/
│   │   └── routesConfig.js    # Route configuration registry
│   ├── styles/                # Stylesheets grouped by domain
│   │   ├── about.css
│   │   ├── achievements.css
│   │   ├── contact.css
│   │   ├── events.css
│   │   ├── gallery.css
│   │   ├── highlights.css
│   │   ├── home.css
│   │   └── team.css
│   ├── App.jsx                # Router & central canvas container
│   ├── index.css              # Custom styling & design system
│   └── main.jsx               # Vite React entry point
├── PAGES_MAP.md               # Page dependency map & route reference
├── package.json               # Root Vite frontend dependencies & scripts
├── tailwind.config.js
└── vite.config.js
```

---

## ⚡ Getting Started

### Running the Application

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 🌐 Routes Overview

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` or `/home` | **Home** | Primary landing page showcasing Hero, Why Join, and Partners |
| `/about` | **About Us** | Society mission, presidency grid, department heads slider, and FAQs |
| `/events` | **Events** | Upcoming and past events terminal directory |
| `/achievements-page` | **Achievements** | Society achievements, timeline, fame wall, and awards |
| `/team` | **Team** | Dedicated core team member showcase |
| `/gallery` | **Gallery** | Community gallery with filter pills for hackathons, workshops, and meetups |
| `/highlights` | **Highlights** | Photo achievements gallery with 3D coverflow lightbox |
| `/contact` | **Contact** | Contact details, office hours, and message submission |

---

## 🛠️ Stack & Technologies

- **Core**: React 19, Vite, React Router 7
- **Styling**: Tailwind CSS, Custom CSS Glassmorphism system (Dark Theme & Neon accents)
- **Icons & Motion**: Lucide React, React Icons, FontAwesome
