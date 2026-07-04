# Portfolio Website

React + Vite single-page portfolio site. No backend, no TypeScript, no test framework.

## Commands

- `npm run dev` — dev server at localhost:5173
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint check (no fix flag, use `eslint . --fix` if needed)
- `npm run preview` — serve production build locally

Always run `npm run build` after edits to verify no compile errors. There are no tests or typecheck.

## Structure

- `src/App.jsx` — all page sections (hero, skills, projects, contact) and particle canvas
- `src/App.css` — component styles
- `src/index.css` — CSS variables, reset, animations
- `src/main.jsx` — React root mount
- `public/favicon.svg` — site icon
- `dist/` — build output (gitignored)

## Conventions

- CSS variables for colors defined in `src/index.css` `:root` (`--accent`, `--bg`, etc.)
- No component files or folder structure — everything lives in `App.jsx`
- Section IDs: `hero`, `skills`, `projects`, `contact`
- Active nav tracking uses scroll-position visibility ratio (not IntersectionObserver)
- Particle canvas (`z-index: 9999`, `pointer-events: none`) renders above all content
- All particle config constants are in `src/App.jsx` inside the canvas `useEffect`

## Project Rules

### Emoji Policy

**NEVER use emojis in code unless they are part of a UI/UX design (e.g., mood scale indicators like 😢😟😐🙂😄 that represent user-selectable emotional states).**

Rules:
- All UI icons must use `lucide-react` components
- Never use emoji characters for: navigation, buttons, badges, labels, empty states, search icons, close buttons, status indicators, or any other UI element
- The only exception is semantic content where emojis are meaningful data
- Always import icons from `lucide-react` and render them as JSX components with appropriate `size` props

### Communication Rules

**NEVER make assumptions about user intent, requirements, or preferences.**

Rules:
- Always ask clarifying questions when requirements are ambiguous or incomplete
- Do not assume implementation details, design choices, or technical approaches without confirmation
- When in doubt, ask for clarification rather than making educated guesses
- Seek explicit confirmation before making significant changes or decisions
- Clearly state what information is missing and what assumptions would need to be made

### Em-Dash Policy

**NEVER use em-dashes (—) in code, UI text, or comments.**

Rules:
- Replace em-dashes with: commas, colons, hyphens, or restructure the sentence
- For "no data" fallback values, use "N/A" instead of "—"

### Task Management

**Break down large tasks into smaller, manageable steps and wait for confirmation before proceeding.**

Rules:
- When given a large list of tasks, break them into smaller, discrete steps
- Complete one step at a time before moving to the next
- Wait for explicit user confirmation before moving to the next task
- Provide a clear summary of what was completed and what will be done next

### Design Principles

**Build responsive, well-designed websites that follow professional design standards.**

Rules:
- Always follow a responsive-first approach
- Apply proper design principles: visual hierarchy, consistency, alignment, contrast, whitespace, typography
- Avoid typical generic AI-generated styling (centered everything, oversized padding, rounded everything, generic gradients)
- Use Sans Serif fonts (Inter, Roboto, Open Sans, Lato) for formal web app design
- Always follow the design theme specified by the user; if not specified, ask for it
- Always ask for color palette with complementing colours if not specified by the user

### Development Standards

**Follow industry best practices for quality, efficiency, and maintainability.**

Rules:
- Build using industry standards and established patterns
- Ensure modular code design with clear separation of concerns
- Follow DRY, SOLID, and KISS principles
- Use meaningful naming conventions for variables, functions, and components
