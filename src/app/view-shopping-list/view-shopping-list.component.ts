import { Component, OnInit } from '@angular/core';
import { ShoppingList, IngredientCategoryEnum } from '../app.models';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-view-shopping-list',
  templateUrl: './view-shopping-list.component.html',
  styleUrls: ['./view-shopping-list.component.sass']
})
export class ViewShoppingListComponent implements OnInit {

  tempShoppingList: ShoppingList;
  sortListBy: string = 'name-asc';

  constructor(private httpService: HttpService) { }

  ingredientCategoryString(ingredientCategoryId: number){
    switch (ingredientCategoryId){
      case 1:
        return "Produce";
      case 2:
        return "Pantry";
      case 3:
        return "Meat";
      case 4:
        return "Dairy";
    }
  }

  setSortListBy(sortBy: string){
    switch(sortBy){
      case 'name':
        if(this.sortListBy == 'name-asc'){
          this.sortListBy = 'name-desc';
        } else {
          this.sortListBy ='name-asc';
        }
        break;
      case 'category':
        if(this.sortListBy == 'category-asc'){
          this.sortListBy = 'category-desc';
        } else {
          this.sortListBy ='category-asc';
        }
        break;
      default:
        this.sortListBy = 'name-asc';
    }
  }

  ngOnInit() {
    this.httpService.getShoppingListById("5ac08a35-b870-4e16-8dfb-662ff1bf1fab")
    .subscribe(res => {
      this.tempShoppingList = res as ShoppingList;
    })
  }

}
