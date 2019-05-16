import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../app.models';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.sass']
})
export class ViewRecipeComponent implements OnInit {

  paramMapSubscription: Subscription;
  activeRecipe: Recipe


  constructor(private toastrService: ToastrService, private router: Router, private route: ActivatedRoute, private httpService: HttpService) { }

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
    let url = `https://s3.us-east-2.amazonaws.com/net.tannerwest.foodee-uploads/${recipeFilename}`
    console.log(url)
    return {'background-image': `url(${url})`}
  }

  editRecipe(){
    this.router.navigate(['/edit-recipe/' + this.activeRecipe.recipeId])
  }

  deleteRecipe(){
    let me = this;
    
    if(confirm("Are you sure you want to delete this recipe?")){
      this.httpService.deleteRecipeById(this.activeRecipe.recipeId).subscribe(res => {
        console.log(res)
        if(res == true){
          me.toastrService.success("Recipe deleted.", "Success")
          this.router.navigate(['/'])

        } else {
          me.toastrService.error("There was a problem deleting this recipe.", "Error")
        }
      })
    } else {
      console.log("No, don't delete.")
    }
  }


}
