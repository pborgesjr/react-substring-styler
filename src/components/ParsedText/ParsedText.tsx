import React, { useRef } from "react";
import { textExtractionHelper } from "../../utils";
import { PatternShape, TextProps } from "../../types";
import { PATTERNS } from "../../constants";

export interface ParsedTextProps extends TextProps {
  patterns?: PatternShape[];
  childrenProps?: TextProps;
}

export const ParsedText: React.FC<ParsedTextProps> = ({
  patterns = [],
  childrenProps = [],
  style,
  children,
  testID,
  ...rest
}) => {
  const textRef = useRef(null);

  const getPatterns = () => {
    return patterns?.map((option) => {
      const { type, ...patternOption } = option;
      if (type) {
        if (!PATTERNS[type].pattern) {
          throw new Error(`${option.type} it is not a default supported type.`);
        }
        patternOption.pattern = PATTERNS[type].pattern;
        patternOption.renderText = PATTERNS[type].renderText;
      }

      return patternOption;
    });
  };

  const renderParsedText = () => {
    if (!patterns || typeof children !== "string" || patterns.length === 0) {
      return children;
    }

    const textExtraction = textExtractionHelper({
      text: children,
      patterns: getPatterns(),
    });

    return textExtraction?.patterns().map((props, index) => {
      const { style: extractedTextStyle, testID, ...extractionRest } = props;

      return (
        <span
          key={`parsedText-${index}`}
          style={{ ...style, ...extractedTextStyle }}
          data-testid={testID}
          {...childrenProps}
          {...extractionRest}
        />
      );
    });
  };

  return (
    <span ref={textRef} style={style} data-testid={testID} {...rest}>
      {renderParsedText()}
    </span>
  );
};
