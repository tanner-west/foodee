import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { HttpService } from '../services/http.service';
import { Ingredient, Recipe } from '../app.models';

// TODO: validate the form (especially to make sure ingredient controls contain the right values and are complete)

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.sass']
})
export class NewRecipeComponent implements OnInit {

  databaseIngredients: Ingredient[];
  seatchStr: string;
  captain: string;
  searchResults: Ingredient[];

  constructor(private fb: FormBuilder, private http: HttpService) { 
  }

  recipeForm = this.fb.group({
    title: [''],
    // image: [''],
    recipeIngredients: this.fb.array([
      this.fb.group({
        ingredient: this.fb.group({
          ingredientId: this.fb.control('')
        }),
        qty: this.fb.control('')
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
      qty: this.fb.control('')
    }));
  }

  onSubmit() {
    console.log(this.createRecipe())
    this.http.postNewRecipe(this.createRecipe()).subscribe(res => console.log(res));
  }

  createRecipe(){
    const newRecipe = this.recipeForm.value as Recipe;
    newRecipe.recipeId = uuid();

    for(let i=0; i<newRecipe.recipeIngredients.length; i++){
      newRecipe.recipeIngredients[i].recipeId = newRecipe.recipeId;
      newRecipe.recipeIngredients[i].recipeIngredientId = uuid();
      newRecipe.recipeIngredients[i].qty = parseInt(newRecipe.recipeIngredients[i].qty.toString())
    }

  
    return newRecipe;
  }

  logFormValue(){
    console.log(this.recipeForm.value)
  }

  // onCompleterSelected($event, control: FormGroup){
  //   console.log($event);
    
  //   control.controls['ingredientId'].setValue($event.originalObject.ingredientId, {emitEvent: false, emitModelToViewChange: false});

  // }

   onSelect($event, control: FormGroup){
    console.log($event);
    
    control.controls['ingredientId'].setValue($event.ingredientId, {emitEvent: false, emitModelToViewChange: false});

  }

  search($event){
    console.log($event)
    this.searchResults = this.databaseIngredients;
    let searchString = $event.query;
    let newIngredientArray = this.databaseIngredients.filter( function(ingredient){
      return ingredient.title.toLowerCase().includes(searchString.toLowerCase())
    })
    this.searchResults = newIngredientArray;
  }

  ngOnInit() {
    this.http.getAllIngredients().subscribe(res => {
      this.databaseIngredients = res as Ingredient[]
      console.log(this.databaseIngredients)


    })


  }


}
