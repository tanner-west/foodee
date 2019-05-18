import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ShoppingList, IngredientCategoryEnum } from '../app.models';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { SelectShoppingListService } from '../select-shopping-list/select-shopping-list.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-view-shopping-list',
  templateUrl: './view-shopping-list.component.html',
  styleUrls: ['./view-shopping-list.component.sass']
})
export class ViewShoppingListComponent implements OnInit, OnDestroy {

  activeShoppingList: ShoppingList;
  sortListBy: string = 'name-asc';
  changedShoppingListSubscription: Subscription;
  paramMapSubscription: Subscription;
  dataIsLoading: boolean = false;


  constructor(private toastrService: ToastrService, private location: Location, private selectShoppingListService: SelectShoppingListService, private httpService: HttpService, private route: ActivatedRoute) { }

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
    let me = this;
    me.dataIsLoading = true;
    me.changedShoppingListSubscription = me.selectShoppingListService.emitActiveShoppingList.subscribe(function(val){
      me.httpService.getShoppingListById(val)
      .subscribe(res => {
        me.dataIsLoading = false;

        me.activeShoppingList = res as ShoppingList;
        me.location.replaceState(`/shopping-list/${val}`)
      })
    })

    me.paramMapSubscription = me.route.paramMap.subscribe(function(params){
      me.httpService.getShoppingListById(params.get('id'))
      .subscribe(res => {
        me.dataIsLoading = false;
        me.activeShoppingList = res as ShoppingList;
      })

    })
    
  }

  ngOnDestroy(){
    let me = this;
    me.changedShoppingListSubscription.unsubscribe();
    me.paramMapSubscription.unsubscribe();
  }

}
