import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { TrelloService } from "../../../services/trello.service";
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-board-page',
    templateUrl: './board-page.component.html',
    styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
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

    arrayMove(array: any, fromIndex: number, toIndex: number) {
        var element = array[fromIndex];
        array.splice(fromIndex, 1);
        array.splice(toIndex, 0, element);
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
                    console.log(this.boardData);
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
                    console.log(this.listsInBoard);
                } else {
                    this.listsInBoard = [];
                }
            });
    }

    drop(event: CdkDragDrop<string[]>) {
        console.log(event);
        console.log(this.listsInBoard);
        //this.arrayMove(this.listsInBoard, event.previousIndex, event.currentIndex);
        moveItemInArray(this.listsInBoard, event.previousIndex, event.currentIndex);
    }
}
