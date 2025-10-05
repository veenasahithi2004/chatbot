# Design Guidelines: Learning Chatbot with Live Avatar

## Design Approach

**Reference-Based Hybrid Approach**: Drawing inspiration from Duolingo's friendly educational design, ChatGPT's clean conversational interface, and modern video conferencing layouts. The design balances engaging avatar interaction with functional knowledge-based learning.

**Core Principles**:
- Avatar-first presentation with prominent character presence
- Clean, distraction-free chat interface for focused learning
- Warm, approachable educational tone
- Technology-forward aesthetic that builds trust in AI learning

---

## Color Palette

**Light Mode**:
- Primary: 245 85% 58% (vibrant purple-blue for engagement)
- Background: 220 15% 98% (soft off-white)
- Surface: 0 0% 100% (pure white for chat bubbles)
- Text Primary: 220 20% 15% (deep charcoal)
- Text Secondary: 220 15% 45% (medium gray)
- Avatar Stage: 245 65% 96% (subtle purple tint)
- Success/Active: 150 75% 45% (learning green)

**Dark Mode**:
- Primary: 245 80% 65% (lighter purple-blue)
- Background: 220 25% 8% (deep slate)
- Surface: 220 20% 12% (elevated dark)
- Text Primary: 220 10% 95% (soft white)
- Text Secondary: 220 10% 65% (muted light gray)
- Avatar Stage: 245 35% 14% (dark purple stage)

---

## Typography

**Font Stack**:
- Primary: 'Inter', system-ui, sans-serif (clean, modern, highly readable)
- Code/Technical: 'JetBrains Mono', monospace (for knowledge base filenames)

**Hierarchy**:
- Hero Title: text-4xl md:text-5xl, font-bold, tracking-tight
- Section Headers: text-2xl md:text-3xl, font-semibold
- Chat Messages: text-base, font-normal, leading-relaxed
- Avatar Status: text-sm, font-medium
- Button Text: text-sm md:text-base, font-medium
- Knowledge Base Items: text-sm, font-normal

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20 for consistent rhythm

**Grid Structure**:
- Main Layout: Two-column split on desktop (lg:grid-cols-2)
  - Left: Avatar display panel (sticky positioning)
  - Right: Chat interface + knowledge base controls
- Mobile: Single column stack, avatar collapses to smaller persistent view
- Container max-width: max-w-7xl with px-4 md:px-6 lg:px-8

**Avatar Panel**:
- Desktop: 50% width, sticky top-0, full viewport height
- Mobile: Collapsed header with 120px height showing avatar face
- Background: Subtle gradient or solid avatar stage color
- Padding: p-8 lg:p-12

**Chat Panel**:
- Desktop: 50% width, scrollable content
- Max message width: max-w-2xl within panel
- Padding: p-6 lg:p-8

---

## Component Library

### Avatar Display
- **3D Canvas**: Full-width in avatar panel, aspect ratio 4:3
- **Avatar Frame**: Rounded-2xl with subtle border, shadow-xl
- **Status Indicators**: Floating badge showing state (Listening, Thinking, Speaking, Idle)
- **Gesture Overlay**: Subtle particle effects or glow during key moments

### Chat Interface
- **Message Bubbles**:
  - User: Right-aligned, primary color background, white text, rounded-2xl, max-w-[85%]
  - Bot: Left-aligned, surface color, text primary, rounded-2xl, max-w-[85%]
  - Spacing: space-y-4 between messages
  - Padding: px-4 py-3 md:px-5 md:py-4
- **Input Area**: 
  - Fixed bottom positioning with backdrop blur
  - Large textarea: min-h-[60px], rounded-xl border
  - Send button: Circular, primary color, icon-only
  - Microphone toggle if voice input enabled

### Knowledge Base Manager
- **Upload Section**: 
  - Drag-and-drop zone: Dashed border-2, rounded-lg, p-8
  - Accepted formats badge: PDF, TXT, JSON icons
  - File list: Grid of cards with filename, size, remove action
- **Knowledge Cards**:
  - Grid: grid-cols-1 md:grid-cols-2 gap-4
  - Card style: Rounded-lg, border, p-4, hover:shadow-md transition
  - File icon + metadata + status indicator

### Navigation & Controls
- **Top Bar**: 
  - Sticky header with logo, title, settings icon
  - Height: h-16, backdrop blur if over content
- **Settings Panel**: 
  - Slide-out drawer from right
  - Voice settings, avatar preferences, knowledge base management
- **Action Buttons**:
  - Primary: Solid background, rounded-lg, px-6 py-3
  - Secondary: Outline variant with transparent background
  - Icon buttons: Circular, p-2.5, hover:bg-surface

### Educational Elements
- **Learning Progress**: Subtle progress indicator in header
- **Topic Tags**: Small rounded-full badges showing conversation topics
- **Quick Actions**: Floating action menu with common learning tasks (Save conversation, Export notes, New topic)

---

## Animations & Interactions

**Minimal, Purposeful Animations**:
- Avatar lip-sync: Smooth morphing synchronized to audio waveform
- Gesture transitions: Ease-in-out, 300-500ms duration
- Message appearance: Gentle slide-up with fade-in
- Typing indicator: Three-dot pulse animation
- No excessive hover effects or decorative animations

**Avatar States**:
- Idle: Gentle breathing animation, occasional blinks
- Listening: Attentive pose, slight head tilt
- Thinking: Contemplative gesture, subtle glow effect
- Speaking: Active lip-sync, expressive hand gestures
- Celebrating: Positive reinforcement animation for correct answers

---

## Images

**Hero/Avatar Visualization**:
- Primary: 3D rendered avatar character (friendly, approachable design)
- Style: Semi-realistic with soft cartoon proportions, professional but warm
- Placement: Center of left panel, occupying 70% of avatar stage area
- Background: Subtle gradient or abstract educational motifs (books, lightbulbs) in avatar stage color

**Knowledge Base Icons**:
- Document type icons for PDF, TXT, JSON files
- Use icon library (Heroicons) for consistency

---

## Accessibility & Responsiveness

- WCAG AA contrast ratios for all text
- Keyboard navigation for all interactive elements
- Screen reader labels for avatar status and gestures
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Mobile-first chat interface with collapsible avatar view
- Focus indicators: ring-2 ring-primary with offset

---

## Special Considerations

**Avatar Integration**:
- Use Three.js or Ready Player Me for 3D rendering
- Optimize for 60fps performance
- Fallback to static image if WebGL unavailable

**Conversation Memory**:
- Visual indication of context retention (subtle highlight on referenced messages)
- Session summary card when starting new conversations

**Trust Signals**:
- "Powered by [AI Model]" badge
- Knowledge source attribution in responses
- Confidence indicators for AI-generated answers