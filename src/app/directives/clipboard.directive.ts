import { Directive, HostListener, Input } from '@angular/core';
import { ClipboardService } from '../services/clipboard.service';

@Directive({
    selector: '[appClipboardDirective]',
    providers: [ClipboardService]
})
export class ClipboardDirective {
    @Input() clipboardTxt: string;
    constructor(
        public clip: ClipboardService
    ) { }

    @HostListener('click', ['$event']) onClick($event) {
        if (!this.clipboardTxt) {
            return;
        }
        this.clip.clip(this.clipboardTxt);
    }
}
