import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { HttpService } from '../services/http.service';
import { Ingredient, Recipe, MeasurementUnitIdEnum, MeasurementEnum } from '../app.models';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { MeasurementService } from '../services/measurement.service';




@Component({
  selector: 'app-new-ingredient',
  templateUrl: './new-ingredient.component.html',
  styleUrls: ['./new-ingredient.component.sass']
})
export class NewIngredientComponent implements OnInit {

  databaseIngredients: Ingredient[];
  measurementUnits: string[];

  constructor(private measurementService: MeasurementService, private toastService: MessageService, private zone: NgZone, private router: Router, private fb: FormBuilder, private http: HttpService) {
    this.measurementUnits = measurementService.returnMeasurementUnits();
   }

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
    let me = this;
    console.log(this.createIngredient());
    this.http.postNewIngredient(this.createIngredient()).subscribe(res => { 
      console.log(res)
      // me.zone.run(() =>{
      //   this.router.navigate(['/ingredients'])
      // })
    me.router.navigate(['/ingredients/true'])
    });
  }

  createIngredient(){
    const newIngredient = this.ingredientForm.value as Ingredient;
    newIngredient.ingredientId = uuid();

 
    return newIngredient;
  }

  ngOnInit() {
    this.http.getAllIngredients().subscribe(res => {this.databaseIngredients = res as Ingredient[];
    console.log(this.databaseIngredients)})
    console.log(this.measurementUnits)
  }


}
