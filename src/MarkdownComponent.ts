import { Markdown } from "@davetheitguy/markdown-formatter";

/**
 * The configuration for the markdown previewer
 */
interface MarkdownConfig {
    default?: string;
}

/**
 * A simple markdown previewer
 */
export default class MarkdownComponent {
    /**
     * Create a new markdown previewer
     * @param input The input element to watch for changes
     * @param preview The element to render the markdown in
     * @param config The configuration for the markdown previewer
     */
    constructor(
        input: HTMLInputElement | HTMLTextAreaElement,
        preview: HTMLElement,
        private config: MarkdownConfig = {}
    ) {
        this.initMarkdown(input, preview);
    }

    /**
     * Render the input as markdown
     * @param input The input to render as markdown
     * @returns The rendered markdown, or the default as defined in the config
     */
    renderMarkdown(input?: string): string {
        console.log("Input", input);
        if (!input || input.length === 0) {
            return this.config.default ?? '<p class="text-info">Nothing to preview!</p>';
        }
        const element = document.createElement("span");
        element.innerHTML = input.replace(/[\n\r]+/, "\n\n");
        const mdEncoded = element.innerHTML;
        return Markdown`${mdEncoded}`;
    }

    /**
     * Initialize the markdown previewer
     * @param input The input element to watch for changes
     * @param preview The element to render the markdown in
     */
    private initMarkdown(input: HTMLInputElement | HTMLTextAreaElement, preview: HTMLElement) {
        const markdownText = input.value;
        const htmlText = this.renderMarkdown(markdownText as string);
        preview.innerHTML = htmlText;

        input.addEventListener("keyup", () => {
            const markdownText = input.value;
            const htmlText = this.renderMarkdown(markdownText as string);
            preview.innerHTML = htmlText;
        });
    }
}
