import { AfterViewInit, AfterViewChecked, ViewChild, Component } from "@angular/core";

import { LoggerService } from "./logger.service";

@Component({
    selector: 'app-child-view',
    template: '<input [(ngModel)]="hero">'
  })
export class ChildViewComponent {
    hero = 'Magneta';
}

@Component({
    selector: 'after-view',
    template: `
      <div>-- child view begins --</div>
        <app-child-view></app-child-view>
      <div>-- child view ends --</div>`
     + `
      <p *ngIf="comment" class="comment">
        {{comment}}
      </p>
    `
  })
export class AfterViewComponent implements  AfterViewChecked, AfterViewInit {
    private prevHero = '';
    @ViewChild(ChildViewComponent, {static: false}) viewChild: ChildViewComponent;
    
    constructor(private logger: LoggerService) {
        this.logIt('AfterView constructor');
    }

    private logIt(method: string){
        let child = this.viewChild;
        let message = `${method}: ${child ? child.hero : 'no'} child view`;
        this.logger.log(message);
    }

    ngAfterViewInit() {
        // viewChild는 뷰가 모두 초기화된 이후에 값이 할당됩니다.
        this.logIt('AfterViewInit');
        this.doSomething();
      }

    ngAfterViewChecked() {
    // 뷰에서 변화감지 로직이 동작하면 viewChild가 갱신됩니다.
    if (this.prevHero === this.viewChild.hero) {
        this.logIt('AfterViewChecked (no change)');
    } else {
        this.prevHero = this.viewChild.hero;
        this.logIt('AfterViewChecked');
        this.doSomething();
    }
    }

    comment = '';

    // 동작을 확인하기 위해 `comment` 값을 변경해 봅니다.
    private doSomething() {
        let c = this.viewChild.hero.length > 10 ? `That's a long name` : '';
        if (c !== this.comment) {
        // 컴포넌트의 뷰는 방금 검사를 마쳤기 때문에 한 싸이클 뒤에 실행합니다.
        this.logger.tick_then(() => this.comment = c);
        }
    }
}

@Component({
    selector: 'after-view-parent',
    template: `
    <div class="parent">
      <h2>AfterView</h2>
  
      <after-view  *ngIf="show"></after-view>
  
      <h4>-- AfterView Logs --</h4>
      <p><button (click)="reset()">Reset</button></p>
      <div *ngFor="let msg of logger.logs">{{msg}}</div>
    </div>
    `,
    styles: ['.parent {background: burlywood}'],
    providers: [LoggerService]
  })
export class AfterViewParentComponent {
    show = true;
  
    constructor(public logger: LoggerService) {
    }
  
    reset() {
      this.logger.clear();
      // quickly remove and reload AfterViewComponent which recreates it
      this.show = false;
      this.logger.tick_then(() => this.show = true);
    }
}