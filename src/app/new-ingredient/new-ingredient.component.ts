import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { HttpService } from '../services/http.service';
import { Ingredient, Recipe } from '../app.models';
@Component({
  selector: 'app-new-ingredient',
  templateUrl: './new-ingredient.component.html',
  styleUrls: ['./new-ingredient.component.sass']
})
export class NewIngredientComponent implements OnInit {

  databaseIngredients: Ingredient[];

  constructor(private fb: FormBuilder, private http: HttpService) { }

  ingredientForm = this.fb.group({
    title: [''],
    categoryId: [''],
    measurementId: [''],
    ingredientId: ['']
  })
  
  // You have to have this getter for the formBuilder to work
  get recipeIngredients(){
    return this.ingredientForm.get('recipeIngredients') as FormArray;
  }

  onSubmit() {
    console.log(this.createIngredient());
    this.http.postNewIngredient(this.createIngredient()).subscribe(res => console.log(res));
  }

  createIngredient(){
    const newIngredient = this.ingredientForm.value as Ingredient;
    newIngredient.ingredientId = uuid();

 
    return newIngredient;
  }

  ngOnInit() {
    this.http.getAllIngredients().subscribe(res => {this.databaseIngredients = res as Ingredient[];
    console.log(this.databaseIngredients)})
  }


}
