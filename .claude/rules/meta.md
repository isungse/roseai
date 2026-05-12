# Meta

When updating .claude/rules/ documentation, follow these principles:

1. Route content to the correct file based on its nature (design decisions → design-system.md, code patterns → code-style.md, etc.)
2. No duplication — if content belongs in one file, other files reference it instead of repeating it
3. Write at the abstraction level that remains valid over time; omit one-off events or session-specific details
4. If an update would significantly expand a file, propose splitting it into a new file before writing
5. CLAUDE.md is a top-level index only — keep it as references/links, never add detail there directly
