import React, { useRef } from "react";

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (
        e.indexOf(p[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(s, p[i])
      )
        t[p[i]] = s[p[i]];
    }
  return t;
}

typeof SuppressedError === "function"
  ? SuppressedError
  : function (error, suppressed, message) {
      var e = new Error(message);
      return (
        (e.name = "SuppressedError"),
        (e.error = error),
        (e.suppressed = suppressed),
        e
      );
    };

const textExtractionHelper = ({ text, patterns }) => {
  const patterns = () => {
    let parsedTexts = [{ children: text }];
    patterns.forEach((currentPattern) => {
      const newParts = [];
      const tmp = currentPattern.matchCountLimit || 0;
      const numberOfMatchesPermitted = Math.min(
        Math.max(Number.isInteger(tmp) ? tmp : 0, 0) ||
          Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY
      );
      let currentMatches = 0;
      parsedTexts.forEach((parsedText) => {
        var _a;
        if (parsedText.match) {
          newParts.push(parsedText);
          return;
        }
        const parts = [];
        let textLeft = parsedText.children;
        let indexOfMatchedString = 0;
        let matches;
        currentPattern.pattern.lastIndex = 0;
        while (
          textLeft &&
          (matches =
            (_a = currentPattern.pattern) === null || _a === void 0
              ? void 0
              : _a.exec(textLeft))
        ) {
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
          currentPattern.pattern.lastIndex = 0;
        }
        parts.push({ children: textLeft });
        newParts.push(...parts);
      });
      parsedTexts = newParts;
    });
    parsedTexts.forEach((parsedText) => delete parsedText.match);
    return parsedTexts.filter((t) => !!t.children);
  };
  const getMatchedPart = (matchedPattern, textPart, matches, index) => {
    const props = {};
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
        props[key] = () => {
          var _a;
          return (_a = matchedPattern[key]) === null || _a === void 0
            ? void 0
            : _a.call(matchedPattern, textPart, index);
        };
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
    return Object.assign(Object.assign({}, props), {
      children: children,
      match: true,
    });
  };
  return { patterns, getMatchedPart };
};

const PATTERNS = {
  url: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_\+\[\],.~#?&\/=]*[-a-zA-Z0-9@:%_\+\]~#?&\/=])*/i,
  phone: /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}/,
  email: /\S+@\S+\.\S+/,
  curlyBrackets: /\{(.*?)\}/,
  squareBrackets: /\[(.*?)\]/,
};

const ParsedText = (_a) => {
  var { patterns = [], childrenProps = [], style, children } = _a,
    rest = __rest(_a, ["patterns", "childrenProps", "style", "children"]);
  const textRef = useRef(null);
  const getPatterns = () => {
    return patterns?.map((option) => {
      const { type } = option,
        patternOption = __rest(option, ["type"]);
      if (type) {
        if (!PATTERNS[type]) {
          throw new Error(`${option.type} is not a supported type`);
        }
        patternOption.pattern = PATTERNS[type];
      }
      return patternOption;
    });
  };
  const renderParsedText = () => {
    if (!patterns || typeof children !== "string") {
      return children;
    }
    const textExtraction = textExtractionHelper({
      text: children,
      patterns: getPatterns(),
    });
    return textExtraction === null || textExtraction === void 0
      ? void 0
      : textExtraction.patterns().map((props, index) => {
          const { style: extractedTextStyle } = props,
            extractionRest = __rest(props, ["style"]);
          return React.createElement(
            "span",
            Object.assign(
              {
                key: `parsedText-${index}`,
                style: Object.assign(
                  Object.assign({}, style),
                  extractedTextStyle
                ),
              },
              childrenProps,
              extractionRest
            )
          );
        });
  };
  return React.createElement(
    "span",
    Object.assign({ ref: textRef, style: style }, rest),
    renderParsedText()
  );
};

export { PATTERNS, ParsedText, textExtractionHelper };
//# sourceMappingURL=index.js.map
