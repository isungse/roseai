import type { CSSProperties } from "react";

interface RevealTextProps {
  text: string;
  /** Offset so a second block continues the stagger of a previous one. */
  startIndex?: number;
  /** Exact substring of `text` to render in brand red (first occurrence). */
  accent?: string;
}

// Word-by-word blur-in (`.word-in` in globals.css). Whitespace tokens are
// emitted verbatim so `\n` in the source still breaks lines under
// `whitespace-pre-line` on the parent. The accent is applied by character
// range, so a particle glued to the last accent word ("네이티브로.") stays ink.
export function RevealText({ text, startIndex = 0, accent }: RevealTextProps) {
  const tokens = text.split(/(\s+)/);
  const accentStart = accent ? text.indexOf(accent) : -1;
  const accentEnd = accentStart >= 0 && accent ? accentStart + accent.length : -1;
  let wordIndex = startIndex;
  let offset = 0;

  return tokens.map((token, i) => {
    const start = offset;
    offset += token.length;
    if (token.trim() === "") return token;

    const style = { "--i": wordIndex++ } as CSSProperties;
    const inStart = Math.max(start, accentStart);
    const inEnd = Math.min(offset, accentEnd);
    if (accentStart < 0 || inEnd <= inStart) {
      return (
        <span key={i} className="word-in" style={style}>
          {token}
        </span>
      );
    }
    return (
      <span key={i} className="word-in" style={style}>
        {token.slice(0, inStart - start)}
        <span className="text-brand">{token.slice(inStart - start, inEnd - start)}</span>
        {token.slice(inEnd - start)}
      </span>
    );
  });
}

export function countWords(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}
