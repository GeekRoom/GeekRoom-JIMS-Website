# 👥 Department Heads Card Component Snippet - Geek Room JIMS

This document provides a ready-to-use, copy-paste **Department Heads / Core Team** card grid component. It matches the glassmorphic aesthetic, halftone theme, and neon orange/blue accents of the Geek Room JIMS website.

---

## 🎨 Preview of Card Features

- **Glassmorphic Surface**: Frosted dark glass with specular top highlight.
- **Glowing Avatar Ring**: Glowing neon border (Orange for Leads, Cyan for Tech/Design).
- **Role Badges**: Department tag (`Technical`, `Events`, `Design`, `PR & Sponsorship`).
- **Social Links**: Quick access to LinkedIn, GitHub, and Twitter handles.
- **3D Hover Transformation**: Smooth lift and neon glow on hover.

---

## 💻 1. Copy-Paste HTML Snippet

Paste this HTML section into `index.html` wherever you want to showcase Department Heads (e.g. after the Achievements or Why Join section):

```html
<!-- DEPARTMENT HEADS SECTION -->
<section id="team" class="section-padding">
  <div class="container">
    <div class="section-header">
      <div class="section-badge"><i class="fa-solid fa-users-gear"></i> LEADERSHIP TEAM</div>
      <h2 class="section-title">MEET OUR <span class="text-gradient-orange">DEPARTMENT HEADS</span></h2>
      <p class="section-description">The minds behind Geek Room JIMS driving innovation, events, and community growth.</p>
    </div>

    <div class="team-grid">
      
      <!-- Head Card 1: Society President / Lead -->
      <div class="glass-card team-card">
        <div class="team-avatar-wrapper">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80" alt="Arnav Sharma" class="team-avatar">
          <span class="team-lead-badge"><i class="fa-solid fa-crown"></i> President</span>
        </div>
        <div class="team-info">
          <h3 class="team-name">Arnav Sharma</h3>
          <span class="team-role-tag role-orange">Overall Lead</span>
          <p class="team-bio">BCA 3rd Year • Steering society operations, hackathons & external partnerships.</p>
          <div class="team-socials">
            <a href="https://linkedin.com" target="_blank" class="team-social-icon"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="https://github.com" target="_blank" class="team-social-icon"><i class="fa-brands fa-github"></i></a>
            <a href="mailto:arnav@jimsindia.org" class="team-social-icon"><i class="fa-solid fa-envelope"></i></a>
          </div>
        </div>
      </div>

      <!-- Head Card 2: Tech Head -->
      <div class="glass-card team-card">
        <div class="team-avatar-wrapper avatar-cyan">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80" alt="Rohan Verma" class="team-avatar">
          <span class="team-lead-badge badge-blue"><i class="fa-solid fa-code"></i> Tech Lead</span>
        </div>
        <div class="team-info">
          <h3 class="team-name">Rohan Verma</h3>
          <span class="team-role-tag role-blue">Technical Department</span>
          <p class="team-bio">MCA 2nd Year • Fullstack & Cloud Developer. Leads code reviews & bootcamps.</p>
          <div class="team-socials">
            <a href="https://linkedin.com" target="_blank" class="team-social-icon"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="https://github.com" target="_blank" class="team-social-icon"><i class="fa-brands fa-github"></i></a>
            <a href="mailto:rohan@jimsindia.org" class="team-social-icon"><i class="fa-solid fa-envelope"></i></a>
          </div>
        </div>
      </div>

      <!-- Head Card 3: Events Head -->
      <div class="glass-card team-card">
        <div class="team-avatar-wrapper">
          <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80" alt="Ananya Gupta" class="team-avatar">
          <span class="team-lead-badge"><i class="fa-solid fa-calendar-star"></i> Events Lead</span>
        </div>
        <div class="team-info">
          <h3 class="team-name">Ananya Gupta</h3>
          <span class="team-role-tag role-orange">Events & Operations</span>
          <p class="team-bio">BCA 3rd Year • Orchestrates flagship hackathons, venue logistics & schedules.</p>
          <div class="team-socials">
            <a href="https://linkedin.com" target="_blank" class="team-social-icon"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="https://github.com" target="_blank" class="team-social-icon"><i class="fa-brands fa-github"></i></a>
            <a href="mailto:ananya@jimsindia.org" class="team-social-icon"><i class="fa-solid fa-envelope"></i></a>
          </div>
        </div>
      </div>

      <!-- Head Card 4: Design & Media Head -->
      <div class="glass-card team-card">
        <div class="team-avatar-wrapper avatar-cyan">
          <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80" alt="Kabir Malhotra" class="team-avatar">
          <span class="team-lead-badge badge-blue"><i class="fa-solid fa-wand-magic-sparkles"></i> Design Lead</span>
        </div>
        <div class="team-info">
          <h3 class="team-name">Kabir Malhotra</h3>
          <span class="team-role-tag role-blue">Design & Creative</span>
          <p class="team-bio">BCA 2nd Year • UI/UX designer & 3D artist. Manages brand aesthetics & assets.</p>
          <div class="team-socials">
            <a href="https://linkedin.com" target="_blank" class="team-social-icon"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="https://github.com" target="_blank" class="team-social-icon"><i class="fa-brands fa-github"></i></a>
            <a href="mailto:kabir@jimsindia.org" class="team-social-icon"><i class="fa-solid fa-envelope"></i></a>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
```

---

## 🎨 2. Copy-Paste CSS Snippet

Paste these CSS styles into your `styles.css` file:

```css
/* ==========================================================================
   DEPARTMENT HEADS CARD COMPONENT STYLES
   ========================================================================== */

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px;
}

.team-card {
  padding: 30px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.team-avatar-wrapper {
  position: relative;
  width: 110px;
  height: 110px;
  margin-bottom: 20px;
}

.team-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--orange-primary);
  box-shadow: 0 0 20px rgba(255, 107, 0, 0.3);
  transition: transform 0.35s ease;
}

.avatar-cyan .team-avatar {
  border-color: var(--blue-cyan);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
}

.team-card:hover .team-avatar {
  transform: scale(1.06);
}

/* Crown / Lead Badge overlay */
.team-lead-badge {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  padding: 3px 12px;
  background: var(--orange-primary);
  color: #ffffff;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  border-radius: var(--radius-pill);
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(255, 107, 0, 0.4);
}

.badge-blue {
  background: var(--blue-primary);
  box-shadow: 0 4px 12px rgba(0, 102, 255, 0.4);
}

.team-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.team-name {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.team-role-tag {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  margin-bottom: 12px;
  text-transform: uppercase;
}

.role-orange {
  background: rgba(255, 107, 0, 0.12);
  color: var(--orange-primary);
  border: 1px solid var(--orange-border);
}

.role-blue {
  background: rgba(0, 102, 255, 0.12);
  color: var(--blue-cyan);
  border: 1px solid var(--blue-border);
}

.team-bio {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 20px;
}

.team-socials {
  display: flex;
  gap: 12px;
}

.team-social-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.team-social-icon:hover {
  background: var(--orange-primary);
  border-color: var(--orange-primary);
  color: #ffffff;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px var(--orange-glow);
}
```
