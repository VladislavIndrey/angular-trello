import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[blueInput]',
  standalone: true
})
export class BlueInputDirective {

  constructor(private input: ElementRef) {
    this.input.nativeElement.style.outline = 'none';
    this.input.nativeElement.style.width = '100%';
    this.input.nativeElement.style.border = '0.8px solid var(--button-color-primary)';
    this.input.nativeElement.style.boxShadow = 'var(--input-shadow-color)';
    this.input.nativeElement.style.borderRadius = '8px';
  }

}
