import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { HttpService } from '../services/http.service';
import { MeasurementService } from '../services/measurement.service';
import { Ingredient, Recipe, MeasurementUnitIdEnum } from '../app.models';
import * as validator from 'validator';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NgxPicaService } from 'ngx-pica';



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
  measurementUnits: string[];
  pageAction: string = "Create";
  dataIsLoading: boolean = false;



  constructor(private picaService: NgxPicaService, private router: Router, private toastrService: ToastrService, private fb: FormBuilder, private http: HttpService, private measurementService: MeasurementService) { 
    this.measurementUnits = measurementService.returnMeasurementUnits();
  }

  recipeForm = this.fb.group({
    title: [''],
    image: [''],
    // image: [''],
    recipeIngredients: this.fb.array([
      this.fb.group({
        ingredient: this.fb.group({
          ingredientId: this.fb.control(''),
          ingredientPicker: this.fb.control('')
        }),
        qty: this.fb.control(''),
        measurementUnitId: this.fb.control('')
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
        ingredientPicker: this.fb.control(''),
        ingredientId: this.fb.control('')
      }),
      qty: this.fb.control(''),
      measurementUnitId: this.fb.control('')

    }));
  }



  qtyIsMultiple(index: number): boolean{
    return parseInt(this.recipeForm.controls.recipeIngredients['controls'][index].controls['qty'].value) > 1;
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
    let me = this;
    me.dataIsLoading = true;
    let newRecipe = this.createRecipe()
    //return;
    //this.http.postNewRecipe(this.createRecipe()).subscribe(res => console.log(res));
    if(this.imageFile){
      //this.http.newPostNewRecipe("http://foodee-env.2j8zvpuypp.us-east-2.elasticbeanstalk.com/api/v1/recipe/create", this.imageFile, this.createRecipe()).subscribe(res => console.log(res))
      this.http.newPostNewRecipe(`${environment.baseUrl}/recipe/create`, this.imageFile, newRecipe).subscribe(res => {
        me.dataIsLoading = false;
        if(res instanceof HttpResponse && res.status == 200){
          me.toastrService.success("Recipe created successfully.", "Success");
          me.router.navigate(['/recipe/' + newRecipe.recipeId])
        }
        
      
      })

    } else {
      this.http.postNewRecipe(this.createRecipe()).subscribe(res=>{
        console.log(res)
        // if(res instanceof HttpResponse && res.status == 200){

          me.toastrService.success("Recipe created successfully.", "Success");
          me.router.navigate(['/recipe/' + newRecipe.recipeId])
        // }


      })
    }
  }

  createRecipe(){
    let me = this;
    const newRecipe = this.recipeForm.value as Recipe;
    newRecipe.recipeId = uuid();
    
    delete newRecipe['image'];

    for(let i= newRecipe.recipeIngredients.length - 1; i>=0; i--){
      console.log(i)
      if(newRecipe.recipeIngredients[i].ingredient.ingredientId == null || newRecipe.recipeIngredients[i].qty == null){
        let spliced = newRecipe.recipeIngredients.splice(i, 1);
        console.log(spliced)
      } else {

        newRecipe.recipeIngredients[i].recipeId = newRecipe.recipeId;
        newRecipe.recipeIngredients[i].recipeIngredientId = uuid();
        //newRecipe.recipeIngredients[i].qty = parseInt(newRecipe.recipeIngredients[i].qty.toString())
        newRecipe.recipeIngredients[i].qty = me.measurementService.convertQtyByEnum(newRecipe.recipeIngredients[i].qty,newRecipe.recipeIngredients[i].measurementUnitId)
      }
        console.log(newRecipe.recipeIngredients)
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
    let upload = $event.target.files[0];
    this.picaService.resizeImage(upload, 1920, 1080, {aspectRatio: {keepAspectRatio: true}})
    .subscribe((resizedFile) => {

      me.imageFile = resizedFile;
      var urlReader = new FileReader();
      urlReader.readAsDataURL(resizedFile);
      urlReader.addEventListener('load', (readerEvent:any) => {
        me.imagePreviewSrc = readerEvent.target.result;
      })

      // var bufferReader = new FileReader();
      // bufferReader.readAsArrayBuffer(resizedFile);
      // bufferReader.addEventListener('load', (readerEvent: any) => {
      //   me.imageFile = readerEvent.target.result;

      // })
    })
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
    this.http.uploadFile("http://foodee-env.2j8zvpuypp.us-east-2.elasticbeanstalk.com/api/v1/recipe/upload-recipe-image", file, "00b6c801-5e97-4221-9934-54df257f53d6")
    .subscribe(
      event => {
        console.log(event);
      }
    )
  }

  displayUnitBasedOnIngredientMeasurement(ingredient: any){
    return true;
  }

  ngOnInit() {
    this.http.getAllIngredients().subscribe(res => {
      this.databaseIngredients = res as Ingredient[]
      this.validateThing()
    })
    console.log(this.measurementService.returnMeasurementUnits());


  }


}
