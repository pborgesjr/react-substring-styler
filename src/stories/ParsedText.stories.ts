import type { Meta, StoryObj } from "@storybook/react";

import { ParsedText } from "../components";

const meta = {
  title: "Components/ParsedText",
  component: ParsedText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ParsedText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllOptions: Story = {
  args: {
    children:
      "Make sure to send an email to testing@email.com or access our website https://www.testing.com if have any {trouble} using our [code].",
    patterns: [
      { type: "email", style: { color: "blue" }, testID: "emailTestID" },
      {
        type: "url",
        style: { color: "green" },
        testID: "urlTestID",
      },
      {
        type: "curlyBrackets",
        style: { fontSize: 16, fontWeight: "bold" },
        testID: "curlyBracketsTestID",
      },
      {
        type: "squareBrackets",
        style: {
          fontWeight: "bold",
          fontStyle: "italic",
          color: "purple",
          fontSize: 24,
        },
        testID: "squareBracketsTestID",
      },
    ],
  },
};
export const EmailType: Story = {
  args: {
    children: "this is a email@testing.com custom style",
    patterns: [
      { type: "email", style: { color: "blue" }, testID: "emailTestID" },
    ],
  },
};

export const URLType: Story = {
  args: {
    children: "this is url https://www.testing.com custom style",
    patterns: [
      {
        type: "url",
        style: { color: "green" },
      },
    ],
  },
};

export const CurlyBracketsPattern: Story = {
  args: {
    children: "this text is using the {curly brackets pattern} to style",
    patterns: [
      {
        type: "curlyBrackets",
        style: { fontSize: 16, fontWeight: "bold" },
      },
    ],
  },
};

export const SquareBracketsPattern: Story = {
  args: {
    children: "this text is using the [square brackets pattern] to style",
    patterns: [
      {
        type: "squareBrackets",
        style: {
          fontWeight: "bold",
          fontStyle: "italic",
          color: "purple",
          fontSize: 24,
        },
      },
    ],
  },
};

export const CustomPattern: Story = {
  args: {
    children: "this text is using the |custom pattern| to style",
    patterns: [
      {
        pattern: /\|(.*?)\|/,
        renderText: (matchingString: string) =>
          matchingString.replace(/\|/g, "").replace(/}/g, ""),
        style: {
          fontWeight: "bolder",
          color: "cyan",
          fontSize: 24,
        },
      },
    ],
  },
};
