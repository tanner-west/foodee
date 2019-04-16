import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectShoppingListService {

  emitActiveShoppingList: EventEmitter<String> = new EventEmitter();
  constructor() { }
}
