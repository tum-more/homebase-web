This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Installation
1. Clone the repository
2. Install dependencies

# Follow commands
```bash
# Clone the repository
git clone ...
# Navigate to the project directory
cd projectname
# Install dependencies using pnpm
pnpm install
# Start the project
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Dizzle
How to create database migration
1. create new schema file in /src/lib/db/schema/
2. run commands
```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate 
```

## Learn More
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [drizzle-orm](https://orm.drizzle.team/docs/get-started-mysql) - Database ORM
- [drizzle-kit](https://orm.drizzle.team/kit-docs/overview) - CLI companion for automatic SQL migrations generation and rapid prototyping.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
