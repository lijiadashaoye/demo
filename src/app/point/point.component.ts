import { Component, Renderer2, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.css']
})
export class PointComponent {
  @Input() ImageData;
  constructor(private elem: ElementRef, private rd: Renderer2) { }

  ngAfterViewInit(): void {
    let logo1 = this.elem.nativeElement.querySelector('.logo1');
    this.rd.setAttribute(logo1, 'style', `background-image:url('${this.ImageData}')`)
  }
}
