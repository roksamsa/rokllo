import { AfterViewInit, Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { TrelloService } from "../../../services/trello.service";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-board-page',
    templateUrl: './board-page.component.html',
    styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit, AfterViewInit {
    boardData: any = [];
    listsInBoard: any = [];
    boardBackgroundImage: string = "";

    constructor(
        private route: ActivatedRoute,
        private trelloService: TrelloService
    ) { }

    ngOnInit() {
        this.getBoardData();
    }

    ngAfterViewInit() {
    }

    getBoardData(): void {
        const id = this.route.snapshot.paramMap.get('id');
        console.log(id)

        if (id !== null) {
            this.fetchBoardIdData(id);
            this.fetchAllListsFromThisBoard(id);
        }
    }

    // Fetch all user boards
    fetchBoardIdData(boardId: string) {
        this.trelloService.getBoardWithId(boardId)
            .pipe(filter(x => !!x))
            .subscribe(board => {
                if (board) {
                    this.boardData = board;
                } else {
                    this.boardData = [];
                }
            });
    }

    // Fetch all user boards
    fetchAllListsFromThisBoard(boardId: string) {
        console.log(boardId)
        this.trelloService.getAllListsFromBoardWithId(boardId)
            .pipe(filter(x => !!x))
            .subscribe(boards => {
                if (boards) {
                    this.listsInBoard = boards;
                    console.log(boards)
                } else {
                    this.listsInBoard = [];
                }
            });
    }
}
