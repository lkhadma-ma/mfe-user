import { CUSTOM_ELEMENTS_SCHEMA, Component, HostBinding, OnInit, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import '@github/markdown-toolbar-element'
import { TextFieldModule } from "@angular/cdk/text-field";
@Component({
  selector: 'markdown-editor',
  imports: [ReactiveFormsModule, TextFieldModule],
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MarkdownEditorComponent implements OnInit {

  controlId!: string
  setTimeOut: any;
  control = input.required<FormControl>();
  leaveEvent = output<void>();

  @HostBinding('class.focus') isFocus!: boolean;  

  constructor() { }

  ngOnInit(): void {
    this.controlId = `MarkdownEditor-${Math.floor(100000 * Math.random())}`;
    this.control = this.control ?? new FormControl();
  }

  focus() {
    clearTimeout(this.setTimeOut);
    this.isFocus = true;
  }

  blur() {
    this.isFocus = false;
    this.setTimeOut = setTimeout(() => {
      this.leaveEvent.emit();
    }, 2000);
  }

}
