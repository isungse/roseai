import type { CSSProperties } from "react";

interface RevealTextProps {
  text: string;
  /** Offset so a second block continues the stagger of a previous one. */
  startIndex?: number;
}

// Word-by-word blur-in (`.word-in` in globals.css). Whitespace tokens are
// emitted verbatim so `\n` in the source still breaks lines under
// `whitespace-pre-line` on the parent.
export function RevealText({ text, startIndex = 0 }: RevealTextProps) {
  const tokens = text.split(/(\s+)/);
  let wordIndex = startIndex;

  return tokens.map((token, i) => {
    if (token.trim() === "") return token;
    const style = { "--i": wordIndex++ } as CSSProperties;
    return (
      <span key={i} className="word-in" style={style}>
        {token}
      </span>
    );
  });
}

export function countWords(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}
