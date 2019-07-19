import { Component, Renderer2, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.css']
})
export class PointComponent {
  @Input() ImageData;
  @Input() mouseData;
  constructor(private elem: ElementRef, private rd: Renderer2) { }

  ngAfterViewInit(): void {
    let logo1 = this.elem.nativeElement.querySelector('.logo1');
    this.rd.setAttribute(logo1, 'style', `background-image:url('${this.ImageData}')`)
  }

  dropFn(e) {
    e.preventDefault();
    this.rd.removeClass(e.target, 'seeBorder');
    let mouse = this.mouseData['down'];
    if (mouse && mouse.type === 'point') {
      this.rd.setStyle(mouse.target, 'opacity', '1');
      this.rd.removeClass(mouse.target, 'seeBorder');
    }
    this.mouseData['down'].addBorder = false;
  }
  dragoverFn(e) {
    e.preventDefault()
    this.rd.addClass(e.target, 'seeBorder');
    this.mouseData['down'].addBorder = true;
  }
  dragleaveFn(e) {
    e.preventDefault();
    this.rd.removeClass(e.target, 'seeBorder');
    let mouse = this.mouseData['down'];
    if (mouse && mouse.type === 'point') {
      this.rd.removeClass(mouse.target, 'seeBorder');
    }
    this.mouseData['down'].addBorder = false;
  }
  ondragendFn(e) {
    if (!this.mouseData['down'].addBorder) {
      this.rd.setStyle(this.mouseData['down'].target, 'opacity', '1');
    }
  }
}
