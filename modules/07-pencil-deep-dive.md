# Module 7: Pencil Deep Dive
## Components, Style Guides, and Advanced Design

> **Activation Prompt:**
> *"I'm starting Module 7 — Pencil Deep Dive. Be my Socratic tutor. Start by asking me: if you had to design 20 screens for an app, and each screen had the same button style, how would you keep things consistent without copying and pasting?"*

---

## The Big Idea

Real design isn't one-off screens. It's **systems**.
Components, style guides, and design tokens let you build
designs that are consistent, maintainable, and scalable.

---

### Concept 1: Components (Reusable Nodes)

A **component** is a reusable design element:

```
COMPONENT (the template):          INSTANCES (copies):
┌─────────────────┐               ┌─────────────────┐
│ ● Button        │  ──creates──► │ "Sign Up"        │
│   [Label Text]  │               └─────────────────┘
│   fill: blue    │               ┌─────────────────┐
│   radius: 8     │  ──creates──► │ "Log In"         │
└─────────────────┘               └─────────────────┘
                                  ┌─────────────────┐
                   ──creates──►   │ "Submit"         │
                                  └─────────────────┘
```

- The **component** has `reusable: true` — it's the master template
- **Instances** use `type: "ref"` — they point back to the component
- Change the component → ALL instances update automatically

```javascript
// Creating a component
button=I(document, {
  type: "frame",
  name: "Button",
  reusable: true,          // This makes it a component!
  layout: "horizontal",
  padding: 12,
  fill: "#2563EB",
  cornerRadius: [8,8,8,8],
  children: [{
    type: "text",
    id: "label",
    content: "Button",
    color: "#FFFFFF"
  }]
})

// Using the component (creating an instance)
submitBtn=I(myForm, {
  type: "ref",              // This is an instance!
  ref: "button",            // Points to the component ID
})

// Customizing the instance
U(submitBtn+"/label", {content: "Submit"})
```

> **Question:** What happens if you change the fill color of the
> original Button component? What happens to all the instances?

---

### Concept 2: Design Systems in Pencil

A **design system** is a collection of components that work together:

```
Design System
├── Atoms (smallest pieces)
│    ├── Button
│    ├── Input
│    ├── Badge
│    └── Avatar
├── Molecules (combinations)
│    ├── Search Bar (Input + Button)
│    ├── Card (Frame + Text + Button)
│    └── Nav Item (Icon + Text)
└── Organisms (sections)
     ├── Header (Logo + Nav Items + Button)
     ├── Hero Section
     └── Footer
```

This is called **Atomic Design** — building complex UIs from simple pieces.

> **Question:** Think about your favorite app. Can you break down its
> interface into atoms, molecules, and organisms?

---

### Concept 3: Using the Guidelines Tool

Before designing, Claude fetches design guidelines:

```
get_guidelines("landing-page")   → Rules for landing pages
get_guidelines("web-app")        → Rules for web applications
get_guidelines("mobile-app")     → Rules for mobile apps
get_guidelines("design-system")  → Rules for using components
get_guidelines("table")          → Rules for data tables
```

These guidelines contain:
- Layout rules (spacing, grid systems)
- Typography scales
- Color usage patterns
- Component composition patterns
- Responsive design rules

> **Exercise:** Ask Claude Code to fetch the landing page guidelines
> and summarize the key rules for you.

---

### Concept 4: Style Guides

Style guides provide **visual direction**:

```
Step 1: Get available tags
  → get_style_guide_tags()
  → Returns: ["minimal", "bold", "corporate", "playful", ...]

Step 2: Get a style guide with your tags
  → get_style_guide(tags=["modern", "minimal", "saas", "website"])
  → Returns: Color palette, typography, spacing, mood, examples
```

The style guide tells Claude things like:
- Primary color: #2563EB (blue)
- Font family: Inter
- Border radius: 12px (rounded)
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64
- Mood: Professional but friendly

> **Exercise:** What style would you want for YOUR project?
> Pick 5 adjectives that describe the look you want.

---

### Concept 5: Component Instances & Overrides

When you use a component instance, you can **override** specific properties
without breaking the connection to the parent component:

```javascript
// Component: Card
// Has children: image, title, description, button

// Instance 1: Product Card
card1=I(grid, {type: "ref", ref: "Card"})
U(card1+"/title", {content: "Product Name"})
U(card1+"/description", {content: "A great product"})
U(card1+"/button/label", {content: "Buy Now"})

// Instance 2: Blog Card
card2=I(grid, {type: "ref", ref: "Card"})
U(card2+"/title", {content: "Blog Post Title"})
U(card2+"/description", {content: "Read our latest article"})
U(card2+"/button/label", {content: "Read More"})
```

Both cards share the same structure and base styling,
but have different content.

> **Question:** If you later decide all cards should have rounded corners
> of 16px instead of 8px, how many changes do you need to make?
> (Hint: component vs. instances...)

---

### Concept 6: The Screenshot Verification Loop

Good design is iterative. Claude follows this loop:

```
Design ──► Screenshot ──► Review ──► Adjust ──► Screenshot ──► ...
```

```javascript
// 1. Create the design
batch_design(operations)

// 2. Take a screenshot to verify
get_screenshot(nodeId)

// 3. Claude analyzes the screenshot
// "The spacing looks too tight, the text is hard to read..."

// 4. Make adjustments
batch_design(fixOperations)

// 5. Verify again
get_screenshot(nodeId)
```

> **Exercise:** After creating a design, always ask:
> "Show me a screenshot and tell me if anything looks off."

---

### Concept 7: Layout Debugging

When designs don't look right, use layout tools:

```javascript
// Check computed layout rectangles
snapshot_layout(parentId, maxDepth=2)

// Returns things like:
// - Node X is clipped by its parent (overflow)
// - Node Y overlaps with Node Z
// - Node W has 0 height (missing content)
```

Common layout issues:
- **Clipping** — child is bigger than parent
- **Overlap** — elements stacked on top of each other
- **Missing size** — frame has no width/height and no content
- **Wrong alignment** — items not where you expect

> **Question:** You designed a card but the button is invisible.
> What are three possible reasons? How would you debug it?

---

## Hands-On Exercises

### Exercise 1: Component Creation
Ask Claude Code:
```
Create a .pen file with a reusable Button component that has:
- Primary variant (blue background, white text)
- Then create 3 instances with different labels: "Sign Up", "Learn More", "Contact"
```

### Exercise 2: Full Page Design
Ask Claude Code:
```
Design a landing page for a fictional AI tutoring app called "LearnBot".
Include: hero section, features (3 cards), testimonial, and CTA.
Use a modern, friendly style. Show me a screenshot when done.
```

### Exercise 3: Iterate on Design
After the previous exercise:
```
The hero section needs more visual impact. Make the headline larger,
add a gradient background, and give it more breathing room.
Show me before and after screenshots.
```

---

## Key Takeaways

- [ ] Components (`reusable: true`) are master templates
- [ ] Instances (`type: "ref"`) point back to components
- [ ] Design systems organize components: Atoms → Molecules → Organisms
- [ ] Style guides provide visual direction (colors, fonts, mood)
- [ ] Guidelines (`get_guidelines`) provide structural rules
- [ ] Always verify designs with screenshots
- [ ] Use `snapshot_layout` to debug layout issues

---

*Next: `08-variant.md` — Theming, variables, and design tokens.*
