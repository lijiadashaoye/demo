import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navList = [];
  hasOpen = null;
  hasShouQi = false;
  mouseData = {};
  navWidth = 180;
  navHeight = 30;
  addNewPoint = false;  // 添加新坐标
  pointList = [];   // 记录有多少坐标
  upImg = '';  // 暂存选择的本地图片

  constructor(private elem: ElementRef, private rd: Renderer2) { }

  ngOnInit(): void {
    this.navList = [
      {
        icon: 'iconwenjianjia',
        name: 'Event',
        open: true,
        children: [
          {
            icon: 'iconkaishi',
            name: 'Start',
          },
          {
            icon: 'iconkaishi',
            name: 'End',
          }
        ]
      },
      {
        icon: 'iconwenjianjia',
        name: 'Task',
        open: false,
        children: [
          {
            icon: 'iconkaishi',
            name: 'User Task',
          },
          {
            icon: 'iconkaishi',
            name: 'Service Task',
          },
          {
            icon: 'iconkaishi',
            name: 'Script Task',
          },
          {
            icon: 'iconkaishi',
            name: 'Mail Task',
          },
          {
            icon: 'iconkaishi',
            name: 'Receive Task',
          },
          {
            icon: 'iconkaishi',
            name: 'Business Rule Task',
          },
          {
            icon: 'iconkaishi',
            name: 'SubProcess',
          },
          {
            icon: 'iconkaishi',
            name: 'CallActivity',
          }
        ]
      },
      {
        icon: 'iconwenjianjia',
        name: 'Gateway',
        open: false,
        children: [
          {
            icon: 'iconkaishi',
            name: 'ParallelGateway',
          },
          {
            icon: 'iconkaishi',
            name: 'ExclusiveGateway',
          }
        ]
      },
      {
        icon: 'iconwenjianjia',
        name: 'Boundary event',
        open: false,
        children: [
          {
            icon: 'iconkaishi',
            name: 'TimerBoundaryEvent',
          },
          {
            icon: 'iconkaishi',
            name: 'ErrorBoundaryEvent',
          }
        ]
      }
    ]
    this.pointList.push('/assets/earth.png')
    this.pointList.push('/assets/moon.png')
  }
  // 切换导航的开闭
  toOpen(item) {
    let kk = item.open;
    this.navList.forEach(item => item.open = false);
    if (kk) {
      item.open = false
    } else {
      item.open = true
    }

  }
  // 左侧导航的收缩
  shouqi(target) {
    this.hasShouQi = !this.hasShouQi;
    if (this.hasShouQi) {
      target.style = 'width:30px;background:rgb(104, 156, 253)';
    } else {
      target.style = 'width:180px'
    }
  }
  // 监听鼠标左键点击
  mousedownEvent(e, huabu) {
    if (e.which === 1) {
      this.mouseData['down'] = {  // 算出当前鼠标的坐标
        type: e.target.dataset.mark,   // 记录点击的是哪个
        left: e.clientX - this.navWidth,  // 记录被点击的元素的x
        top: e.clientY - this.navHeight, // 记录被点击的元素的y
        offsetX: e.offsetX, // 记录被点击的offsetX
        offsetY: e.offsetY,
        target: e.target.dataset.mark === 'wap' ? e.target.parentElement : e.target, // 被点击的元素
        huabu: huabu  // 整个画布
      }
      if (e.target.dataset.mark === 'point') {
        let mouse = this.mouseData['down'];
        this.rd.setStyle(mouse.target, 'opacity', '0.01');

        // 创建线
        let line = this.rd.createElement('span');
        this.mouseData['down'].line = line;
        this.rd.appendChild(mouse.huabu, line);

      }
    }
  }
  // 监听鼠标左键的抬起
  mouseupEvent() {
    let mouse = this.mouseData['down'];
    if (mouse && mouse.type === 'point') {
      this.rd.setStyle(mouse.target, 'opacity', '1');
    }
    delete this.mouseData['down'];
  }
  // 监听鼠标移动
  mousemoveEvent(e) {
    let mouse = this.mouseData['down'];
    if (mouse) {
      if (mouse.type === 'wap') {
        let left = e.clientX - this.navWidth - mouse.offsetX;
        let top = e.clientY - this.navHeight - mouse.offsetY;
        mouse.target.style = `left:${left}px;top:${top}px;`
      }
    }
  }

  addNew() {
    this.addNewPoint = true
  }
  // 使用 FileReader 动态显示图片
  seefile1(e) {
    var file = e.target.files[0];
    var ele = this.elem.nativeElement.querySelector("#ele");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event2: any) => {
      ele.style.backgroundImage = `url(${event2.target.result})`;
      ele.style.backgroundSize = `100% 100%`;
      this.upImg = event2.target.result;
    }
  }
  // 使用已选的图片
  useIt() {
    this.pointList.push(this.upImg);
    this.upImg = '';
    this.addNewPoint = false;
  }

}
