import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { ParsedText, ParsedTextProps } from "./ParsedText";

const DEFAULT_TEXT_VALUE = "Lorem ipsum dolor sit amet";
const MOCK_ON_PRESS = jest.fn();
const DEFAULT_TEXT_TEST_ID = "DEFAULT_TEXT_TEST_ID";

type SetupParams = {
  props?: ParsedTextProps;
  text?: string;
};

describe("Testing ParsedText component", () => {
  const defaultProps: ParsedTextProps = {
    patterns: [
      { type: "email", style: { color: "blue" }, testID: "emailTestID" },
      {
        type: "url",
        style: { color: "green" },
        onClick: MOCK_ON_PRESS,
        testID: "urlTestID",
      },
      {
        type: "curlyBrackets",
        style: { fontSize: 24, fontWeight: "bold" },
        testID: "curlyBracketsTestID",
      },
      {
        type: "squareBrackets",
        style: { fontWeight: "bold", fontStyle: "italic" },
        testID: "squareBracketsTestID",
      },
    ],
    testID: DEFAULT_TEXT_TEST_ID,
  };

  const setup = ({ props, text = DEFAULT_TEXT_VALUE }: SetupParams) => (
    <ParsedText {...defaultProps} {...props}>
      {text}
    </ParsedText>
  );

  it("Should render correctly", () => {
    const { getByText, getByTestId } = render(setup({}));

    expect(getByText(DEFAULT_TEXT_VALUE)).toBeTruthy();
    expect(getByTestId(DEFAULT_TEXT_TEST_ID)).toBeTruthy();
  });

  it("Should render custom styling for url pattern type", () => {
    const text = "https://www.testing.com";

    const { getByTestId } = render(setup({ text }));

    expect(getByTestId("urlTestID")).toBeTruthy();
    expect(getByTestId("urlTestID")).toHaveStyle({ color: "green" });
  });

  it("Should render custom styling for email pattern type", () => {
    const text = "test@email.com";

    const { getByTestId } = render(setup({ text }));

    expect(getByTestId("emailTestID")).toBeTruthy();
    expect(getByTestId("emailTestID")).toHaveStyle({ color: "blue" });
  });

  it("Should render custom styling for curlyBrackets pattern type", () => {
    const text = "{testing}";

    const { getByTestId } = render(setup({ text }));

    expect(getByTestId("curlyBracketsTestID")).toBeTruthy();
    expect(getByTestId("curlyBracketsTestID")).toHaveStyle({
      fontSize: 24,
      fontWeight: "bold",
    });
  });

  it("Should render custom styling for squareBrackets pattern type", () => {
    const text = "this is a [test]!";

    const { getByTestId } = render(setup({ text }));

    expect(getByTestId("squareBracketsTestID")).toBeTruthy();
    expect(getByTestId("squareBracketsTestID")).toHaveStyle({
      fontWeight: "bold",
      fontStyle: "italic",
    });
  });

  it("Should render custom styling for a custom pattern", () => {
    const text = "this is a |test|";
    const textTestID = "textTestID";
    const pipeTextTestID = "pipePatternTestID";
    const props: ParsedTextProps = {
      patterns: [
        {
          pattern: /\|(.*?)\|/,
          renderText: (matchingString: string) =>
            matchingString.replace(/\|/g, "").replace(/}/g, ""),
          testID: pipeTextTestID,
          style: { color: "purple" },
        },
      ],
      testID: textTestID,
    };

    const { getByTestId } = render(setup({ text, props }));

    expect(getByTestId(textTestID)).toBeTruthy();
    expect(getByTestId(pipeTextTestID)).toBeTruthy();
    expect(getByTestId(textTestID)).not.toHaveStyle({ color: "purple" });
    expect(getByTestId(pipeTextTestID)).toHaveStyle({ color: "purple" });
  });

  it("Should render multiple patterns styles", () => {
    const text =
      "This is {a} multiple [testing] testing@email.com https://testingurl.com.br";

    const { getByTestId } = render(setup({ text }));

    expect(getByTestId("curlyBracketsTestID")).toHaveStyle({
      fontSize: 24,
      fontWeight: "bold",
    });
    expect(getByTestId("squareBracketsTestID")).toHaveStyle({
      fontWeight: "bold",
      fontStyle: "italic",
    });
    expect(getByTestId("emailTestID")).toHaveStyle({ color: "blue" });
    expect(getByTestId("urlTestID")).toHaveStyle({ color: "green" });
  });

  it("Should render with empty patterns prop", () => {
    const text = "This is test";

    const { getByText } = render(
      setup({ text, props: { patterns: undefined } })
    );

    expect(getByText(text)).toBeTruthy();
  });
});
