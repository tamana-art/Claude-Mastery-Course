# Module 8: Variant
## Theming, Variables, and Design Systems

> **Activation Prompt:**
> *"I'm starting Module 8 — Variant (Theming & Variables). Be my Socratic tutor. Start by asking me: your app needs a light mode and a dark mode. Every color needs to change. How would you do that without editing every single element?"*

---

## The Big Idea

Variant is about **design tokens** and **theming** —
the system that lets you change your entire design's look
by flipping a switch, not editing hundreds of nodes.

---

### Concept 1: What Are Variables?

Variables are **named values** that you use instead of hardcoded values.

```
WITHOUT VARIABLES:
  Button fill: "#2563EB"
  Link color: "#2563EB"
  Header bg: "#2563EB"

  Want to change the brand color?
  → Edit EVERY instance manually 😫

WITH VARIABLES:
  $primary-color = "#2563EB"
  Button fill: $primary-color
  Link color: $primary-color
  Header bg: $primary-color

  Want to change the brand color?
  → Change ONE variable ✨
```

> **Question:** What other design properties would benefit from being
> variables instead of hardcoded values? Think about what changes
> frequently across a design.

---

### Concept 2: Variable Types in Pencil

Pencil supports different types of variables:

```javascript
// Setting variables
set_variables({
  variables: {
    // Color variables
    "primary": { type: "color", value: "#2563EB" },
    "secondary": { type: "color", value: "#7C3AED" },
    "text-primary": { type: "color", value: "#1A1A2E" },
    "background": { type: "color", value: "#FFFFFF" },

    // Spacing variables
    "spacing-sm": { type: "number", value: 8 },
    "spacing-md": { type: "number", value: 16 },
    "spacing-lg": { type: "number", value: 32 },

    // Typography variables
    "font-heading": { type: "string", value: "Inter" },
    "font-body": { type: "string", value: "Inter" },
  }
})
```

Now instead of `fill: "#2563EB"`, you use `fill: "$primary"`.

> **Exercise:** Design a set of variables for a coffee shop website.
> What colors, spacing, and fonts would you choose?

---

### Concept 3: Themes — The Power of Variant

Here's where it gets powerful. **Themes** let variables have
different values in different contexts:

```javascript
set_variables({
  variables: {
    "background": {
      type: "color",
      themes: {
        "mode": {
          "light": "#FFFFFF",    // Light mode
          "dark": "#1A1A2E"      // Dark mode
        }
      }
    },
    "text-color": {
      type: "color",
      themes: {
        "mode": {
          "light": "#1A1A2E",
          "dark": "#F0F0F0"
        }
      }
    },
    "primary": {
      type: "color",
      themes: {
        "mode": {
          "light": "#2563EB",
          "dark": "#60A5FA"    // Lighter blue for dark mode
        }
      }
    }
  }
})
```

```
LIGHT MODE:                    DARK MODE:
┌──────────────────┐          ┌──────────────────┐
│ ░░░░░░░░░░░░░░░░ │          │ ████████████████ │
│ ░ Hello World  ░ │          │ █ Hello World  █ │
│ ░ [Button]     ░ │          │ █ [Button]     █ │
│ ░░░░░░░░░░░░░░░░ │          │ ████████████████ │
└──────────────────┘          └──────────────────┘
  bg: #FFFFFF                   bg: #1A1A2E
  text: #1A1A2E                 text: #F0F0F0
```

**Same design. Same components. Different theme. Zero manual changes.**

> **Question:** Besides light/dark mode, what other theme axes can you
> think of? (Hint: think about brands, accessibility, seasonal...)

---

### Concept 4: Theme Axes

Themes aren't limited to light/dark. You can have multiple axes:

```
Theme Axis: "mode"
  ├── light
  └── dark

Theme Axis: "brand"
  ├── startup (playful colors)
  ├── corporate (conservative colors)
  └── luxury (gold/black)

Theme Axis: "density"
  ├── comfortable (more spacing)
  ├── compact (less spacing)
  └── cozy (medium)
```

A variable can respond to ANY combination:

```javascript
"primary": {
  type: "color",
  themes: {
    "brand": {
      "startup": "#FF6B6B",
      "corporate": "#003366",
      "luxury": "#C5A572"
    },
    "mode": {
      "light": "#2563EB",
      "dark": "#60A5FA"
    }
  }
}
```

> **Question:** Imagine you're building a design tool for a company
> that has 5 sub-brands. Each needs its own color scheme AND light/dark mode.
> How many theme combinations is that? How many designs would you need
> without variables?

---

### Concept 5: Using Variables in Designs

Once variables are defined, use them in your design nodes:

```javascript
// Without variables (fragile)
card=I(parent, {
  type: "frame",
  fill: "#FFFFFF",
  padding: 16,
  children: [{
    type: "text",
    content: "Title",
    color: "#1A1A2E",
    fontSize: 20
  }]
})

// With variables (robust)
card=I(parent, {
  type: "frame",
  fill: { $: "background" },           // References variable
  padding: { $: "spacing-md" },         // References variable
  children: [{
    type: "text",
    content: "Title",
    color: { $: "text-color" },         // References variable
    fontSize: { $: "heading-size" }     // References variable
  }]
})
```

The `{ $: "variable-name" }` syntax binds a property to a variable.

> **Exercise:** Take the card from Module 6 and rewrite it using
> variables. What variables would you define?

---

### Concept 6: The Replace All Tool

When you want to update existing designs to use new values:

```javascript
// Find all instances of a color and replace it
replace_all_matching_properties({
  parents: ["screen-id"],
  properties: {
    fillColor: [
      { from: "#2563EB", to: "#3B82F6" }   // Old blue → New blue
    ],
    textColor: [
      { from: "#1A1A2E", to: "#111827" }   // Old dark → New dark
    ],
    fontSize: [
      { from: 14, to: 16 }                  // Increase base font
    ]
  }
})
```

And to discover what values exist:

```javascript
// Find all unique colors, fonts, etc. in a design
search_all_unique_properties({
  parents: ["screen-id"],
  properties: ["fillColor", "textColor", "fontSize", "fontFamily"]
})
// Returns: all unique values used in the design
```

> **Question:** You inherited a design with 50 different colors used
> across 10 screens. How would you use these tools to clean it up
> into a consistent system?

---

### Concept 7: Design Tokens → Code

Design tokens (variables) bridge design and development:

```
Pencil Variables:                   CSS Variables:
$primary = #2563EB        →        --color-primary: #2563EB;
$spacing-md = 16          →        --spacing-md: 16px;
$font-heading = Inter     →        --font-heading: 'Inter';

Pencil Themes:                     CSS Media Queries:
mode: light / dark         →       @media (prefers-color-scheme: dark)
```

This is why variables matter beyond design — they create a
**shared language** between designers and developers.

> **Exercise:** Ask Claude Code to get the variables from a .pen file
> using `get_variables` and generate CSS custom properties from them.

---

## Hands-On Exercises

### Exercise 1: Create a Themed Design
Ask Claude Code:
```
Create a new .pen file. Define variables for a color scheme with
light and dark themes. Then create a simple card that uses those
variables. Show me screenshots in both themes.
```

### Exercise 2: Audit a Design
If you have an existing .pen file:
```
Search all unique colors, font sizes, and font families used in my design.
Then suggest a consolidated set of variables to replace them.
```

### Exercise 3: Brand Variants
Ask Claude Code:
```
Create a simple header component that looks different under three
brand themes: "Playful" (bright colors, rounded), "Corporate"
(conservative, sharp), and "Minimal" (black and white, clean).
```

---

## Key Takeaways

- [ ] Variables replace hardcoded values with named, reusable tokens
- [ ] Themes let variables have different values in different contexts
- [ ] Theme axes (mode, brand, density) can be combined
- [ ] `{ $: "variable-name" }` binds a property to a variable
- [ ] `search_all_unique_properties` finds all values in a design
- [ ] `replace_all_matching_properties` does bulk replacements
- [ ] Design tokens bridge the gap between design and code

---

*Next: `09-putting-it-together.md` — Build a real project end-to-end.*
