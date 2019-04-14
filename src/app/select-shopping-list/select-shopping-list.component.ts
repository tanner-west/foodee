import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ShoppingList } from '../app.models';

@Component({
  selector: 'app-select-shopping-list',
  templateUrl: './select-shopping-list.component.html',
  styleUrls: ['./select-shopping-list.component.sass']
})
export class SelectShoppingListComponent implements OnInit {

  shoppingLists: ShoppingList[];

  constructor(private httpService: HttpService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.httpService.getAllShoppingLists().subscribe(res => this.shoppingLists = res as ShoppingList[])
  }

  setActiveShoppingListId($event){
    this.localStorageService.setActiveShoppingListId($event.target.value);
  }

}
