import { Component, OnInit } from '@angular/core';
import { SelectShoppingListService } from './select-shopping-list/select-shopping-list.service';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private selectShoppingListService: SelectShoppingListService, private localStorageService: LocalStorageService){}

  isNavbarCollapsed = true;
  title = 'foodee';
  activeShoppingListId: string;

  ngOnInit(){

    //don't get this from lss; subscribe to it
    this.activeShoppingListId = this.localStorageService.getActiveShoppingListId();
    this.selectShoppingListService.emitActiveShoppingList.subscribe(activeShoppingListId => this.activeShoppingListId = activeShoppingListId);

    
  }
}
