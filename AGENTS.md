## AGENTS.md

### Build, Lint, and Test

- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Dev Server:** `npm run dev`
- **Testing:** No test command found. Use `jest`, `vitest`, or `cypress` if adding tests.

### Code Style and Conventions

- **Formatting:** Follows standard `prettier` and `eslint` rules for Next.js TypeScript projects.
- **Imports:** Use path aliases `@/*` for imports from the project root.
- **Naming:** Use camelCase for variables and functions, and PascalCase for components and types.
- **Types:** Use TypeScript with `strict` mode enabled. Define types for all props, state, and function arguments.
- **Styling:** Use Tailwind CSS with the custom theme defined in `tailwind.config.ts`.
- **Error Handling:** Use `try...catch` blocks for async operations and API calls.
- **Components:** Create components in the `components/` directory.
- **API Routes:** Create API routes in the `app/api/` directory.
- **State Management:** Use React hooks and context for state management.
- **Supabase:** Use the Supabase client from `lib/supabase/client.ts` for client-side Supabase interactions.
