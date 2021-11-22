import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { TrelloService } from "../../../services/trello.service";

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
    title = 'Rokllo';
    myBoards: any = [];

    constructor(
        private trelloService: TrelloService
    ) { }

    ngOnInit() {
        this.fetchAllBoards();
    }

    // Fetch all user boards
    fetchAllBoards() {
        this.trelloService.getAllBoards()
            .pipe(filter(x => !!x))
            .subscribe(boards => {
                if (boards) {
                    console.log(boards);
                    this.myBoards = boards;
                } else {
                    this.myBoards = [];
                }
            });
    }
}
