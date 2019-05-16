import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { ViewRecipesComponent } from './view-recipes/view-recipes.component';
import { NewIngredientComponent } from './new-ingredient/new-ingredient.component';
import { ViewShoppingListComponent } from './view-shopping-list/view-shopping-list.component';
import { SelectShoppingListComponent } from './select-shopping-list/select-shopping-list.component';
import { SortShoppingListIngredientsPipe } from './sort-shopping-list-ingredients.pipe';

import { ToastrModule } from 'ngx-toastr';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {FileUploadModule} from 'primeng/fileupload';

import { NgxPicaModule } from 'ngx-pica';

import { ViewIngredientsComponent } from './view-ingredients/view-ingredients.component';
import { SortIngredientListPipe } from './sort-ingredient-list.pipe';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { EditRecipeComponent} from './new-recipe/edit-recipe.component';


@NgModule({
  declarations: [
    AppComponent,
    NewRecipeComponent,
    ViewRecipesComponent,
    NewIngredientComponent,
    ViewShoppingListComponent,
    SelectShoppingListComponent,
    SortShoppingListIngredientsPipe,
    ViewIngredientsComponent,
    SortIngredientListPipe,
    ViewRecipeComponent,
    EditRecipeComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({timeOut: 2000}),
    AutoCompleteModule,
    ToastModule,
    FileUploadModule,
    NgxPicaModule
  ],
  providers: [NgbModule, ToastModule, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
