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
6. Problem with clearing shadcn Select component. When using custom clear buttom, form data is updated, but UI not. For example, when choosing "No" and then clicking clear button - user still see "No". First solution was just not to try to show placeholder again as no value, but have one more value always, e.g. "null" that will be choosen on clear. This way user could see "Do not specify", "Yes", and "No", when option "Do not specify" was set with custom clear button. Final solution is a little bit hacky, but very simple - give the <Select> component the key prop. In react - when key is updated, component must rerender. This way clearing button works perfectly without additional "Do not specify" option!
- https://www.reddit.com/r/nextjs/comments/1gl2wmv/strange_behavior_with_shadcn_ui_select_component/
- https://github.com/radix-ui/primitives/issues/1569
7. problem with redirecting hell - proper handling of middleware logic and proper order of checks, trying to protect routes for specific cases, problem with complete-profile page
8. We initially tried to limit the user’s ability to select certain dates or exceed the maximum length of form fields. As the application evolved, I realized that—even if it feels less intuitive—we should not make decisions on behalf of the user. We should give them as much freedom as possible, without assuming their preferences. For example, just because we expect them to add a plant they already own (a past date) doesn’t mean the user won’t want to enter a future date (e.g., they might be picking up the plant from a store next week). We should avoid assumptions and limit the user as little as possible. Allowing full flexibility with dates also makes the code and validation logic simpler and more reliable, since we don’t need to handle multiple edge cases or artificially restrict user input. The input fields in the database have also been extended to allow a much larger number of characters. However, they still have reasonable limits to ensure the database remains secure and stable.

Idelogy of clean code:
- how lond should be data fields? https://stackoverflow.com/questions/20958/list-of-standard-lengths-for-database-fields
- uploading images - when choosing files vs on form submit, architecture and consequences. I chosen 2 version.

# Potential Features for an Expanded App Version

## Main Feed
- Show photos from users with public collections.
- Users can see their own collection, plus collections they liked or follow.
- Users can set their collection as **private** or **public**.
- Follow other accounts, comment, and like photos.

## AI agents/ external APIs
- Analyze photos to detect plant health.
- Identify plant species.
- Provide care tips

## Sharing & Export
- Export collection data to CSV or PDF.
- Share collections with friends via link / messenger / whatsapp, etc.

## Achievements & Gamification
- Collect trophies for milestones, e.g: First plant, First 50 plants, Healing a sick plant, etc.

## Timeline & Event Visibility
- Show plant timeline events (e.g., flowering, location changes, health updates) **not only in timeline view but also on plant cards, collection view, and badges**, so users can see important events without opening detailed views.

## Plant Statistics
- Detailed stats in form of graphs and analytics screen summarizing user’s plants, e.g. health status, age, species distribution, etc.

## Expansion of Scope
- Currently focused on house plants, the app could expand to **herbs, garden plants, and other plant types**, catering to different user needs and interests.
- This expansion could introduce **features tailored to specific plant types**, e.g., statistics for garden plants may include seasonal or weather-related data, while house plant stats may focus on indoor conditions.

> **Note:** The features listed here are just a starting point. There can always be more, and everything depends on real user needs. The app may evolve and change over time based on feedback and usage patterns. 

Bigger dependencies changes during working on app:
1. Tailwind 3 -> 4
2. Next.js 14 -> 15
3. React 18 -> 19
