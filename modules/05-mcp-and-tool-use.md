# Module 5: MCP & Tool Use
## How Claude Connects to the World

> **Activation Prompt:**
> *"I'm starting Module 5 — MCP & Tool Use. Be my Socratic tutor. Start by asking me: if Claude can only generate text, how do you think it reads files, runs code, and creates designs?"*

---

## The Big Idea

Claude, on its own, can only generate text. That's it.
But with **tools**, Claude can interact with the real world.
**MCP** is the standard protocol that makes this possible.

---

### Concept 1: What is Tool Use?

Imagine Claude is a brain in a jar. Very smart, but no hands.

**Tools give Claude hands.**

```
Without Tools:              With Tools:
┌──────────┐                ┌──────────┐
│  Claude   │               │  Claude   │
│  (brain)  │               │  (brain)  │
│           │               │  + hands  │
│  Can only │               │           │
│  talk     │               │  Can:     │
│           │               │  - Read   │
└──────────┘               │  - Write  │
                            │  - Search │
                            │  - Run    │
                            │  - Design │
                            └──────────┘
```

When you ask Claude Code to "read this file," here's what actually happens:

1. Claude decides it needs to read a file (reasoning)
2. Claude generates a **tool call**: `Read(file_path="/path/to/file")`
3. The system executes the tool and returns the file contents
4. Claude reads the contents and continues reasoning

> **Question:** Why is it important that Claude *decides* which tools to use,
> rather than the user specifying which tool to use each time?

---

### Concept 2: What is MCP?

**MCP = Model Context Protocol**

It's a standard way to connect AI models to external tools and data.

Think of it like USB for AI:
- USB is a standard that lets any device connect to any computer
- MCP is a standard that lets any tool connect to any AI model

```
┌────────────┐     MCP      ┌──────────────┐
│   Claude    │◄────────────►│  Pencil      │
│   Code      │              │  (Design)    │
│             │     MCP      ├──────────────┤
│             │◄────────────►│  GitHub      │
│             │              │  (Code)      │
│             │     MCP      ├──────────────┤
│             │◄────────────►│  Database    │
│             │              │  (Data)      │
└────────────┘              └──────────────┘
```

> **Question:** Why is having a *standard* protocol important?
> What would happen if every tool had its own custom way of connecting?

---

### Concept 3: How Tool Calls Work (Under the Hood)

Here's the actual flow:

```
Step 1: User says "Read my README.md"
            |
Step 2: Claude thinks: "I need to use the Read tool"
            |
Step 3: Claude outputs (internally):
        {
          "tool": "Read",
          "parameters": {
            "file_path": "/Users/you/project/README.md"
          }
        }
            |
Step 4: System executes the Read tool
            |
Step 5: Tool returns the file contents to Claude
            |
Step 6: Claude reads the contents and responds to you
```

The user usually just sees steps 1 and 6. The magic happens in between.

> **Exercise:** Ask Claude Code to read a file, and pay attention to the
> tool call that appears. Can you identify the tool name and parameters?

---

### Concept 4: MCP Servers

An MCP Server is a program that provides tools to Claude.

**You already have MCP servers connected right now:**

| MCP Server | What It Provides |
|------------|-----------------|
| **Pencil** | Design tools (.pen file editing, screenshots, layouts) |
| **Hugging Face** | AI models, datasets, papers, Spaces |
| **IDE** | VS Code integration (diagnostics, code execution) |

Each server provides its own set of tools. When Claude needs to design
something, it calls Pencil's tools. When it needs to find an AI model,
it calls Hugging Face's tools.

> **Question:** You want to add a new capability to Claude Code —
> let's say, the ability to send Slack messages. How would you do it?
> (Hint: MCP server...)

---

### Concept 5: Tool Use in the API

If you're building your own app, you can give Claude tools too:

```python
import anthropic

client = anthropic.Anthropic()

# Define a tool
tools = [
    {
        "name": "get_weather",
        "description": "Get current weather for a city",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "City name"}
            },
            "required": ["city"]
        }
    }
]

# Claude will call this tool when appropriate
message = client.messages.create(
    model="claude-sonnet-4-6-20250514",
    max_tokens=1024,
    tools=tools,
    messages=[
        {"role": "user", "content": "What's the weather in Tokyo?"}
    ]
)
```

Claude will respond with a tool call, and you execute it and send
the result back.

> **Question:** In the example above, does Claude actually check the weather?
> Or does it just *ask* to check the weather? Who actually does the checking?

---

### Concept 6: The Agentic Loop

When Claude has tools, it can work in a loop:

```
      ┌─────────────────────────────────────┐
      │                                     │
      v                                     │
   THINK ──► DECIDE ──► USE TOOL ──► GET RESULT
      │         │
      │         └──► No tool needed ──► RESPOND
      │
      └──── Need more info? Loop again!
```

This is what makes Claude Code **agentic** — it can:
1. Think about a problem
2. Decide what information it needs
3. Use tools to get that information
4. Think about the results
5. Repeat until the task is done

> **Reflection:** How is this different from a simple chatbot that
> just generates text? What kinds of tasks become possible with
> agentic tool use that weren't possible before?

---

## Hands-On Exercises

### Exercise 1: Watch the Tools
Give Claude Code a task and watch which tools it uses:
```
Find all JavaScript files in my project and tell me which one
has the most lines of code.
```
Write down each tool call you see.

### Exercise 2: MCP Discovery
Ask Claude Code:
```
What MCP servers are currently connected? What tools does each provide?
```

### Exercise 3: Design Your Own Tool
On paper (or in a file), design a tool that Claude could use.
Include:
- **Name**: What's it called?
- **Description**: What does it do?
- **Parameters**: What inputs does it need?
- **Returns**: What does it give back?

Example: A tool called `send_email` that takes `to`, `subject`, and `body`.

---

## Key Takeaways

- [ ] Tools give Claude the ability to interact with the real world
- [ ] MCP is the standard protocol connecting AI to external tools
- [ ] MCP Servers provide sets of related tools (Pencil, GitHub, etc.)
- [ ] The agentic loop: Think → Decide → Use Tool → Get Result → Repeat
- [ ] You can define custom tools for Claude in your own applications
- [ ] Claude *decides* which tools to use — it's not hardcoded

---

*Next: `06-pencil-fundamentals.md` — Enter the world of AI-powered design.*
