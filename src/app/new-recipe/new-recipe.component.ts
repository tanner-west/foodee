import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { HttpService } from '../services/http.service';
import { Ingredient, Recipe } from '../app.models';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.sass']
})
export class NewRecipeComponent implements OnInit {

  databaseIngredients: Ingredient[];

  constructor(private fb: FormBuilder, private http: HttpService) { }

  recipeForm = this.fb.group({
    title: [''],
    // image: [''],
    recipeIngredients: this.fb.array([
      this.fb.group({
        ingredient: this.fb.group({
          ingredientId: this.fb.control('')
        }),
        quantity: this.fb.control('')
      })
    ])
  })
  
  // You have to have this getter for the formBuilder to work
  get recipeIngredients(){
    return this.recipeForm.get('recipeIngredients') as FormArray;
  }

  addIngredient() {
    this.recipeIngredients.push(this.fb.group({
      ingredient: this.fb.group({
        ingredientId: this.fb.control('')
      }),
      quantity: this.fb.control('')
    }));
  }

  onSubmit() {
    this.http.postNewRecipe(this.createRecipe()).subscribe(res => console.log(res));
  }

  createRecipe(){
    const newRecipe = this.recipeForm.value as Recipe;
    newRecipe.recipeId = uuid();

    for(let i=0; i<newRecipe.recipeIngredients.length; i++){
      newRecipe.recipeIngredients[i].recipeId = newRecipe.recipeId;
      newRecipe.recipeIngredients[i].recipeIngredientId = uuid();
    }

  
    return newRecipe;
  }

  ngOnInit() {
    this.http.getAllIngredients().subscribe(res => this.databaseIngredients = res as Ingredient[])
  }


}
