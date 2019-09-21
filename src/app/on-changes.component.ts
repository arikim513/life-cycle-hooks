import { Component, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";

class Hero {
    constructor(public name: string) { }
}

@Component({
    selector: 'on-changes',
    template:`
        <div class="hero">
            <p>{{hero.name}} can {{power}}</p>
            <h4>-- Change Log --</h4>
            <div *ngFor="let chg of changeLog">{{chg}}</div>
        </div>
    `,
    styles: [
        '.hero {background: LightYellow; padding: 8px; margin-top: 8px}',
        'p {background: Yellow; padding: 8px; margin-top: 8px}'
    ]
})
export class OnChangesComponent implements OnChanges{
    @Input() hero: Hero;
    @Input() power: string;

    changeLog: string[] = [];

    //Angular는 입력 프로퍼티 값이 변경되었을 때만 ngOnChangaes() 함수를 실행합니다. 
    //하지만 power프로퍼티와 달리 hero 프로퍼티는 객체가 전달되기 때문에 프로퍼티 값은 객체의 참조값으로 할당됩니다. 
    //그래서 hero 객체 안에 있는 name 값이 변경되는 것은 Angular가 신경쓰지 않습니다. 
    //객체가 인자로 전달될 때는 참조하는 주소 자체가 변경되지 않는 이상 값이 변경된 것으로 처리하지 않습니다.
    ngOnChanges(changes: SimpleChanges){
        for(let propName in changes){
            let chng = changes[propName];
            let cur = JSON.stringify(chng.currentValue);
            let prev = JSON.stringify(chng.previousValue);
            this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
        }

    }

    reset() { this.changeLog = []; }
}

@Component({
    selector: 'on-changes-parent',
    templateUrl: './on-changes-parent.component.html',
    styles: ['.parent {background: Lavender;}']
  })
export class OnChangesParentComponent {
    hero: Hero;
    power: string;
    title = 'OnChanges';
    //@ViewChild 부모컴퍼넌트가 자식컴퍼넌트의 상태를 변경하기
    //자식컴퍼넌트의 상태에 접근하고 수정할 수 있음
    @ViewChild(OnChangesComponent, {static:false}) childView: OnChangesComponent;
    
    constructor() {
        this.reset();
    }

    reset(){
        // new Hero object every time
        // triggers onChanges
        this.hero = new Hero('Windstorm');
        // setting power only triggers onChanges if this value is different
        this.power = 'sing';
        if (this.childView) { this.childView.reset(); }
    }
}