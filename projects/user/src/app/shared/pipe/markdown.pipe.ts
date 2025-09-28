
import { Pipe, PipeTransform } from '@angular/core';
import { MarkdownService } from '@shared/util/markdown.service';

@Pipe({
  name: 'markdown',
  standalone: true,
})
export class MarkdownPipe implements PipeTransform {
  constructor(private markdownService: MarkdownService) {}

  transform(value: string): string {
    return this.markdownService.toSafeHtml(value);
  }
}
