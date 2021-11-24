import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { filter } from 'rxjs/operators';
import { TrelloService } from "../../../services/trello.service";
import { GlobalService } from '../../../services/global.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-board-list',
    templateUrl: './board-list.component.html',
    styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit {
    @Input() boardListTitle: string = "";
    @Input() boardListId: string = ""
    @ViewChild('textareaInput', {static: false}) textareaInput: ElementRef<HTMLInputElement> = {} as ElementRef;
    @ViewChild('editTitleInput', {static: false}) editTitleInput: ElementRef<HTMLInputElement> = {} as ElementRef;
    cardsOnList: any = [];
    isAddNewCardAreaVisible: boolean = false;
    isEditTitleAreaVisible: boolean = false;

    constructor(
        private cdRef:ChangeDetectorRef,
        private trelloService: TrelloService,
        private globalService: GlobalService) { }

    ngOnInit(): void {
        this.fetchAllCardsFromThisList(this.boardListId);
        /*this.globalService.boardData.subscribe(data => {
            console.log(data);
        });*/
    }

    // Fetch all cards on list
    fetchAllCardsFromThisList(listId: string) {
        this.trelloService.getAllCardsFromListWithId(listId)
            .pipe(filter(x => !!x))
            .subscribe(cards => {
                if (cards) {
                    this.cardsOnList = cards;
                } else {
                    this.cardsOnList = [];
                }
            });
    }

    updateList(
        boardListId: string,
        params: any): void {
        this.trelloService.updateListWithId(
            boardListId,
            params).subscribe(board => {
                this.isEditTitleAreaVisible = false;
            });
    }

    addNewCardToList(
        boardListId: string,
        cardName: string): void {
        this.trelloService.addNewCardToListWithId(
            boardListId,
            cardName).subscribe(() => {
                console.log('Card added');
                this.isAddNewCardAreaVisible = false;
                this.fetchAllCardsFromThisList(this.boardListId);
            });
    }

    deleteCard(cardId: string) {
        this.trelloService.deleteCardWithId(cardId)
            .pipe(filter(x => !!x))
            .subscribe(() => {
                this.fetchAllCardsFromThisList(this.boardListId);
            });
    }

    toggleAddNewCardArea() {
        this.isAddNewCardAreaVisible = !this.isAddNewCardAreaVisible;
        this.cdRef.detectChanges();
        this.textareaInput.nativeElement.focus();
    }

    toggleEditTitleArea() {
        this.isEditTitleAreaVisible = !this.isEditTitleAreaVisible;
        this.cdRef.detectChanges();
        this.editTitleInput.nativeElement.focus();
    }

    drop(event: CdkDragDrop<string[]>) {
        this.globalService.arrayMove(this.cardsOnList, event.previousIndex, event.currentIndex);
    }
}
