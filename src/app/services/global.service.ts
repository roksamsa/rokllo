import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GlobalService {
    public boardData = new BehaviorSubject<{}>({});
    currentBoardData = this.boardData.asObservable();

    constructor() { }

    updateBoardData(boardData: {}) {
        this.boardData.next(boardData);
    }

    // Move items in array from to
    arrayMove(array: any, fromIndex: number, toIndex: number) {
        var element = array[fromIndex];
        array.splice(fromIndex, 1);
        array.splice(toIndex, 0, element);
    }
}
