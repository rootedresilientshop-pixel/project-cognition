# GitHub Discussions - Opening Posts

Use these templates to create initial discussion categories on your GitHub Discussions page. These set the tone for community engagement and invite feedback strategically.

---

## Category 1: Announcements

**Description:** Latest news, releases, and important updates about Project Cognition

### Opening Post: Welcome to Project Cognition! 🚀

```markdown
# Welcome to Project Cognition Community!

Hi everyone! 👋

Welcome to the Project Cognition GitHub Discussions. This is where we connect as a community, share ideas, and build the future of AI-assisted development together.

## What is Project Cognition?

Project Cognition solves a real problem many developers face: **AI amnesia**.

You've probably experienced this:
- You tell Claude your architectural decision on Day 1
- Same day, different conversation: Claude suggests the opposite approach
- Week later: You're debugging a bug Claude "fixed" before
- 😤 You give up on AI pair programming

Project Cognition fixes this by creating a lightweight **memory layer stored in your Git repo**. One command injects that memory into Claude, ChatGPT, Copilot, or any AI tool.

## Vision

We're building a tool that transforms AI from "amnesia-prone assistant" to "context-aware partner." A tool that remembers your decisions, learns from your failures, and respects your constraints.

## What's Coming

- **v0.3.0** - Memory visualization (sidebar view)
- **v0.4.0** - Team collaboration features
- **v1.0** - Integration with GitHub Issues and native AI tools

## Get Involved

- **Report bugs** - Found a problem? Let us know
- **Suggest features** - What would make Project Cognition better for you?
- **Share your use case** - How are you using Project Cognition?
- **Contribute** - Check out CONTRIBUTING.md if you want to code with us

## Installation

Install from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=DigitalForgeAI.project-cognition)

Thanks for being here! This community makes Project Cognition better every day. 🙌
```

---

## Category 2: General

**Description:** Ask questions, share ideas, and discuss anything about Project Cognition

### Opening Post: Ask Questions, Share Ideas

```markdown
# General Discussion - Ask Anything

Welcome to the General Discussion! 👋

This is the place to:

## Ask Questions
- "How do I set up Project Cognition for my team?"
- "Does this work with my favorite AI tool?"
- "How often should I update my memory files?"
- "Can I share memory between projects?"

## Share Your Experience
- Tell us about your workflow with Project Cognition
- Share challenges you're facing
- Discuss how it's helping you code better

## Discuss Features
- "What would make Project Cognition better for you?"
- "How are you using the failure logging feature?"
- "Have you thought about adding X?"

## Debate Ideas
- "Should Project Cognition support Y?"
- "Is this the right approach for Z?"

**Be kind, be respectful, help each other learn.**

Looking forward to your questions and ideas! 🚀
```

---

## Category 3: Show and Tell

**Description:** Share what you've built with Project Cognition - your memory setups, workflows, success stories

### Opening Post: Share Your Success Stories

```markdown
# Show and Tell - What Are You Building?

We'd love to hear about how you're using Project Cognition!

## Share Your Story

Tell us about:

### Your Memory Setup
- How do you organize your project memory?
- What does your `intent.md` look like?
- What architectural decisions have you documented?

### Your Workflow
- How has Project Cognition changed how you work with AI?
- What's your process for injecting memory?
- How often do you update your failure log?

### Your Success
- Has Project Cognition helped you ship faster?
- Did it prevent a bug or architectural mistake?
- Did it improve your AI pair programming experience?

### Your Project
- What are you building?
- What's the tech stack?
- Why is Project Cognition valuable for your project?

## Example

```
**Project:** Building a real-time collaboration tool

**Memory highlights:**
- Intent: "Offline-first, real-time sync, zero server dependency"
- Key decision: "Use CRDT for sync, not operational transformation"
- Lesson learned: "Event listeners can create memory leaks - always call destroy()"

**Impact:** Prevented Claude from suggesting client-server architecture 5 times in the same week. Now stays consistent with our offline-first approach.

**What's working:** Failure log is gold - Claude avoids the same mistakes

**What's not working:** Hard to remember to update intent.md when pivoting features
```

## We're Excited to Hear From You! 🎉

Don't worry about being "perfect" or having a huge project. We want to hear from everyone - from side projects to enterprise apps.

**Share in the comments below! ⬇️**
```

---

## Category 4: Ideas & Feedback

**Description:** Suggest features, discuss improvements, and help shape the future of Project Cognition

### Opening Post: Help Shape the Future

```markdown
# Ideas & Feedback - Shape Project Cognition's Future

We're actively building Project Cognition based on **your feedback**. This discussion is where great ideas come from.

## What We're Listening For

### Feature Ideas
- "I wish Project Cognition could..."
- "What if we added..."
- "Could we support..."

### Workflow Improvements
- "The current process is clunky because..."
- "It would be faster if..."
- "I'm struggling with..."

### Integration Ideas
- "Does it work with [AI tool]?"
- "Could it integrate with [platform]?"
- "What about [use case]?"

### Pain Points
- "I hit a problem when..."
- "This doesn't work well because..."
- "It would be better if..."

## Current Roadmap (High Level)

**v0.3.0 (Next)**
- Memory visualization in sidebar
- Better failure log browsing

**v0.4.0**
- Team collaboration
- Shared memory with comments

**v1.0+**
- Native integrations
- AI-powered suggestions

But we're flexible! If your feedback suggests a better direction, we'll listen.

## How Ideas Become Reality

1. **You suggest** something here
2. **We discuss** with the community
3. **Popular ideas** become GitHub Issues
4. **Interested contributors** submit PRs
5. **Best ideas** ship in releases

## Examples of Good Feedback

❌ "This tool sucks"
✅ "When I try to log failures, it takes 5 minutes to answer the prompts. Could it be faster?"

❌ "Add AI suggestions"
✅ "I'd love if Project Cognition suggested decisions based on my failure log. It could say 'You've hit this bug twice - want to document the solution?'"

❌ "Make it work with ChatGPT"
✅ "I use ChatGPT instead of Claude. The memory format seems optimized for Claude - would it work just as well with ChatGPT? Any special formatting needed?"

## Thank You

Your ideas make Project Cognition better. Even if we can't do everything, we read every suggestion and learn from your perspective.

**Drop your idea below! ⬇️**
```

---

## Setup Instructions

### On GitHub (After Enabling Discussions)

1. Go to your repository's **Discussions** tab
2. Click **Create a discussion**
3. **Category:** Select the category type
4. **Title:** Use the title from above
5. **Description:** Paste the opening post content
6. Click **Start discussion**

### Recommended Order to Create

1. **Announcements** (set the tone of the project)
2. **General** (invite questions)
3. **Show and Tell** (encourage sharing)
4. **Ideas & Feedback** (invite improvement suggestions)

---

## Strategy Behind These Posts

### Why These Categories?

- **Announcements** - Shows you're actively developing and communicating
- **General** - Lowers barrier to entry (people can ask anything)
- **Show and Tell** - Builds community (people love sharing what they made)
- **Ideas & Feedback** - Shows you value user input (people feel heard)

### Why This Tone?

- **Friendly & welcoming** - "Be kind, be respectful"
- **Vision-driven** - Shows why the project matters
- **Concrete examples** - Makes it clear what's wanted
- **Inclusive** - Everyone can contribute in some way
- **Action-oriented** - Tells people exactly what to do

### What Makes People Engage?

1. **Clear purpose** - They know what each category is for
2. **Invitation** - You explicitly ask them to participate
3. **Examples** - They see what kind of posts fit
4. **No judgment** - Tone is welcoming, not gatekeeping
5. **Vision** - They understand why their feedback matters

---

## After You Post

### First Week Actions

1. **Respond quickly** - Reply to every new discussion within 24 hours
2. **Ask follow-up questions** - Show genuine interest
3. **Link to relevant docs** - Point people to CONTRIBUTING.md, etc.
4. **Be authentic** - Talk like yourself, not corporate-speak

### Keep It Going

1. **Share releases** in Announcements
2. **Feature users** in Show and Tell (ask permission first)
3. **Act on feedback** - Show that ideas become reality
4. **Celebrate wins** - When someone contributes, give credit

---

## Example First Week

**Day 1:** You enable discussions, create the 4 opening posts
**Day 2:** Someone asks a question in General → You respond within an hour
**Day 3:** Someone shares their project in Show and Tell → You thank them and ask questions
**Day 4:** Someone suggests a feature → You discuss, ask if they'd help implement it
**Day 5:** Someone reports a rough experience → You listen, brainstorm solutions, thank them

This creates momentum. Your community sees you're engaged and responsive. They engage more.

---

## Pro Tips

1. **Pin the Announcements post** - It stays at the top
2. **Set expected response time** in General - "We respond within 24 hours"
3. **Celebrate early contributors** - Feature them publicly
4. **Convert good ideas to Issues** - Shows ideas → action
5. **Monthly recap** - Share what feedback led to in releases

---

You're ready to build an engaged community! 🚀
