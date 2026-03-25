# Module 4: The Claude API
## Build Things WITH Claude, Programmatically

> **Activation Prompt:**
> *"I'm starting Module 4 — The Claude API. Be my Socratic tutor. Start by asking me: what do you think an API is, and why would someone want to use Claude through code instead of just chatting?"*

---

## The Big Idea

Everything you do in Claude Code? You can build it into YOUR apps.
The Claude API lets your code talk to Claude directly.

---

### Concept 1: What is an API?

Think of a restaurant:
- **You** = Your application
- **The menu** = The API documentation
- **Your order** = An API request
- **The waiter** = The API itself
- **The kitchen** = Claude's brain
- **Your food** = The API response

You don't need to know how the kitchen works.
You just need to know how to order.

> **Question:** Can you think of APIs you already use in daily life,
> even if you didn't realize they were APIs?
> (Hint: weather apps, login with Google, payment systems...)

---

### Concept 2: Your First API Call

Here's what talking to Claude through code looks like:

```python
# Python example using the Anthropic SDK
import anthropic

client = anthropic.Anthropic()  # Uses ANTHROPIC_API_KEY env variable

message = client.messages.create(
    model="claude-sonnet-4-6-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "What is the meaning of life?"}
    ]
)

print(message.content[0].text)
```

Let's break this down:

| Part | What It Does |
|------|-------------|
| `anthropic.Anthropic()` | Creates a connection to the API |
| `model=` | Which Claude model to use |
| `max_tokens=` | Maximum length of response |
| `messages=` | The conversation (your prompt) |
| `message.content[0].text` | The actual response text |

> **Question:** Look at the `messages` parameter. It's a list.
> Why do you think it's a list instead of a single string?
> (Hint: think about conversations...)

---

### Concept 3: The Messages Format

Claude conversations are a list of alternating messages:

```python
messages = [
    {"role": "user", "content": "Hi, I'm learning Python"},
    {"role": "assistant", "content": "Welcome! What would you like to learn?"},
    {"role": "user", "content": "How do lists work?"},
]
```

- `"user"` = what the human says
- `"assistant"` = what Claude says

To have a multi-turn conversation, you send the ENTIRE history each time.

> **Question:** Why does the API require you to send the whole conversation
> history? Why doesn't Claude "remember" previous messages automatically?
> (Hint: think back to Module 1 — what do you know about context windows?)

---

### Concept 4: System Prompts

You can give Claude a "personality" or set of instructions:

```python
message = client.messages.create(
    model="claude-sonnet-4-6-20250514",
    max_tokens=1024,
    system="You are a friendly Python tutor for beginners. "
           "Always explain concepts with real-world analogies. "
           "After explaining, give a small quiz question.",
    messages=[
        {"role": "user", "content": "What are variables?"}
    ]
)
```

The `system` prompt is like giving Claude a job description before the
conversation starts.

> **Exercise:** Write a system prompt that would make Claude act as:
> 1. A code reviewer who's very strict about best practices
> 2. A creative writing coach who gives encouraging feedback
> 3. A Socratic teacher who never gives direct answers

---

### Concept 5: Key Parameters

```python
message = client.messages.create(
    model="claude-sonnet-4-6-20250514",   # Which model
    max_tokens=1024,                       # Max response length
    temperature=0.7,                       # Creativity (0=precise, 1=creative)
    system="You are a helpful assistant",  # Instructions
    messages=[...]                         # The conversation
)
```

| Parameter | What It Controls | Low Value | High Value |
|-----------|-----------------|-----------|------------|
| `temperature` | Randomness/creativity | Factual, consistent | Creative, varied |
| `max_tokens` | Response length limit | Short answers | Long essays |
| `model` | Capability level | Haiku (fast/cheap) | Opus (powerful) |

> **Question:** You're building two apps:
> 1. A medical symptom checker
> 2. A creative story generator
> What temperature would you use for each, and why?

---

### Concept 6: Streaming

Instead of waiting for the full response, you can get it word-by-word:

```python
with client.messages.stream(
    model="claude-sonnet-4-6-20250514",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Tell me a story"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

This is how ChatGPT and Claude.ai show text appearing in real-time.

> **Question:** Why would streaming matter for a good user experience?
> What would it feel like to wait 10 seconds for a response vs.
> seeing it appear word by word?

---

## Hands-On Exercises

### Exercise 1: Read the Docs
Ask Claude Code:
```
Search for the latest Anthropic Python SDK documentation and
summarize the main features for me.
```

### Exercise 2: Build a Simple Chatbot
Ask Claude Code to help you write a simple Python chatbot:
```
Help me create a simple command-line chatbot using the Anthropic SDK.
It should:
- Have a system prompt that makes it a friendly tutor
- Keep conversation history
- Let me type messages in a loop
- Type 'quit' to exit
Keep it under 40 lines.
```

### Exercise 3: Experiment with Temperature
Ask Claude Code to create a script that calls Claude with
different temperatures and compare the outputs:
```
Create a script that asks Claude "Write a one-sentence description
of the ocean" with temperature 0, 0.5, and 1.0, and shows all three.
```

---

## Key Takeaways

- [ ] The Claude API lets your code talk to Claude directly
- [ ] Messages are sent as a list (conversation history)
- [ ] System prompts set Claude's behavior/personality
- [ ] Temperature controls creativity vs. consistency
- [ ] Streaming shows responses in real-time
- [ ] You need an API key to authenticate

---

*Next: `05-mcp-and-tool-use.md` — How Claude connects to the world.*
