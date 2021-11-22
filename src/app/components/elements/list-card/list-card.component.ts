import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-list-card',
    templateUrl: './list-card.component.html',
    styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit {
    @Output() clickActions = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    deleteCard() {
        this.clickActions.emit();
    }
}
