import { Component, OnInit } from '@angular/core';
import { TrelloService } from "../../../services/trello.service";
import { GlobalService } from "../../../services/global.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    currentBoardData: any = {};

    constructor(
        private trelloService: TrelloService,
        private globalService: GlobalService,
        public router: Router
    ) { }

    ngOnInit(): void {
        this.getUserData;
        this.globalService.boardData.subscribe(data => {
            this.currentBoardData = data
        });
    }

    getUserData(): void {
        this.trelloService.getUserData().subscribe(userData => {
            //console.log(userData);
        });
    }
}
