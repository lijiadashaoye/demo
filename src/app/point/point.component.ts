import { Component, Renderer2, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.css']
})
export class PointComponent {
  @Input() ImageData;
  @Input() mouseData;
  navWidth = 180;
  navHeight = 30;
  lengthArr = []
  constructor(private elem: ElementRef, private rd: Renderer2) { }

  ngAfterViewInit(): void {
    let logo1 = this.elem.nativeElement.querySelector('.logo1');
    this.rd.setAttribute(logo1, 'style', `background-image:url('${this.ImageData}')`);
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
  rotate = null;
  dragFn(e) {
    let x = Math.abs(e.layerX);
    let y = Math.abs(e.layerY);
    let num1, num2, width, jiaodu, mouse = this.mouseData['down'];

    if (e.layerX > 0) {
      num1 = true;  // 右边
    } else {
      num1 = false;  // 左边
    }

    if (e.layerY > 0) {
      num2 = true;  // 下边
    } else {
      num2 = false;   // 上边
    }

    width = Math.sqrt(x * x + y * y);  // y

    if (num1 && num2) {  // 右下
      jiaodu = Math.atan(y / x)
    } else if (!num1 && num2) {  // 左下
      jiaodu = Math.atan(y / x)
    } else if (num1 && !num2) {  // 右上
      jiaodu = Math.atan(x / y)
    } else { // 左上
      jiaodu = Math.atan(x / y)
    }
    this.rotate = 180 * (jiaodu / 2);

    this.lengthArr.push(this.rotate);

    if (this.lengthArr.length > 1) {
      this.rd.setAttribute(mouse.line, 'style', `
      position:absolute;top:${mouse.top - 3}px;
      left:${mouse.left - 3}px;
      transform:rotate(${this.lengthArr[this.lengthArr.length - 2]}deg);transform-origin: left center;
      display:inline-block;border-top:2px solid;width:${width > 0 ? width : 0}px`);
      if (this.lengthArr.length > 100) {
        this.lengthArr = this.lengthArr.slice(99)
      }
    }
  }

}
