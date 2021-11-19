import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
    @Input() boardTitle: string = "";
    @Input() boardFavorite: boolean = false;
    @Input() boardBackgroundColor: string = "";
    @Input() boardBackgroundImage: string = "";

    constructor() { }

    ngOnInit(): void {
    }

}
