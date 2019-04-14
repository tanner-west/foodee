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

@NgModule({
  declarations: [
    AppComponent,
    NewRecipeComponent,
    ViewRecipesComponent,
    NewIngredientComponent,
    ViewShoppingListComponent,
    SelectShoppingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [NgbModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
