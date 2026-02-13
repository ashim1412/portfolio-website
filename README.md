# Ashim Shrestha — Portfolio Website

Personal portfolio showcasing data analytics projects and professional experience. Built with Next.js 14, TypeScript, Tailwind CSS, and real-time GitHub API integration.

🌐 **Live Site:** [ashim-shrestha.com](https://ashim-shrestha.com)

---

## Features

- **Hero Section** — Animated starry background with theme-aware gradient (dark/light mode)
- **About** — Bio with profile photo and dynamic years-of-experience calculation
- **Skills & Expertise** — Categorised pill badges across 8 skill groups (4×2 grid)
- **Projects** — Live GitHub repos via API with README viewer and project image support
- **Resume Page** — Full CV with download PDF, custom navbar layout
- **Contact** — Email copy, social links, and working contact form via formsubmit.co
- **Dark / Light Mode** — Full site theme toggle using next-themes
- **Dynamic Experience** — Years of experience auto-updates from `lib/experience.ts`
- **Google Analytics** — GA4 integration (G-2EF9K5C005)
- **Responsive** — Mobile-first design across all screen sizes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Theming | next-themes |
| Icons | Lucide React |
| Data | GitHub REST API |
| Contact Form | formsubmit.co |
| Fonts | Inter + JetBrains Mono (Google Fonts) |

---

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
app/
  (main)/          # Homepage layout with Navbar + Footer
  resume/          # Resume page with custom navbar layout
  globals.css      # CSS variables + Tailwind base styles
components/
  Hero.tsx         # Animated hero with starfield
  About.tsx        # Bio section
  Skills.tsx       # Skills & expertise grid
  Projects.tsx     # GitHub repos with modal
  Contact.tsx      # Contact cards + form
  navbar.tsx       # Main navigation
  footer.tsx       # Site footer
lib/
  github.ts        # GitHub API fetch helpers
  experience.ts    # Dynamic years-of-experience utility
public/
  Ashim-Shrestha.pdf   # Downloadable resume
  logo-dark.png        # Logo for dark theme
  logo-light.png       # Logo for light theme
```

---

## Contact

- **Email:** hello@ashim-shrestha.com
- **LinkedIn:** [linkedin.com/in/ashim-shrestha](https://linkedin.com/in/ashim-shrestha)
- **GitHub:** [github.com/ashim1412](https://github.com/ashim1412)
