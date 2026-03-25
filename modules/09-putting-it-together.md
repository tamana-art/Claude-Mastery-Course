# Module 9: Putting It All Together
## Build a Real Project End-to-End

> **Activation Prompt:**
> *"I'm starting Module 9 — the final project. Be my Socratic tutor and project mentor. Guide me through building a complete project from scratch, asking me questions at each stage to make sure I understand what we're doing and why."*

---

## The Mission

You're going to build a **complete project** that uses everything
you've learned across all 8 modules:

- **Claude** as your AI partner (Module 1)
- **Claude Code** as your workspace (Module 2)
- **Effective prompting** to communicate clearly (Module 3)
- **The API** to understand what's happening under the hood (Module 4)
- **MCP & Tools** connecting everything together (Module 5)
- **Pencil** to design your UI (Module 6-7)
- **Variant** for theming and consistency (Module 8)

---

## Choose Your Project

Pick one (or propose your own):

### Option A: Personal Portfolio
Design and build a portfolio website that showcases your work.
- Landing page with hero section
- Project showcase grid
- About section
- Contact form
- Light/dark theme

### Option B: SaaS Landing Page
Design a landing page for a fictional SaaS product.
- Hero with value proposition
- Feature highlights (3-4 cards)
- Pricing table
- Testimonials
- CTA sections
- Brand theming

### Option C: Mobile App Design
Design screens for a mobile app.
- Onboarding flow (3 screens)
- Home/dashboard screen
- Detail view
- Settings with theme toggle
- Consistent component library

### Option D: Your Own Idea
Have something specific? Go for it!

> **Question:** Which project interests you most, and why?
> What skills do you want to practice the most?

---

## Phase 1: Planning (Modules 1-3)

Before touching any tools, THINK.

### Step 1: Define the Problem
Write down:
- **What** are you building?
- **Who** is it for?
- **What** should it accomplish?
- **What** are the key pages/screens?

### Step 2: Prompt Strategy
Plan your approach:
- What will you ask Claude to do first?
- What level of abstraction will you use?
- What constraints do you have?

### Step 3: Share with Claude
```
I'm building [your project]. Here's my plan:
[Your plan]

Before we start, ask me any clarifying questions
that would help you help me better.
```

> **Reflection:** Did Claude's questions reveal anything you hadn't
> thought of? This is the Socratic method in action!

---

## Phase 2: Design System (Modules 6-8)

### Step 4: Set Up Variables
Define your design tokens:
```
Help me set up design variables for my project:
- Color palette (with light/dark theme)
- Typography scale
- Spacing scale
- Border radius values
```

### Step 5: Create Components
Build your reusable pieces:
```
Create reusable components for my project:
- Button (primary, secondary variants)
- Card
- Navigation bar
- Footer
- [Any project-specific components]
```

### Step 6: Verify Components
```
Show me screenshots of each component.
Do they look consistent? Any issues?
```

> **Checkpoint:** Before moving on, make sure your components
> look good individually. It's easier to fix them now than after
> you've used them in full screens.

---

## Phase 3: Build Screens (Modules 5-7)

### Step 7: Create Your Main Screen
```
Using the components we created, design the [main page/screen].
Follow the layout guidelines for [landing-page/web-app/mobile-app].
```

### Step 8: Review and Iterate
```
Show me a screenshot of the full page.
What looks good? What needs improvement?
```

Ask yourself:
- Is the hierarchy clear? (What do you see first?)
- Is the spacing consistent?
- Is the text readable?
- Does it feel cohesive?

### Step 9: Build Additional Screens
Repeat for each additional screen/page.

> **Exercise:** After each screen, write one thing that went well
> and one thing you'd do differently. This is your learning journal.

---

## Phase 4: Theme and Polish (Module 8)

### Step 10: Apply Themes
```
Switch my design to dark mode. Show me screenshots of all screens.
Are there any contrast issues or elements that don't work in dark mode?
```

### Step 11: Consistency Audit
```
Search all unique colors, font sizes, and spacings used in my design.
Are there any that should be consolidated? Help me clean it up.
```

### Step 12: Final Polish
```
Review the entire design. Check for:
- Alignment issues
- Inconsistent spacing
- Typography hierarchy
- Color contrast
- Missing states (hover, empty, error)
Give me specific improvements to make.
```

---

## Phase 5: Reflect and Document

### Step 13: What You Built
Ask Claude:
```
Summarize what we built together. List all the screens,
components, and design decisions we made.
```

### Step 14: What You Learned
Write in your `notes/` folder:
- What was the hardest part?
- What clicked for you during this project?
- What would you do differently next time?
- What do you want to learn next?

### Step 15: Your Cheat Sheet
```
Based on everything we've done, create a one-page cheat sheet
of the most important commands, concepts, and tips for working
with Claude Code and Pencil.
```

---

## Bonus Challenges

### Challenge 1: Code Generation
```
Generate the HTML/CSS/Tailwind code from my .pen design.
```
(Uses `get_guidelines("code")` and `get_guidelines("tailwind")`)

### Challenge 2: Responsive Design
```
Create mobile and desktop versions of my landing page.
Show them side by side.
```

### Challenge 3: Presentation
```
Create presentation slides about my project using Pencil.
Include: problem, solution, design showcase, and key learnings.
```

### Challenge 4: Teach Someone Else
The best way to learn is to teach. Explain what you've built
and how it works to a friend, or write a blog post about it.

---

## Graduation Checklist

- [ ] Completed all 9 modules
- [ ] Built a real project from scratch
- [ ] Used variables and themes
- [ ] Created reusable components
- [ ] Iterated based on visual review
- [ ] Documented your learning
- [ ] Created a personal cheat sheet

---

## What's Next?

Your journey doesn't end here. You now have the foundation to:

1. **Build more complex designs** — dashboards, multi-page apps
2. **Learn the Claude API deeper** — tool use, streaming, agents
3. **Create your own MCP servers** — connect Claude to new tools
4. **Master Pencil** — animation, advanced layouts, prototyping
5. **Build with code** — generate production code from your designs

The most important thing: **keep building**.
Every project teaches you something new.

---

*Congratulations. You started as a beginner.
Now you understand the ecosystem.
The rest is practice, curiosity, and building things that matter to you.*
