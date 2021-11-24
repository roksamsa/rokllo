import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TrelloService {
    trelloKey = "d3dd95bb2c59a7d97c006a96f3b72d8f";
    trelloToken = "be77b0c76709dd83671aaa163fae71b3653d8fda574996a520b810379d09524e";
    trelloAuth = "?key=" + this.trelloKey + "&token=" + this.trelloToken;

    urlTrello = 'https://api.trello.com/1/';
    urlProxy = 'http://localhost:8010/proxy/';
    urlDefault = this.urlTrello;
    urlCurrentUser = this.urlDefault + 'members/me';
    urlBoards = this.urlCurrentUser + '/boards';
    urlBaseBoards = this.urlDefault + 'boards/';
    urlLists = this.urlDefault + 'lists/';
    urlCards = this.urlDefault + 'cards';

    // http://localhost:8010/proxy/cards?key=d3dd95bb2c59a7d97c006a96f3b72d8f&token=be77b0c76709dd83671aaa163fae71b3653d8fda574996a520b810379d09524e&idList=6196959f85856424175905ad&name=Roks4272&response_type=token
    // https://trello.com/1/authorize?key=YOUR_APP_KEY&name=APP_NAME&scope=read,write&expiration=never&response_type=token

    // 'https://api.trello.com/1/lists?name={name}&idBoard=5abbe4b7ddc1b351ef961414'

    constructor(
        private http: HttpClient) { }

    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    // Get all data for username
    getUserData(): Observable<[]> {
        return this.http.get<[]>(this.urlCurrentUser + this.trelloAuth);
    }

    // BOARD - Get all boards from database
    getAllBoards(): Observable<[]> {
        return this.http.get<[]>(this.urlBoards + this.trelloAuth);
    }

    // BOARD - Get specific board with ID from database
    getBoardWithId(boardId: string): Observable<[]> {
        return this.http.get<[]>(this.urlBaseBoards + boardId + this.trelloAuth);
    }

    // LIST - Get lists from specific board with ID from database
    getAllListsFromBoardWithId(boardId: string): Observable<[]> {
        return this.http.get<[]>(this.urlBaseBoards + boardId + '/lists' + this.trelloAuth);
    }

    // LIST - Add new list to specific board with ID to database
    addNewListToBoardWithId(name: string, idBoard: string, position: any) {
        return this.http.post(this.urlLists + this.trelloAuth + '&name=' + name + '&idBoard=' + idBoard + '&pos=' + position + '&response_type=token', {headers: this.headers});
    }

    // LIST - Update list with ID to database
    updateListWithId(listId: string, params: any) {
        return this.http.put(this.urlLists + listId + this.trelloAuth + params, {headers: this.headers});
    }

    // CARD - Get cards from specific list with ID from database
    getAllCardsFromListWithId(listId: string): Observable<[]> {
        return this.http.get<[]>(this.urlLists + listId + '/cards' + this.trelloAuth);
    }

    // CARD - Add new card to specific list with ID to database
    addNewCardToListWithId(listId: string, cardName: string) {
        return this.http.post(this.urlCards + this.trelloAuth + '&idList=' + listId + '&name=' + cardName + '&response_type=token', {headers: this.headers});
    }

    // CARD - Delete card with ID from database
    deleteCardWithId(cardId: string) {
        return this.http.delete(this.urlCards + '/' + cardId + this.trelloAuth + '&response_type=token', {headers: this.headers});
    }

    // Update list in board
    /*updateListInBoard(
        id: any,
        vehicleType: any,
        vehicleBrand: any,
        vehicleName: any,
        vehicleModelYear: number,
        vehicleColor: any,
        vehicleSeats: number,
        vehicleMaxLuggage: number,
        vehicleInsurance: boolean): Observable<[]> {
        const vehicle = {
            id: id,
            vehicleType: vehicleType,
            vehicleBrand: vehicleBrand,
            vehicleName: vehicleName,
            vehicleModelYear: vehicleModelYear,
            vehicleColor: vehicleColor,
            vehicleSeats: vehicleSeats,
            vehicleMaxLuggage: vehicleMaxLuggage,
            vehicleInsurance: vehicleInsurance
        };
        return this.http.patch<[]>(this.urlBaseBoards + boardId + this.trelloAuth);
    }*/

    /*
    // Add new vehicle to database
    /*addVehicle(
        belongsToUser: any,
        vehicleType: any,
        vehicleBrand: any,
        vehicleName: any,
        vehicleModelYear: number,
        vehicleColor: any,
        vehicleSeats: number,
        vehicleMaxLuggage: number,
        vehicleInsurance: boolean) {
        const vehicle = {
            belongsToUser: belongsToUser,
            vehicleType: vehicleType,
            vehicleBrand: vehicleBrand,
            vehicleName: vehicleName,
            vehicleModelYear: vehicleModelYear,
            vehicleColor: vehicleColor,
            vehicleSeats: vehicleSeats,
            vehicleMaxLuggage: vehicleMaxLuggage,
            vehicleInsurance: vehicleInsurance
        };
        return this.http.post(this.uriVehicleAdd, vehicle);
    }*/

    // Delete vehicle from database
    /*deleteVehicle(id: any): Observable<Coin[]> {
        return this.http.delete<Coin[]>(this.uriVehicleDelete + id);
    }*/
}
