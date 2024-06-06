import MarkdownComponent from "./MarkdownComponent";
import {describe, it, expect} from "@jest/globals";

declare global {
    interface Window {
        $: JQueryStatic;
    }
}

window.$ = window.$ || require("jquery");

describe("MarkdownComponent", () => {
    it("should render the default message when no input is provided", () => {
        // Arrange
        const input = $("<textarea>") as JQuery<HTMLTextAreaElement>;
        const preview = $("<div>");
        new MarkdownComponent(input, preview, { default: "Hello, World!" });
        expect(preview.html()).toBe("Hello, World!");
    });

    it("should render the default message when an empty string is provided", () => {
        // Arrange
        const input = $("<textarea>").val("") as JQuery<HTMLTextAreaElement>;
        const preview = $("<div>");
        new MarkdownComponent(input, preview, { default: "Hello, World!" });
        expect(preview.html()).toBe("Hello, World!");
    });

    it("should render the input as markdown", () => {
        // Arrange
        const input = $("<textarea>").val("# Hello, World!") as JQuery<HTMLTextAreaElement>;
        const preview = $("<div>");
        new MarkdownComponent(input, preview);
        expect(preview.html()).toBe("<h1>Hello, World!</h1>");
    });
});
