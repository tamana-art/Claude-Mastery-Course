# Claude Ecosystem Cheat Sheet
## Your Quick Reference Card

---

## Claude Code Commands
| Command | What It Does |
|---------|-------------|
| `/help` | Show all commands |
| `/clear` | Clear conversation |
| `/compact` | Compress context |
| `/cost` | Show usage costs |
| `/fast` | Toggle fast mode |
| `/status` | Current status |

## Claude Code Tools
| Tool | Use For |
|------|---------|
| `Read` | Reading files |
| `Write` | Creating new files |
| `Edit` | Modifying existing files |
| `Bash` | Terminal commands |
| `Glob` | Finding files by pattern |
| `Grep` | Searching file contents |
| `Agent` | Complex multi-step research |
| `WebSearch` | Internet searches |

## Prompting Patterns
| Pattern | Template |
|---------|----------|
| Expert | "Act as a [role]. [Task]." |
| Step-by-Step | "Walk me through [task] step by step." |
| Rubber Duck | "I'll explain my problem. Ask questions first." |
| Socratic Flip | "Ask ME questions to help you give better advice." |
| Teaching | "Teach me [topic]. Quiz me after." |

## Claude API Quick Reference
```python
import anthropic
client = anthropic.Anthropic()
msg = client.messages.create(
    model="claude-sonnet-4-6-20250514",
    max_tokens=1024,
    system="Your system prompt here",
    messages=[{"role": "user", "content": "Your message"}]
)
print(msg.content[0].text)
```

## Pencil Operations
| Op | Syntax | Purpose |
|----|--------|---------|
| Insert | `foo=I(parent, {data})` | Add new node |
| Update | `U(path, {data})` | Change properties |
| Delete | `D(nodeId)` | Remove node |
| Copy | `bar=C(nodeId, parent)` | Duplicate node |
| Replace | `baz=R(path, {data})` | Swap node |
| Move | `M(nodeId, parent)` | Relocate node |
| Image | `G(nodeId, "ai", "prompt")` | Generate image |

## Pencil Node Types
| Type | Use For |
|------|---------|
| `frame` | Containers, sections, buttons |
| `text` | Any text content |
| `rectangle` | Backgrounds, dividers |
| `ellipse` | Circles, avatars |
| `ref` | Component instances |

## Pencil Layout
```
layout: "horizontal" | "vertical" | "wrap"
gap: 16                    (space between items)
padding: 24                (space inside container)
width: "fill_container"    (stretch to fill parent)
mainAxisAlignment: "center"
crossAxisAlignment: "center"
```

## Variant (Variables & Themes)
```javascript
// Define variables
set_variables({
  variables: {
    "primary": {
      type: "color",
      themes: {
        "mode": { "light": "#2563EB", "dark": "#60A5FA" }
      }
    }
  }
})

// Use in nodes
{ fill: { $: "primary" } }
```

## Key Mental Models
- **Claude** = Brain (generates text by pattern prediction)
- **Tools** = Hands (Read, Write, Bash, Design...)
- **MCP** = USB for AI (standard connection protocol)
- **Pencil** = Design tool connected via MCP
- **Components** = Reusable templates (reusable: true)
- **Instances** = Copies that stay linked (type: "ref")
- **Variables** = Named values that can change per theme
- **Themes** = Different "modes" for your variables
