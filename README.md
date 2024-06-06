# Markdown Component

This component is user to provide a preview of markdown content.

## Usage

The default settings can be set in the following

```typescript
interface MarkdownConfig {
    default?: string; // The default message to display if there is nothing in the input
}
```
Creating a new instance of the component can be done as follows:

```javascript
import { MarkdownComponent } from '@davetheitguy/markdown';

new MarkdownComponent($('#input'),$('#preview'), {default: 'This is a default message'});
```
