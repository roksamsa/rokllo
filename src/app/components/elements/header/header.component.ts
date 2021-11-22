import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { TrelloService } from "../../../services/trello.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(
        private trelloService: TrelloService
    ) { }

    ngOnInit(): void {
        this.getUserData;
    }

    getUserData(): void {
        this.trelloService.getUserDataTest().subscribe(userData => {
            console.log(userData);
        });
    }

}
