import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { filter } from 'rxjs/operators';
import { TrelloService } from "../../../services/trello.service";
import { GlobalService } from '../../../services/global.service';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-board-page',
    templateUrl: './board-page.component.html',
    styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
    boardData: any = [];
    listsInBoard: any = [];
    thisBoardId: string = "";
    boardBackgroundImage: string = "";
    isAddNewListAreaVisible: boolean = false;
    @ViewChild('textareaInput', { static: false }) textareaInput: ElementRef<HTMLInputElement> = {} as ElementRef;

    constructor(
        private cdRef: ChangeDetectorRef,
        private route: ActivatedRoute,
        private trelloService: TrelloService,
        private globalService: GlobalService
    ) { }

    ngOnInit() {
        this.getBoardData();
    }

    toggleAddNewListArea() {
        this.isAddNewListAreaVisible = !this.isAddNewListAreaVisible;
        this.cdRef.detectChanges();
        this.textareaInput.nativeElement.focus();
    }

    addNewList(
        listName: string,
        boardListId: string,
        position: any): void {
        this.trelloService.addNewListToBoardWithId(
            listName,
            boardListId,
            position).subscribe(() => {
                console.log('List added');
                this.isAddNewListAreaVisible = false;
                this.fetchAllListsFromThisBoard(this.thisBoardId);
            });
    }

    updateList(
        boardListId: string,
        params: any): void {
        this.trelloService.updateListWithId(
            boardListId,
            params).subscribe(board => {
                console.log(board);
                this.fetchAllListsFromThisBoard(this.thisBoardId);
            });
    }

    getBoardData(): void {
        this.thisBoardId = this.route.snapshot.paramMap.get('id') || "";

        if (this.thisBoardId !== null) {
            this.fetchBoardIdData(this.thisBoardId);
            this.fetchAllListsFromThisBoard(this.thisBoardId);
        }
    }

    // Fetch board
    fetchBoardIdData(boardId: string) {
        this.trelloService.getBoardWithId(boardId)
            .pipe(filter(x => !!x))
            .subscribe(board => {
                if (board) {
                    this.boardData = board;
                    this.globalService.updateBoardData(this.boardData);
                } else {
                    this.boardData = [];
                }
            });
    }

    // Fetch all user list in this board
    fetchAllListsFromThisBoard(boardId: string) {
        this.trelloService.getAllListsFromBoardWithId(boardId)
            .pipe(filter(x => !!x))
            .subscribe(boards => {
                if (boards) {
                    this.listsInBoard = boards;
                    console.log(boards);
                } else {
                    this.listsInBoard = [];
                }
            });
    }

    drop(event: CdkDragDrop<string[]>) {
        this.globalService.arrayMove(this.listsInBoard, event.previousIndex, event.currentIndex);
        /*let dropPlace = this.listsInBoard[event.currentIndex].pos;
        let whichListMovingId = this.listsInBoard[event.currentIndex].id;

        if (event.previousIndex < event.currentIndex) { // Right move
            console.log(this.listsInBoard[event.currentIndex - 1].pos);
            console.log(this.listsInBoard[event.currentIndex].pos);
            console.log(this.listsInBoard[event.currentIndex + 1].pos);
            this.updateList(whichListMovingId, '&pos=' + (dropPlace + 5));
        }*/
    }
        /*for (let i = 0; i < this.listsInBoard.length; i++) {
            if (i === event.previousIndex) {
                if (event.previousIndex < event.currentIndex) { // Right move
                    //console.log(this.listsInBoard[event.previousIndex].name);
                    console.log(this.listsInBoard[event.currentIndex].name);
                    console.log(this.listsInBoard[event.currentIndex].id);
                    console.log(this.listsInBoard[event.currentIndex + 1].name);
                    console.log(this.listsInBoard[event.currentIndex + 1].id);
                    this.updateList(this.listsInBoard[event.currentIndex].id, '&pos=' + ((this.listsInBoard[event.previousIndex].pos) + 1));
                } else {
                    console.log(this.listsInBoard[event.previousIndex].pos);
                    this.updateList(this.listsInBoard[event.previousIndex].id, '&pos=' + (this.listsInBoard[event.currentIndex].pos - 5));
                }
            }
            if (i === event.previousIndex) {
                this.updateList(this.listsInBoard[event.previousIndex].id, '&pos=' + event.currentIndex);
                this.fetchAllListsFromThisBoard(this.thisBoardId);
            }*/
}
