

# Make "Build Your Day" Section Warm and Inviting

## Problem
The interest cards feel flat and transactional. They don't invite conversation or make the visitor feel like they're about to plan something exciting with a real person.

## Changes

### 1. Warmer card styling (GetInspired.tsx)
- Give cards a warm cream/paper background (`bg-accent/5`) with rounded corners (`rounded-lg`) and a soft shadow (`shadow-md`)
- Remove the hard border, use a subtle warm border instead (`border-accent/10`)
- On hover: lift the card slightly (`hover:-translate-y-1 hover:shadow-lg`) and add a warm left accent bar
- When selected (active): warm glow with left accent bar in orange, stronger background tint

### 2. Bigger, friendlier icons
- Increase icon size from `text-3xl` to `text-4xl`
- Add a small warm-tinted circle behind each icon as a "badge" background

### 3. More personal copy
- Change "Get Inspired" label to "What excites you?"
- Update the body text to feel more like Dennis is talking directly: "Tell me what you love, and I'll show you a side of Amsterdam you won't find in any guidebook."
- Update the bottom note to a soft CTA: "Pick a few that speak to you, then let's talk about building your perfect day."

### 4. Warm section background
- Add a very subtle warm gradient to the section background (cream tint) instead of plain white

### 5. Soft CTA at the bottom
- Replace the plain text at the bottom with a warm, inviting link/button to the contact/booking page: "Ready to start planning? Let's talk." styled as a gentle text link in the secondary color

## File Changes
1. **`src/pages/GetInspired.tsx`** — Updated card styling, copy, section background, and bottom CTA

