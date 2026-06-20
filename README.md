# Modern Portfolio Website

A production-ready portfolio website built with **Next.js 13+**, **TailwindCSS**, **Framer Motion**, and **TypeScript**.

---

## ✨ Features

- **Modern Tech Stack**: Next.js 13+ with App Router, TypeScript, TailwindCSS
- **Smooth Animations**: Framer Motion for page transitions and micro-interactions
- **Dark/Light Theme**: Built-in theme switching
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards
- **Configuration-Based**: Easy content management through config files
- **Form Handling**: Contact form with validation and API route
- **Type Safe**: Full TypeScript implementation
- **Accessibility**: WCAG compliant with ARIA labels and keyboard navigation
- **🆕 Project Status Monitoring**: Real-time project status tracking with password-protected admin dashboard

---

## 🔐 Project Status System

This portfolio includes a comprehensive project status monitoring system:

- **Visual Status Badges** - Display project status on your portfolio
- **Admin Dashboard** - Password-protected management interface
- **Automatic Monitoring** - Check if project URLs are accessible
- **Manual Updates** - Override automatic checks when needed
- **API Endpoints** - Programmatic access to status data
- **Automation Tools** - CLI scripts and GitHub Actions

**📚 Documentation:** See the [`docs/`](./docs/) folder for complete guides. - Local Only

**Quick Start:**

1. Login: http://localhost:3000/admin/login
2. Password: Check `.env.local` file (default: `admin123`)
3. Read: [`docs/FINAL_SUMMARY.md`](./docs/FINAL_SUMMARY.md)

---

## 📁 Project Structure

```
├── app/
│   ├── admin/
│   │   ├── login/            # Admin login page
│   │   └── project-status/   # Admin dashboard
│   ├── api/
│   │   ├── admin/            # Authentication APIs
│   │   ├── contact/          # Contact form API
│   │   └── projects/status/  # Project status API
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── components/
│   ├── layout/               # Navigation components
│   ├── sections/             # Page sections
│   └── ui/                   # Reusable UI components
├── config/                   # Site and theme configurations
├── docs/- Ignored                     # 📚 Complete documentation
├── lib/
│   ├── auth.ts               # Authentication utilities
│   ├── project-status.ts     # Status utilities
│   └── utils.ts              # Utility functions
└── scripts/                  # Automation scripts
```

---

## 📧 Contact Form Setup

- Client-side validation with React Hook Form and Zod
- API route for handling submissions
- Supports integration with SendGrid, AWS SES, Nodemailer, or Resend

---

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Check project statuses
npm run status:check

# Update project status
npm run status:update PROJECT_ID STATUS [MESSAGE]
```

---

## 🗒 License

**All Rights Reserved © 2025 Ronak Malam**

This repository and its contents, including all code, designs, and assets, are the exclusive property of Ronak Malam.
No part of this repository may be copied, modified, distributed, or used in any form without explicit written permission.

**For inquiries:**
**Email:** [itzronakmalam94@gmail.com](mailto:itzronakmalam94@gmail.com)

**LinkedIn:** [Click to Connect With Me](https://www.linkedin.com/in/ronak-malam/)
