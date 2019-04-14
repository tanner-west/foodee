import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ingredient, Recipe, ShoppingListIngredient } from '../app.models';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(public http: HttpClient) { }

  baseUrl: string = "http://localhost:57123/api/v1";

  getAllRecipes(){
    return this.http.get(this.baseUrl + "/recipe/all")
  }

  getAllIngredients(){
    return this.http.get(this.baseUrl + "/ingredient/all")
  }

  getAllShoppingLists(){
    return this.http.get(this.baseUrl + "/shopping-list/all")
  }
  
  getShoppingListById(shoppingListId: string){
    return this.http.get(this.baseUrl + `/shopping-list/id/${shoppingListId}`)
  }

  postNewRecipe(newRecipe: Recipe){
    var headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json; charset=utf-8');
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(this.baseUrl + '/recipe/create', JSON.stringify(newRecipe), {headers})
  }

  postNewIngredient(newRecipe: Ingredient){
    var headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json; charset=utf-8');
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(this.baseUrl + '/ingredient/create', JSON.stringify(newRecipe), {headers})
  }

  postNewShoppingListIngredients(newShoppingListIngredients: ShoppingListIngredient[]){
    var headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json; charset=utf-8');
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(this.baseUrl + '/shopping-list-ingredient/create', JSON.stringify(newShoppingListIngredients), {headers})
  }

}
