import type { PatternShape, TextProps, ParseTextFnParams } from "../types";

export const parseText = ({ text, patterns }: ParseTextFnParams) => {
  const matchPatterns = () => {
    let parsedTexts: Array<TextProps> = [{ children: text }];

    patterns.forEach((currentPattern) => {
      const parts: TextProps[] = [];

      parsedTexts.forEach((parsedText) => {
        if (parsedText.match) {
          parts.push(parsedText);
          return;
        }

        let remainingText = parsedText.children;

        let matches: RegExpExecArray | null | undefined;
        if (currentPattern.pattern) {
          currentPattern.pattern.lastIndex = 0;
        }

        while (
          remainingText &&
          (matches = currentPattern.pattern?.exec(remainingText))
        ) {
          const matchStartIndexPosition = matches.index;
          const matchEndIndexPosition = matches[0].length;

          /** Gets the text before the match with regexp */
          const textBeforeMatch = remainingText.substring(0, matches.index);

          /** Adds to the array the substring that is before the matched part with the current pattern */
          parts.push({ children: textBeforeMatch });

          /** Adds the substring that matches with current pattern */
          parts.push(
            formatMatchedSubstring(currentPattern, matches[0], matches)
          );

          /** Gets the text after the match with regexp */
          remainingText = remainingText.substring(
            matchStartIndexPosition + matchEndIndexPosition
          );
        }

        /** Adds the remaining text that does not match with current pattern */
        parts.push({ children: remainingText });
      });

      parsedTexts = parts;
    });

    /** It deletes the match property from parsedText and filters the array returning only objects that has a truthy children */
    return parsedTexts
      .map((parsedText) => (delete parsedText.match, parsedText))
      .filter((t) => !!t.children);
  };

  const formatMatchedSubstring = (
    matchedPattern: PatternShape,
    textPart: string,
    matches: RegExpExecArray
  ) => {
    const { pattern, renderText, ...propsRest } = matchedPattern;

    const formatedText = renderText?.(textPart, matches) || textPart;

    return {
      ...propsRest,
      children: formatedText,
      match: true,
    };
  };

  return matchPatterns();
};
