import { Component, OnInit, Input } from '@angular/core';
import { filter } from 'rxjs/operators';
import { TrelloService } from "../../../services/trello.service";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-board-list',
    templateUrl: './board-list.component.html',
    styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit {
    @Input() boardListTitle: string = "";
    @Input() boardListId: string = "";
    cardsOnList: any = [];
    isAddNewCardAreaVisible: boolean = false;

    constructor(
        private trelloService: TrelloService) { }

    ngOnInit(): void {
        this.fetchAllCardsFromThisList(this.boardListId);
    }

    // Fetch all cards on list
    fetchAllCardsFromThisList(listId: string) {
        console.log('listId');
        console.log(listId);
        this.trelloService.getAllCardsFromListWithId(listId)
            .pipe(filter(x => !!x))
            .subscribe(cards => {
                if (cards) {
                    this.cardsOnList = cards;
                    console.log(this.cardsOnList);
                    console.log(this.cardsOnList.item.element.nativeElement);
                } else {
                    this.cardsOnList = [];
                }
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

    toggleAddNewCardArea() {
        this.isAddNewCardAreaVisible = !this.isAddNewCardAreaVisible;
    }

    drop(event: CdkDragDrop<string[]>) {
        console.log(event.item.element.nativeElement.offsetHeight);
        moveItemInArray(this.cardsOnList, event.previousIndex, event.currentIndex);
    }
}
