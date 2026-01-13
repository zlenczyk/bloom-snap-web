# Bloom Snap 🌸

Bloom Snap is a modern full-stack web application built with **Next.js 15**, **React 19**, **Prisma**, and **Tailwind CSS**.  

This is a **private project** and requires environment variables provided by the project owner in order to run.

---

## Tech Stack

- **Language:** TypeScript
- **Framework:** Next.js 15 (App Router)
- **Frontend:** React 19, Tailwind CSS, shadcn/ui, Lucide React Icons
- **Authentication:** Auth.js
- **Database:** PostgreSQL (Neon) with Prisma ORM
- **Forms & Validation:** React Hook Form + Zod

---

## Node.js Requirements

This project requires the stable version of **Node.js 22**.

```bash
node >= 22.22
```

You can check your Node version with:

```bash
node -v
```

If needed, use a version manager like nvm:

```bash
nvm install 22.22
nvm use 22.22
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/zlenczyk/bloom-snap-web
```

### 2. Install Dependencies
```
npm install
```

### 3. Environment Variables

This project requires two environment files: `.env` and `.env.local`.
They are used for different purposes and both are required for the project to build correctly.

1. Copy **all environment variable keys** from the provided `.env.example` file.

2. Create a file named `.env` in the root of the project. (required for Prisma / database)
Add the database-related variables and request the actual values from the project owner. Those are:

```bash
DATABASE_URL=
DIRECT_URL=
```

3. Create a new file named `.env.local` in the root of the project (required for Next.js runtime)

Add rest of the variables into new file and contact the project owner to obtain the actual values. The structure should be:

```env
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_SECRET=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

⚠️ Do not commit `.env` files to version control.

### 4. Set Up the Database (Prisma)

Before running the app for the first time, Prisma and the database must be prepared.

1. Generate the Prisma Client

The Prisma Client is the TypeScript/JavaScript interface this app uses to communicate with the database. Generating it does not modify the database itself.

```bash
npm run generate
# or
npx prisma generate
```

2. Run Database Migrations

Normally, migrations apply pending changes to the database and ensure its schema matches what is defined in prisma/schema.prisma. Running migrations also updates the Prisma Client automatically.

If the database is empty (first run), Prisma will apply the existing migrations from the `prisma/migrations/` folder. It will not create a new migration unless you make changes to the schema yourself.

```bash
npm run migrate
# or
npx prisma migrate dev
```

### ⚠️ During Development

When you modify `prisma/schema.prisma`, choose your next step based on whether the change affects the database structure or only the Prisma Client.

#### a) Run a migration (changes affect the database). Examples:
- Adding, removing, or renaming a model
- Adding, removing, or changing a field type
- Updating relations between models

```bash
npm run migrate
```

It will ask for migration name - contact author to check for convention in naming.

#### b) Regenerate the client (changes affect only the client). Examples:

- Updating @@map or @map for database naming
- Changing enum names without changing database values
- Adding @default values that don’t require database migration

```bash
npm run generate
```

This updates the Prisma Client types so your code can use the changes without modifying the database.

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at:

http://localhost:3000