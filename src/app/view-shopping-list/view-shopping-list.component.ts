import { Component, OnInit } from '@angular/core';
import { ShoppingList } from '../app.models';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-view-shopping-list',
  templateUrl: './view-shopping-list.component.html',
  styleUrls: ['./view-shopping-list.component.sass']
})
export class ViewShoppingListComponent implements OnInit {

  tempShoppingList: ShoppingList;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getShoppingListById("5ac08a35-b870-4e16-8dfb-662ff1bf1fab")
    .subscribe(res => {
      this.tempShoppingList = res as ShoppingList;
      console.log(this.tempShoppingList)
    })
  }

}
