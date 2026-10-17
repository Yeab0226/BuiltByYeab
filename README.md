# BuiltByYeab

My personal portfolio website showcasing my projects, skills, and web development services.

I'm **Yeabsira Alemayehu**, a full-stack web developer based in Addis Ababa, Ethiopia. I enjoy building responsive, practical, and user-friendly web applications.

## Features

- Responsive layouts for desktop, tablet, and mobile
- Interactive project cards with hover and touch support
- About section with skills, experience, and education
- Contact form powered by a Vercel Function and Resend
- Pre-rendered HTML for search engine visibility
- Search descriptions, social-sharing metadata, and structured data
- Automatic sitemap and canonical URL generation when a production URL is configured

## Tech Stack

- React
- Vite
- React Router
- CSS
- Vercel Functions
- Resend Email API

## Getting Started

Use Node.js 22.

```bash
npm ci
npm run dev
```

Open the local address shown in your terminal.

## Available Commands

| Command           | Purpose                              |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm test`        | Run contact endpoint tests           |
| `npm run build`   | Build and pre-render the website     |
| `npm run preview` | Preview the production pages locally |

The local Vite server and static preview do not run Vercel Functions. Test email delivery through a Vercel deployment or Vercel's local development workflow.

## Environment Variables

Configure these in Vercel:

| Variable             | Purpose                                         |
| -------------------- | ----------------------------------------------- |
| `RESEND_API_KEY`     | Private API key for sending emails              |
| `CONTACT_TO_EMAIL`   | Email address that receives contact submissions |
| `CONTACT_FROM_EMAIL` | Sender address authorized by Resend             |
| `SITE_URL`           | Permanent public HTTPS website address          |

Keep credentials out of GitHub and client-side code. Refer to `.env.example` for the expected configuration.

Resend's test sender, `onboarding@resend.dev`, can send only to the email address associated with your Resend account. Verify a domain in Resend to use your own production sender.

## Deployment

The project is configured for Vercel.

1. Import this GitHub repository into Vercel.
2. Select the folder containing `package.json` as the root directory.
3. Use the Vite framework preset.
4. Set the build command to `npm run build` and output directory to `dist`.
5. Add the environment variables.
6. Deploy and test the contact form.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions.

## SEO

The build generates pre-rendered page content, metadata, and structured data. Set `SITE_URL` to generate canonical URLs, social image URLs, and the production sitemap.

The unfinished services page and Vercel preview deployments are marked `noindex`.

## Contact

- **Email:** [Yabsiraalemayehu@gmail.com](mailto:Yabsiraalemayehu@gmail.com)
- **GitHub:** [Yeab0226](https://github.com/Yeab0226)
- **LinkedIn:** [Yeabsira Alemayehu](https://www.linkedin.com/in/yeab-a-340884309)

---

Built by Yeab.
