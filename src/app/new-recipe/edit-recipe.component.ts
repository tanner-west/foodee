import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { HttpService } from '../services/http.service';
import { MeasurementService } from '../services/measurement.service';
import { Ingredient, Recipe, MeasurementUnitIdEnum } from '../app.models';
import * as validator from 'validator';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NgxPicaService } from 'ngx-pica';



// TODO: validate the form (especially to make sure ingredient controls contain the right values and are complete)

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.sass']
})
export class EditRecipeComponent implements OnInit {

  databaseIngredients: Ingredient[];
  searchResults: Ingredient[];
  imageFile: File;
  imagePreviewSrc: string;
  measurementUnits: string[];
  paramMapSubscription: Subscription;
  activeRecipe: Recipe
  pageAction: string = "Edit"
  dataIsLoading: boolean = false;

  constructor(private picaService: NgxPicaService, private router: Router, private toastrService: ToastrService, private httpService: HttpService ,private route: ActivatedRoute, private fb: FormBuilder, private http: HttpService, private measurementService: MeasurementService) { 
    this.measurementUnits = measurementService.returnMeasurementUnits();
  }

  recipeForm = this.fb.group({
    title: [''],
    image: [''],
    // image: [''],
    recipeIngredients: this.fb.array([
    //   this.fb.group({
    //     ingredient: this.fb.group({
    //       ingredientId: this.fb.control('')
    //     }),
    //     qty: this.fb.control(''),
    //     measurementUnitId: this.fb.control('')
    //   })
    ])
  })

  fillForm(){
    this.recipeForm.controls['title'].setValue(this.activeRecipe.title);
    
    this.activeRecipe.recipeIngredients.forEach(e => {
        this.recipeIngredients.push(this.fb.group({
            ingredient: this.fb.group({
                ingredientId: this.fb.control(e.ingredient.ingredientId),
                ingredientPicker: {
                  title: e.ingredient.title
                }
            }),
            qty: this.fb.control(e.qty),
            measurementUnitId: this.fb.control(e.measurementUnitId),
            recipeIngredientId: this.fb.control(e.recipeIngredientId)
        
            }));
    })
    
  }
  
  // You have to have this getter for the formBuilder to work
  get recipeIngredients(){
    return this.recipeForm.get('recipeIngredients') as FormArray;
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
      console.log(this.imageFile)
      this.http.newPostNewRecipe(`${environment.baseUrl}/recipe/create`, this.imageFile, newRecipe).subscribe(res => {
        me.dataIsLoading = false;
        if(res instanceof HttpResponse && res.status == 200){
          me.toastrService.success("Recipe created successfully.", "Success");
          me.router.navigate(['/recipe/' + newRecipe.recipeId])
        }
        
      
      })

    } else {
      let newRecipe:Recipe = this.createRecipe();
      this.http.postNewRecipe(newRecipe).subscribe(res=>{
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
    newRecipe.recipeId = this.activeRecipe.recipeId;
    newRecipe.asset = this.activeRecipe.asset;
    
    delete newRecipe['image'];

    for(let i= newRecipe.recipeIngredients.length - 1; i>=0; i--){
      if(newRecipe.recipeIngredients[i].ingredient.ingredientId == null || newRecipe.recipeIngredients[i].qty == null){
        let spliced = newRecipe.recipeIngredients.splice(i, 1);
      } else {

        newRecipe.recipeIngredients[i].recipeId = newRecipe.recipeId;
        if(!newRecipe.recipeIngredients[i].recipeIngredientId){
          newRecipe.recipeIngredients[i].recipeIngredientId = uuid();
        }
        //newRecipe.recipeIngredients[i].qty = parseInt(newRecipe.recipeIngredients[i].qty.toString())
        newRecipe.recipeIngredients[i].qty = me.measurementService.convertQtyByEnum(newRecipe.recipeIngredients[i].qty,newRecipe.recipeIngredients[i].measurementUnitId)
      }
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

   onSelectIngredient($event, control: FormGroup){
    control.controls['ingredientId'].setValue($event.ingredientId, {emitEvent: false, emitModelToViewChange: false});
  }
  onSelectImage($event){
    
    let me = this;
    let upload = $event.target.files[0];
    var reader = new FileReader();
    // reader.readAsDataURL($event.target.files[0])
    // reader.onload = function(e:any){
    //   me.imagePreviewSrc = e.target.result;

    // }

    this.picaService.compressImage(upload, 0.3)
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
    console.log(this.searchResults)
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

  async ngOnInit() {
    this.http.getAllIngredients().subscribe(res => {
      this.databaseIngredients = res as Ingredient[]
    })

    let me = this;
    me.paramMapSubscription = me.route.paramMap.subscribe(function(params){
      me.httpService.getRecipeById(params.get('id'))
      .subscribe(res => {
        me.activeRecipe = res as Recipe;
        if(me.activeRecipe.asset[0] && me.activeRecipe.asset[0].filename){
          let imageFilename = me.activeRecipe.asset[0].filename;
          me.imagePreviewSrc = `https://s3.us-east-2.amazonaws.com/net.tannerwest.foodee-uploads/${imageFilename}`; 

        }
        console.log(me.activeRecipe)
        me.fillForm();

      })
    })
  }
}
