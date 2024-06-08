import { Markdown } from "@davetheitguy/markdown-formatter";
import MarkdownComponent from "./MarkdownComponent";
import {describe, it, expect} from "@jest/globals";

declare global {
    interface Window {
        $: JQueryStatic;
    }
}

window = window || global
window.$ = window.$ || require("jquery");

describe("MarkdownComponent", () => {
    it("should test current MarkDown render for correctness", ()=>{
        const input = "# hello";
        const result = Markdown`${input}`;
        expect(result).toBe("<h1>hello</h1>");
    });

    it("should render the default message when no input is provided", () => {
        // Arrange
        const input = $("<textarea>") as JQuery<HTMLTextAreaElement>;
        const preview = $("<div>");;
        const component = new MarkdownComponent(input, preview, { default: "Hello, World!" });
        expect(component.renderMarkdown()).toBe("Hello, World!");
    });

    it("should render the default message when an empty string is provided", () => {
        // Arrange
        const input = $("<textarea>").val("") as JQuery<HTMLTextAreaElement>;
        const preview = $("<div>");
        const component = new MarkdownComponent(input, preview, { default: "Hello, World!" });
        expect(component.renderMarkdown()).toBe("Hello, World!");
    });

    it("should render the input as markdown", () => {
        // Arrange
        const input = $("<textarea>").val("# Hello, World!") as JQuery<HTMLTextAreaElement>;
        const preview = $("<div>");
        const component = new MarkdownComponent(input, preview);
        expect(component.renderMarkdown("# Hello, World!")).toBe("<h1>Hello, World!</h1>");
    });
});
