# Module 2: Claude Code CLI
## The Tool You're Using Right Now

> **Activation Prompt:**
> *"I'm starting Module 2 of my Claude course — Claude Code CLI. Be my Socratic tutor. Start by asking me what I think Claude Code does differently from chatting with Claude on the web."*

---

## The Big Idea

Claude Code isn't just a chatbot. It's an **agent** that can:
- Read and write files on your computer
- Run terminal commands
- Search your codebase
- Make git commits
- Connect to external tools (like Pencil!)

> **Question:** What's the difference between asking Claude a question on
> claude.ai vs. asking it here in Claude Code? Why does the CLI version
> need permission to run commands?

---

### Concept 1: Tools — Claude's Hands

When you chat with Claude on the web, it can only *talk*.
In Claude Code, Claude has **tools** — actions it can take:

| Tool | What It Does | Example |
|------|-------------|---------|
| `Read` | Read a file | Reading your code to understand it |
| `Write` | Create a new file | Creating this course! |
| `Edit` | Modify part of a file | Fixing a bug |
| `Bash` | Run terminal commands | `npm install`, `git status` |
| `Glob` | Find files by pattern | Finding all `.tsx` files |
| `Grep` | Search file contents | Finding where a function is used |
| `Agent` | Launch a sub-agent | Researching something in parallel |
| `WebSearch` | Search the internet | Looking up documentation |

> **Question:** Why do you think Claude asks for your permission before
> running certain tools? What could go wrong if it didn't?

---

### Concept 2: The Permission Model

Claude Code has a safety system:

```
AUTO-ALLOWED          REQUIRES PERMISSION       NEVER ALLOWED
─────────────         ────────────────────      ─────────────
Reading files         Writing/editing files     Deleting your OS
Searching code        Running bash commands     Accessing passwords
Web searches          Installing packages       Pushing to prod
                      Git operations              (without asking)
```

You control this! You can:
- Allow individual actions (press 'y')
- Allow a tool for the whole session
- Configure auto-allow in settings

> **Exercise:** Try running `/help` right now to see available commands.
> What commands are available to you?

---

### Concept 3: Slash Commands

These are shortcuts you can type:

| Command | What It Does |
|---------|-------------|
| `/help` | Show available commands |
| `/clear` | Clear conversation history |
| `/compact` | Compress context to save space |
| `/status` | Show current status |
| `/cost` | Show token usage and cost |
| `/fast` | Toggle fast mode |

> **Exercise:** Run `/cost` right now. How much has this conversation cost so far?

---

### Concept 4: How Claude Code Thinks

When you give Claude Code a task, here's what happens internally:

```
1. You type a request
        |
2. Claude reads it + all context (files, conversation history)
        |
3. Claude decides what tools to use
        |
4. Claude calls tools (read files, search, etc.)
        |
5. Claude gets tool results back
        |
6. Claude reasons about the results
        |
7. Claude responds (and maybe calls more tools)
        |
8. Repeat until task is done
```

This loop is what makes it **agentic** — it doesn't just answer once,
it works through a problem step by step, using tools as needed.

> **Question:** You ask Claude Code to "fix the bug in my login page."
> What tools do you think it would use, and in what order?

---

### Concept 5: Context Management

Your conversation has a limited context window. As it fills up:

- Old messages get **compressed** (summarized)
- You can manually compress with `/compact`
- Starting a new conversation (`/clear`) gives you a fresh context

**Pro tips:**
- Keep tasks focused — one thing at a time
- If Claude seems confused, it might be context overload
- Use `/compact` before starting a new sub-task in a long session

> **Question:** You've been working with Claude Code for 2 hours on
> different tasks. Claude starts giving weird responses. What might be
> happening, and what would you do?

---

## Hands-On Exercises

### Exercise 1: File Operations
Ask Claude Code to:
1. Create a file called `hello.txt` with "Hello from Claude Code!" in it
2. Read the file back to you
3. Edit it to say "Hello from [your name]!"
4. Delete the file

Watch which tools Claude uses for each step.

### Exercise 2: Codebase Exploration
Ask Claude Code:
```
What files are in my Elumai project? Give me an overview of the structure.
```
Notice how it uses `Glob`, `Read`, and possibly `Agent` to explore.

### Exercise 3: The Agent Tool
Ask Claude Code:
```
Research what MCP (Model Context Protocol) is and explain it to me simply.
```
Notice if it launches a sub-agent or uses web search.

---

## Key Takeaways

- [ ] Claude Code is an *agent* — it uses tools, not just text
- [ ] Tools include: Read, Write, Edit, Bash, Glob, Grep, Agent, WebSearch
- [ ] Permission model keeps you in control of what Claude can do
- [ ] Slash commands (`/help`, `/compact`, `/cost`) are your shortcuts
- [ ] Context management matters — compress or clear when things get long

---

*Next up: `03-prompting-and-thinking.md` — Learn how to talk to Claude effectively.*
