import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Recipe, RecipeIngredient, ShoppingListIngredient, Ingredient, ShoppingList } from '../app.models';
import { v4 as uuid } from 'uuid';
import { LocalStorageService } from '../services/local-storage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-ingredients',
  templateUrl: './view-ingredients.component.html',
  styleUrls: ['./view-ingredients.component.sass']
})
export class ViewIngredientsComponent implements OnInit {

  ingredients: Ingredient[];

  constructor(private toastService: MessageService, private route: ActivatedRoute, private httpService: HttpService, private localStorageService: LocalStorageService) { }

  ngAfterViewInit(){
    let me = this;
    this.route.paramMap.subscribe(paramMap => {
      if(paramMap.get('from-create-new') == 'true'){
        console.log('yes')
        me.toastService.add({severity: 'success', summary: 'Ingredient created.'})
        
      } else {
        console.log('no')
      }
    })

  }
  ngOnInit() {
    
    this.httpService.getAllIngredients().subscribe(res => {
      this.ingredients  = res as [Ingredient];
      console.log(this.ingredients)
    })
  }

}
