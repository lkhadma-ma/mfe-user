import { Injectable } from '@angular/core';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  constructor() {
    // Optional: configure marked to support GFM + line breaks
    marked.setOptions({
      gfm: true,
      breaks: true
    });
  }

  toSafeHtml(markdown: string): string {
    const rawHtml = marked.parse(markdown ?? '');
    return DOMPurify.sanitize(rawHtml as string, {
      USE_PROFILES: { html: true }
    });
  }
}
