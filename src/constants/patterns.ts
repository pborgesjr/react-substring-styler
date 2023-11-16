import type { DefaultPattern, PatternShape } from "../types";

export const PATTERNS: Record<DefaultPattern, PatternShape> = {
  url: {
    pattern:
      /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_\+\[\],.~#?&\/=]*[-a-zA-Z0-9@:%_\+\]~#?&\/=])*/i,
  },
  email: { pattern: /\S+@\S+\.\S+/ },
  curlyBrackets: {
    pattern: /\{(.*?)\}/,
    renderText: (matchingString: string) =>
      matchingString.replace(/\{/g, "").replace(/}/g, ""),
  },
  squareBrackets: {
    pattern: /\[(.*?)\]/,
    renderText: (matchingString: string) =>
      matchingString.replace(/\[/g, "").replace(/]/g, ""),
  },
};
