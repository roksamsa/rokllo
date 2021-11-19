import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { TrelloService } from "../../../services/trello.service";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-board-page',
    templateUrl: './board-page.component.html',
    styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
    listsInBoard: any = {};

    constructor(
        private route: ActivatedRoute,
        private trelloService: TrelloService
    ) { }

    ngOnInit() {
        this.getBoardData();
    }

    getBoardData(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id !== null) {
            this.fetchAllLists(id);
        }
    }

    // Fetch all user boards
    fetchAllLists(boardId: string) {
        this.trelloService.getBoardWithId(boardId)
            .pipe(filter(x => !!x))
            .subscribe(boards => {
                if (boards) {
                    console.log(boards);
                    this.listsInBoard = boards;
                } else {
                    this.listsInBoard = [];
                }
            });
    }
}
