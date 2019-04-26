import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../app.models';


@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.sass']
})
export class ViewRecipeComponent implements OnInit {

  paramMapSubscription: Subscription;
  activeRecipe: Recipe


  constructor(private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit() {
    let me = this;
    me.paramMapSubscription = me.route.paramMap.subscribe(function(params){
      me.httpService.getRecipeById(params.get('id'))
      .subscribe(res => {
        me.activeRecipe = res as Recipe;
        console.log(me.activeRecipe)
      })
    })
  }

  getAssetFilename(recipe: Recipe){
    let recipeFilename = recipe.asset[0].filename;
    return `http://localhost:57123/api/v1/assets/images/${recipeFilename}`
  }

}
