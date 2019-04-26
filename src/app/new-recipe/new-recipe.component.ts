import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { HttpService } from '../services/http.service';
import { Ingredient, Recipe } from '../app.models';
import * as validator from 'validator';

// TODO: validate the form (especially to make sure ingredient controls contain the right values and are complete)

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.sass']
})
export class NewRecipeComponent implements OnInit {

  databaseIngredients: Ingredient[];
  searchResults: Ingredient[];
  imageFile: File;
  imagePreviewSrc: string;


  constructor(private fb: FormBuilder, private http: HttpService) { 
  }

  recipeForm = this.fb.group({
    title: [''],
    image: [''],
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

  validateThing(){
    console.log(uuid())
    console.log(validator.isUUID('486ef1ff-db87-49e2-8bf4-ce1004dc0c3f'      ))
  }

  addIngredient() {
    this.recipeIngredients.push(this.fb.group({
      ingredient: this.fb.group({
        ingredientId: this.fb.control('')
      }),
      qty: this.fb.control('')
    }));
  }

  onBlurIngredient(control: FormControl, index: number){
    console.log(control.value)
    if(validator.isUUID(control.value['ingredient']['ingredientId'])){

    } else {
      control.reset();
      
    }
    
  }

  onRemoveIngredient(index: number){
    this.recipeIngredients.removeAt(index)
    
  }

  logIng(control){
    console.log(control)
  }

  onSubmit() {
    //console.log(this.createRecipe())
    //this.http.postNewRecipe(this.createRecipe()).subscribe(res => console.log(res));
    this.http.newPostNewRecipe("http://localhost:57123/api/v1/recipe/create", this.imageFile, this.createRecipe()).subscribe(res => console.log(res))
  }

  createRecipe(){
    const newRecipe = this.recipeForm.value as Recipe;
    newRecipe.recipeId = uuid();
    
    delete newRecipe['image'];

    for(let i= newRecipe.recipeIngredients.length - 1; i>=0; i--){
      if(newRecipe.recipeIngredients[i].ingredient.ingredientId == null || newRecipe.recipeIngredients[i].qty == null){
        let spliced = newRecipe.recipeIngredients.splice(i, 1);
        console.log(spliced)
      } else {
        newRecipe.recipeIngredients[i].recipeId = newRecipe.recipeId;
        newRecipe.recipeIngredients[i].recipeIngredientId = uuid();
        newRecipe.recipeIngredients[i].qty = parseInt(newRecipe.recipeIngredients[i].qty.toString())
      }
    }

  
    console.log(newRecipe)
    return newRecipe;
  }

  logFormValue(){
    console.log(this.recipeForm.value)
  }

  // onCompleterSelected($event, control: FormGroup){
  //   console.log($event);
    
  //   control.controls['ingredientId'].setValue($event.originalObject.ingredientId, {emitEvent: false, emitModelToViewChange: false});

  // }

   onSelectIngredient($event, control: FormGroup){
    
    control.controls['ingredientId'].setValue($event.ingredientId, {emitEvent: false, emitModelToViewChange: false});

  }
  onSelectImage($event){
    let me = this;
    this.imageFile = $event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL($event.target.files[0])
    reader.onload = function(e:any){
      me.imagePreviewSrc = e.target.result;
    }
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

  myUploader($event){
    console.log($event)
    $event.preventDefault();
    let file = $event.files[0];
    this.http.uploadFile("http://localhost:57123/api/v1/recipe/upload-recipe-image", file, "00b6c801-5e97-4221-9934-54df257f53d6")
    .subscribe(
      event => {
        console.log(event);
      }
    )
  }

  ngOnInit() {
    this.http.getAllIngredients().subscribe(res => {
      this.databaseIngredients = res as Ingredient[]
      console.log(this.databaseIngredients)
      this.validateThing()

    })


  }


}
