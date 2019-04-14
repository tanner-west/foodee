import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setActiveShoppingListId(shoppingListId: string){
    localStorage.setItem("ACTIVE_SHOPPING_LIST_ID", shoppingListId)
  }

  getActiveShoppingListId(){
    return localStorage.getItem("ACTIVE_SHOPPING_LIST_ID")
  }
  
}
