# Momen Esam — Portfolio

Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔮 Glass Crack Intro | Click 3x to shatter the screen open |
| 🖱️ Custom Cursor | Black circle cursor with orange hover state |
| 📜 Scroll Animations | Every section fades/slides in on scroll |
| 🔢 Number Counters | Stats animate when they enter the viewport |
| 🃏 Project Cards | Hover lift + image overlay |
| 📱 Fully Responsive | Mobile-first design |
| 🌗 Smooth Nav | Glass navbar on scroll |

---

## 📁 Structure

```
portfolio/
├── app/
│   ├── globals.css          ← All custom CSS, cursor, animations
│   ├── layout.tsx
│   └── page.tsx             ← Assembles all sections
├── components/
│   ├── animations/
│   │   └── CrackIntro.tsx   ← Glass shattering intro
│   ├── ui/
│   │   └── CustomCursor.tsx ← Custom mouse cursor
│   └── sections/
│       ├── Navbar.tsx
│       ├── HeroSection.tsx
│       ├── SkillsSection.tsx
│       ├── NumbersSection.tsx
│       ├── ProjectsSection.tsx
│       ├── AboutSection.tsx
│       ├── ContactSection.tsx
│       └── Footer.tsx
└── hooks/
    └── useScrollReveal.ts   ← Intersection Observer hook
```

---

## 🛠️ Customization

### Your Photo
Replace the `src` in `HeroSection.tsx` and `AboutSection.tsx`:
```tsx
<img src="/your-photo.jpg" alt="Momen Esam" ... />
```
Put your photo in `public/` folder.

### Your WhatsApp
Search for `wa.me/201000000000` and replace with your real number.

### Your Projects
Edit the `PROJECTS` array in `components/sections/ProjectsSection.tsx`.

### Your Email
Search `momen@email.com` and replace everywhere.

### Contact Form
The form currently simulates sending. Wire it up to:
- **EmailJS** (free, client-side): [emailjs.com](https://emailjs.com)
- **Formspree** (free): [formspree.io](https://formspree.io)
- **Your own API route**: `app/api/contact/route.ts`

---

## 🎨 Colors (from your Figma)

```css
--primary: #f6724e    /* Orange — main brand color */
--dark:    #1e1e1e    /* Near black */
--muted:   #8a7d7d    /* Gray text */
```

To change the accent color, update `primary` in `tailwind.config.js` and `globals.css`.

---

## 📦 Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or push to GitHub and connect at [vercel.com](https://vercel.com).
