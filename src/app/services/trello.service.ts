import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TrelloService {
    trelloKey = "d3dd95bb2c59a7d97c006a96f3b72d8f";
    trelloToken = "be77b0c76709dd83671aaa163fae71b3653d8fda574996a520b810379d09524e";
    trelloAuth = "?key=" + this.trelloKey + "&token=" + this.trelloToken;
    urlBase = 'https://api.trello.com/1/members/me';
    urlBaseLists = 'https://api.trello.com/1/boards/';
    urlBoards = this.urlBase + '/boards';

    constructor(
        private http: HttpClient) { }

    // Get all boards from database
    getAllBoards(): Observable<[]> {
        return this.http.get<[]>(this.urlBoards + this.trelloAuth);
    }

    // Get specific board with ID from database
    getBoardWithId(boardId: string): Observable<[]> {
        return this.http.get<[]>(this.urlBaseLists + boardId + this.trelloAuth);
    }

    // Get lists from specific board with ID from database
    getAllListsFromBoardWithId(boardId: string): Observable<[]> {
        return this.http.get<[]>(this.urlBaseLists + boardId + '/lists' + this.trelloAuth);
    }

    /*
    // Get specific coin by short name
    getCoinByShortName(coinShortName: string): Observable<Coin> {
        return this.http.get<Coin>(this.uriCoin + coinShortName);
    }

    // Get vehicles by specific user
    /*getCoinsByUser(belongsToUser: string): Observable<Coin[]> {
      return this.http.get<Coin[]>(this.uriCoinsForUser + belongsToUser);
    }*/

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

    // Update vehicle from database
    /*updateVehicle(
        id: any,
        vehicleType: any,
        vehicleBrand: any,
        vehicleName: any,
        vehicleModelYear: number,
        vehicleColor: any,
        vehicleSeats: number,
        vehicleMaxLuggage: number,
        vehicleInsurance: boolean): Observable<Coin[]> {
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
        return this.http.patch<Coin[]>(this.uriVehicleUpdate + id, vehicle);
    }*/

    // Delete vehicle from database
    /*deleteVehicle(id: any): Observable<Coin[]> {
        return this.http.delete<Coin[]>(this.uriVehicleDelete + id);
    }*/
}
