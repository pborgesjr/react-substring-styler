<h1 align='center'>
  :art: React Substring Styler :art:
</h1>

The `react-substring-styler` is a package designed to simplify the styling of substrings within a larger string in React applications. 
It enables developers to apply styles to specific substrings without breaking the structure of the overall text or resorting to manual numerous HTML text tags. It is also possible to apply **any** desired attribute from the `HTML` text element `<span>` to **any of the substrings**.

# Installation
Install the package using `npm`:

```bash
npm install react-substring-styler
```
or using `yarn`:

```bash
yarn add react-substring-styler
```

# Usage
The package provides a `<ParsedText>` component that accepts a `pattern` prop to specify the type of pattern, its associated styling, `testID` and any `<span>` default property for targeted **substrings**.

## Default patterns example

### Code
```javascript
import React from "react";
import { ParsedText, ParsedTextProps } from "react-substring-styler";

const DEFAULT_TEXT_VALUE =
  "Make sure to send an email to testing@email.com or access our website https://www.testing.com if have any {trouble} using our [code].";
const MOCK_ON_PRESS = () => console.log("onPress");
const DEFAULT_TEXT_TEST_ID = "DEFAULT_TEXT_TEST_ID";

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
      style: { fontSize: 16, fontWeight: "bold" },
      testID: "curlyBracketsTestID",
    },
    {
      type: "squareBrackets",
      style: { fontWeight: "bold", fontStyle: "italic", color: "purple", fontSize: 24 },
      testID: "squareBracketsTestID",
    },
  ],
  testID: DEFAULT_TEXT_TEST_ID,
};

const DefaultPatternsExample = () => {
  return <ParsedText {...defaultProps}>{DEFAULT_TEXT_VALUE}</ParsedText>;
};
```
### Preview
![image](https://github.com/pedropjr/react-substring-styler/assets/28986033/dc2f11be-6b7c-4b0e-92ba-6a730d73ca53)


## Custom pattern example

Developers can create custom patterns using the `<ParsedText>` component by defining a new pattern, its corresponding styling, and rendering behavior.

### Guidelines for Custom Patterns:
1. **Define Pattern**: Use a regular expression `RegExp` to define the pattern that identifies the substring to be styled;
2. **Render Text**: Implement the `renderText` function to modify the matched string as you wish before rendering;
3. **Styling**: Specify the desired style object to be applied to the matched substring.

Feel free to create multiple custom patterns by adding more objects to the `patterns` prop within the `<ParsedText>` component, allowing for versatile styling options within your strings.

### Code
```javascript
import React from "react";
import { ParsedText, ParsedTextProps } from "react-substring-styler";

const DEFAULT_TEXT_VALUE = "this text is using the |custom pattern| to style";

const defaultProps: ParsedTextProps = {
  patterns: [
    {
      pattern: /\|(.*?)\|/, // Define the regex pattern to match
      renderText: (matchingString: string) => 
        matchingString.replace(/\|/g, "").replace(/}/g, ""), // Define how the matched text should be rendered
      style: { color: "cyan", fontWeight: "bolder", fontSize: 24 }, // Define the style for the matched text
    },
  ],
};

const CustomPatternExample = () => {
  return <ParsedText {...defaultProps}>{DEFAULT_TEXT_VALUE}</ParsedText>;
};
```
### Preview
![image](https://github.com/pedropjr/react-substring-styler/assets/28986033/2d91394f-9bae-427a-bec1-b40dd2117874)

## Props

Prop | Description | Default
---- | ----------- | -------
`patterns` | Array of **patterns**, corresponding **styles**, `testID` or any attribute from the `<span>` element that will be applied to the corresponding substrings | [ ]
`testID` | Value that will be set for the whole `string` | `undefined`
`...rest` | You can set any `attribute` from the `<span>` element for the whole string |

### `<span>`
If you want to know more about the `<span>` element and its attributes, make sure to check the [Mozilla Doc](https://developer.mozilla.org/docs/Web/HTML/Element/span).

# Contributions
Contributions and feedback are welcome! Feel free to open issues or submit pull requests on the GitHub repository for this project.
