import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[appDoubleClick]'
})
export class DoubleClickDirective {
    @Output('appDoubleClick') doubleClickListener = new EventEmitter();
    times = 0;

    constructor() { }

    @HostListener('dblclick') onDoubleClicked() {
        console.log('onDoubleClicked ran!');
        this.doubleClickListener.emit();
    }

}