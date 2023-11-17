/// <reference types="react" />
import type { StoryObj } from "@storybook/react";
declare const meta: {
    title: string;
    component: import("react").FC<import("../components/ParsedText/ParsedText").ParsedTextProps>;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const AllOptions: Story;
export declare const EmailType: Story;
export declare const URLType: Story;
export declare const CurlyBracketsPattern: Story;
export declare const SquareBracketsPattern: Story;
export declare const CustomPattern: Story;
