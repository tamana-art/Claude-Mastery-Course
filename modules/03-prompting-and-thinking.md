# Module 3: Prompting & Thinking
## How to Talk to Claude Effectively

> **Activation Prompt:**
> *"I'm starting Module 3 — Prompting & Thinking. Be my Socratic tutor. Start by asking me: what's the difference between a good and bad prompt?"*

---

## The Core Insight

Prompting isn't magic. It's **clear communication**.
The same skills that make you a good communicator with humans
make you good at prompting AI.

---

### Concept 1: The Anatomy of a Good Prompt

```
BAD:  "Fix my code"

GOOD: "The login function in auth.js is returning undefined
       when the password is correct. I expect it to return
       a user object. Can you find and fix the bug?"
```

A good prompt has:
1. **Context** — What's the situation?
2. **Specificity** — What exactly do you want?
3. **Constraints** — Any requirements or preferences?
4. **Expected outcome** — What does success look like?

> **Exercise:** Rewrite this bad prompt as a good one:
> *"Make my website look better"*

---

### Concept 2: The Ladder of Abstraction

You can talk to Claude at different levels:

```
MOST ABSTRACT (Claude has most freedom)
  |
  |  "Build me a landing page"
  |  "Build a landing page for a SaaS product about AI tutoring"
  |  "Build a landing page with a hero section, features grid, and CTA"
  |  "Add a hero section with a gradient background, h1, subtitle, and button"
  |
MOST SPECIFIC (Claude has least freedom)
```

Neither end is "better" — it depends on what you need:
- **Abstract** = when you want Claude's creativity
- **Specific** = when you know exactly what you want

> **Question:** For each scenario, would you prompt abstractly or specifically?
> 1. You need a function that sorts an array
> 2. You want a creative logo design
> 3. You need to fix a specific CSS bug
> 4. You want a project architecture suggestion

---

### Concept 3: Thinking Out Loud

Claude works better when you share your reasoning:

```
LESS EFFECTIVE:
"Should I use React or Vue?"

MORE EFFECTIVE:
"I'm building a dashboard for a small team of 3 developers.
We need real-time data updates, and two of us know React.
Performance is important but not critical.
Should I use React or Vue? What are the tradeoffs?"
```

> **Why?** When you share context, Claude can tailor its advice
> to YOUR situation instead of giving generic answers.

---

### Concept 4: The Socratic Flip

Here's a power move: **Ask Claude to ask YOU questions.**

```
"I want to build an app but I'm not sure about the architecture.
Instead of giving me an answer, ask me 5 questions that would
help you give me the best recommendation."
```

This forces Claude to:
1. Identify what information it needs
2. Help YOU think through the problem
3. Give better advice based on your answers

> **Exercise:** Try this right now with a real project idea you have.

---

### Concept 5: Prompt Patterns

Here are battle-tested patterns:

#### The Expert Pattern
```
"Act as a senior software architect. Review this code and
identify potential issues with scalability."
```

#### The Step-by-Step Pattern
```
"Walk me through how to set up a Next.js project step by step.
Explain each step before we do it."
```

#### The Rubber Duck Pattern
```
"I'm going to explain my bug to you. Don't solve it yet —
just ask clarifying questions. Here's what's happening..."
```

#### The Constraint Pattern
```
"Solve this using only vanilla JavaScript. No frameworks.
The solution should be under 50 lines."
```

#### The Teaching Pattern
```
"Explain this concept to me, then give me a small exercise
to test my understanding. Don't show the answer until I try."
```

> **Question:** Which pattern would you use if you wanted to learn
> a new programming concept vs. debug a problem vs. design a system?

---

### Concept 6: Common Mistakes

| Mistake | Why It's Bad | Better Approach |
|---------|-------------|-----------------|
| "Do everything" | Too vague, Claude guesses | Break into specific tasks |
| Wall of text | Key details get lost | Structure with bullets/sections |
| No context | Generic responses | Share your situation |
| Assuming Claude knows your project | It doesn't until it reads files | Point Claude to relevant files |
| Never iterating | First response may not be perfect | "That's close, but change X" |

---

## Hands-On Exercises

### Exercise 1: Prompt Rewriting
Take these bad prompts and rewrite them. Then try both versions with Claude
and compare the responses:

1. "Make a website"
2. "Fix bugs"
3. "Write tests"
4. "Explain code"

### Exercise 2: The 5-Prompt Challenge
Complete this task using only 5 prompts (messages to Claude):
**Goal:** Create a simple Python script that fetches weather data from
an API and displays it nicely in the terminal.

The constraint forces you to be clear and efficient with each prompt.

### Exercise 3: Teaching Mode
Ask Claude to teach you something you don't know, using the Teaching Pattern.
For example:
```
"Teach me what an API is. Start with a question to gauge my level,
then explain, then give me an exercise."
```

---

## Key Takeaways

- [ ] Good prompts have: Context, Specificity, Constraints, Expected Outcome
- [ ] Match your abstraction level to how much freedom Claude should have
- [ ] Share your reasoning — context makes Claude's responses better
- [ ] Use prompt patterns (Expert, Step-by-Step, Rubber Duck, etc.)
- [ ] Iterate — "That's close, but..." is a powerful tool
- [ ] You can ask Claude to ask YOU questions (Socratic flip)

---

*Next: `04-claude-api.md` — Build things WITH Claude, programmatically.*
