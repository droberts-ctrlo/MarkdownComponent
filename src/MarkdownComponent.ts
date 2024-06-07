import { ElementOrJQueryElement, TOrJQuery } from "@davetheitguy/common";
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
        input: TOrJQuery<HTMLInputElement | HTMLTextAreaElement>,
        preview: ElementOrJQueryElement,
        private config: MarkdownConfig = {}
    ) {
        const inputAsJQ = $(input);
        const previewAsJQ = $(preview);
        this.initMarkdown(inputAsJQ, previewAsJQ);
    }

    /**
     * Render the input as markdown
     * @param input The input to render as markdown
     * @returns The rendered markdown, or the default as defined in the config
     */
    renderMarkdown(input?: string): string {
        console.log("Input",input);
        if (!input || input.length === 0) {
            return this.config.default ?? '<p class="text-info">Nothing to preview!</p>';
        }
        const mdEncoded = $('<span>').text(input.replace(/[\n\r]+/, "\n\n")).html();
        return Markdown`${mdEncoded}`;
    }

    /**
     * Initialize the markdown previewer
     * @param input The input element to watch for changes
     * @param preview The element to render the markdown in
     */
    private initMarkdown(input: JQuery<HTMLInputElement | HTMLTextAreaElement>, preview: JQuery<HTMLElement>) {
        $(() => {
            const markdownText = input.val();
            const htmlText = this.renderMarkdown(markdownText as string);
            preview.html(htmlText);

            input.on("keyup", () => {
                const markdownText = input.val();
                const htmlText = this.renderMarkdown(markdownText as string);
                preview.html(htmlText);
            });
        });
    }
}
