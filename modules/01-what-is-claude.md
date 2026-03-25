# Module 1: What is Claude?
## Foundations — Understanding the AI You're Talking To

> **Activation Prompt:** Paste this to Claude Code to begin:
> *"I'm starting Module 1 of my Claude course. Be my Socratic tutor. Ask me questions, guide my thinking, and don't just give me answers. Start with Question 1."*

---

## The Socratic Journey

### Question 1: What Do You Already Know?
Before we begin — what do you *think* Claude is? What's your mental model?
Don't worry about being wrong. Just describe what you imagine is happening
when you type a message and get a response.

*(Answer this to Claude before moving on.)*

---

### Concept 1: Claude is a Large Language Model (LLM)

Claude is built by **Anthropic**. Here's what that means in plain language:

- Claude was trained on a massive amount of text from the internet, books, code
- It learned *patterns* — how words, ideas, and logic connect
- When you ask it something, it's *predicting* what a helpful response looks like
- It doesn't "know" things the way you do — it generates responses token by token

**Key insight:** Claude doesn't have a database it looks things up in.
It's more like a very sophisticated pattern-completion engine that has
internalized vast amounts of knowledge.

> **Question for you:** If Claude generates text by prediction, why do you
> think it can sometimes be wrong? What does that tell you about how to
> use it effectively?

---

### Concept 2: The Model Family

Claude comes in different sizes and capabilities:

```
Most Capable (Slower, More Expensive)
  |
  |  Claude Opus 4.6    ← You're using this RIGHT NOW
  |  Claude Sonnet 4.6  ← Fast + capable (great default)
  |  Claude Haiku 4.5   ← Fastest, cheapest, simpler tasks
  |
Fastest (Cheaper, Less Capable)
```

> **Question:** When would you choose Haiku over Opus?
> Think of three scenarios for each.

---

### Concept 3: Context Window

Claude can "see" a limited amount of text at once. This is called the
**context window**. Think of it like Claude's working memory.

- The context includes: your message + Claude's response + any files read
- When the context fills up, older messages get compressed
- This is why Claude might "forget" things from earlier in a long conversation

> **Question:** You're working on a project with 50 files. You can't fit them
> all in the context window. What strategies might you use to still get
> Claude's help effectively?

---

### Concept 4: Claude's Personality & Values

Claude isn't just a text predictor. It's been trained to be:

- **Helpful** — It genuinely tries to solve your problem
- **Harmless** — It avoids generating harmful content
- **Honest** — It tells you when it's unsure or doesn't know

This comes from a training process called **RLHF** (Reinforcement Learning
from Human Feedback) and Anthropic's **Constitutional AI** approach.

> **Question:** Why might it matter that an AI is trained to be honest about
> its limitations? How does this change how you interact with it compared
> to, say, a search engine?

---

## Exercise 1: Your First Experiment

Try these right now in Claude Code:

1. Ask Claude a factual question you know the answer to. Was it right?
2. Ask Claude something obscure it might not know. Does it say "I'm not sure"?
3. Ask Claude to do something creative (write a haiku about your project).
4. Ask Claude to explain something technical at different levels:
   - "Explain APIs like I'm 5"
   - "Explain APIs like I'm a developer"

**Reflection:** What surprised you about the responses?

---

## Exercise 2: Token Thinking

Claude processes text as **tokens** (roughly word-parts).

Try this in Claude Code:
```
How many tokens is this sentence approximately?
```

Then try:
```
Count the letter 'r' in the word "strawberry"
```

> **Reflection question:** Why might Claude struggle with the second task?
> What does that tell you about how it "sees" text?

---

## Key Takeaways

- [ ] Claude is an LLM — it predicts helpful responses based on patterns
- [ ] Different model sizes exist for different needs (Opus > Sonnet > Haiku)
- [ ] Context window = Claude's working memory (limited)
- [ ] Claude is trained to be helpful, harmless, and honest
- [ ] Understanding *how* Claude works helps you use it better

---

*When you feel solid on these concepts, move to `02-claude-code-cli.md`*
*Remember: you can always ask Claude to quiz you on this module!*
