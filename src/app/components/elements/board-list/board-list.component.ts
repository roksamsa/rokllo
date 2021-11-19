import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-board-list',
    templateUrl: './board-list.component.html',
    styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit {
    @Input() boardListTitle: string = "";

    constructor() { }

    ngOnInit(): void {
    }

}
