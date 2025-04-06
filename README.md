## About

BloomSnap is a diploma thesis web application for creating a wall and sharing your collection of houseplants with others.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Technologies links:
1. NextAuth vs Supabase: https://www.restack.io/docs/supabase-knowledge-supabase-auth-vs-nextauth


Issues:
1. change use of bcrypt to bcryptjs -> https://github.com/kelektiv/node.bcrypt.js/issues/979
2. prisma with edge environment (fix: installation neon adapter) -> https://github.com/prisma/prisma/issues/20560
3. shadcn components not always support newest versions of libraries they use: https://github.com/shadcn-ui/ui/issues/4366 https://date-picker.luca-felix.com/
4. design: when user is asking for "yes" or "no", but he has option to not answer at all, what is the best design (select vs radio discussion)
5. database: difference between null and "" in the database.  

Bigger dependencies changes during working on app:
1. Tailwind 3 -> 4
2. Next.js 14 -> 15
3. React 18 -> 19
