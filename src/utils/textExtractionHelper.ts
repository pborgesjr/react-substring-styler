import type {
  PatternShape,
  ParsedTextType,
  TextExtractionHelperParams,
} from "../types";

export const textExtractionHelper = ({
  text,
  patterns,
}: TextExtractionHelperParams) => {
  const parsedPatterns = () => {
    let parsedTexts: Array<ParsedTextType> = [{ children: text }];

    patterns.forEach((currentPattern) => {
      const newParts: { children: string; [key: string]: any }[] = [];

      const tmp = currentPattern.matchCountLimit || 0;
      const numberOfMatchesPermitted = Math.min(
        Math.max(Number.isInteger(tmp) ? tmp : 0, 0) ||
          Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY
      );

      let currentMatches = 0;

      parsedTexts.forEach((parsedText) => {
        if (parsedText.match) {
          newParts.push(parsedText);
          return;
        }

        const parts: { children: string; [key: string]: any }[] = [];
        let textLeft = parsedText.children;
        let indexOfMatchedString = 0;

        let matches: RegExpExecArray | null | undefined;
        if (currentPattern.pattern) {
          currentPattern.pattern.lastIndex = 0;
        }

        while (textLeft && (matches = currentPattern.pattern?.exec(textLeft))) {
          const previousText = textLeft.substring(0, matches.index);
          indexOfMatchedString = matches.index;

          if (++currentMatches > numberOfMatchesPermitted) {
            break;
          }

          parts.push({ children: previousText });

          parts.push(
            getMatchedPart(
              currentPattern,
              matches[0],
              matches,
              indexOfMatchedString
            )
          );

          textLeft = textLeft.substring(matches.index + matches[0].length);
          indexOfMatchedString += matches[0].length - 1;
          if (currentPattern.pattern) {
            currentPattern.pattern.lastIndex = 0;
          }
        }

        parts.push({ children: textLeft });

        newParts.push(...parts);
      });

      parsedTexts = newParts;
    });

    parsedTexts.forEach((parsedText) => delete parsedText.match);

    return parsedTexts.filter((t) => !!t.children);
  };

  const getMatchedPart = (
    matchedPattern: PatternShape,
    textPart: string,
    matches: RegExpExecArray,
    index: number
  ) => {
    const props: { [key: string]: any } = {};

    Object.keys(matchedPattern).forEach((key) => {
      if (
        key === "pattern" ||
        key === "renderText" ||
        key === "matchCountLimit"
      ) {
        return;
      }
      //@ts-ignore
      if (typeof matchedPattern[key] === "function") {
        //@ts-ignore
        props[key] = () => matchedPattern[key]?.(textPart, index);
      } else {
        //@ts-ignore
        props[key] = matchedPattern[key];
      }
    });

    let children = textPart;
    if (
      matchedPattern.renderText &&
      typeof matchedPattern.renderText === "function"
    ) {
      children = matchedPattern.renderText(textPart, matches);
    }

    return {
      ...props,
      children: children,
      match: true,
    };
  };

  return { patterns: parsedPatterns, getMatchedPart };
};
