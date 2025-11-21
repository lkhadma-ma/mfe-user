import { Injectable } from '@angular/core';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {

  constructor() {
    // Configure marked: GitHub Flavored Markdown + line breaks
    marked.setOptions({
      gfm: true,
      breaks: true
    });

    // Optional: customize sanitizer to allow only safe attributes
    DOMPurify.setConfig({
      USE_PROFILES: { html: true },
      FORBID_TAGS: ['style', 'iframe', 'object', 'embed','a'],
      FORBID_ATTR: ['style', 'onerror', 'onclick']
    });
  }

  /**
   * Converts markdown string to sanitized HTML
   * @param markdown Markdown text
   * @returns Safe HTML string
   */
  toSafeHtml(markdown: string): string {
    const rawHtml = marked.parse(markdown ?? '');
    return DOMPurify.sanitize(rawHtml as string);
  }
}
