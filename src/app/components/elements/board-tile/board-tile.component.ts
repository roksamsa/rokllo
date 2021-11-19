import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-board-tile',
    templateUrl: './board-tile.component.html',
    styleUrls: ['./board-tile.component.scss']
})
export class BoardTileComponent implements OnInit , AfterViewInit {
    @Input() boardId: string = "";
    @Input() boardTitle: string = "";
    @Input() boardFavorite: string = "";
    @Input() boardFavoriteBool: boolean = false;
    @Input() boardBackgroundColor: string = "";
    @Input() boardBackgroundImage: string = "";

    @Output() openDetails = new EventEmitter();

    favoriteIconClicked = false;

    constructor(private route: Router) { }

    ngOnInit(): void {
        this.boardFavoriteBool = true ? this.boardFavorite === "true" : false;
    }

    ngAfterViewInit(): void {
    }

    boardFavoriteToggle() {
        this.favoriteIconClicked = !this.favoriteIconClicked;
        this.boardFavoriteBool = !this.boardFavoriteBool;
    }

    redirectToDetails() {
        this.openDetails.emit();
        this.route.navigate(['/board/' + this.boardId]);
    }
}
