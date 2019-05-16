import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Ingredient, Recipe, ShoppingListIngredient } from '../app.models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(public http: HttpClient) { }

  baseUrl: string = environment.baseUrl;

  getAllRecipes(){
    return this.http.get(this.baseUrl + "/recipe/all")
  }

  getRecipeById(recipeId: string){
    return this.http.get(this.baseUrl + `/recipe/id/${recipeId}`)
  }

  deleteRecipeById(recipeId: string){
    return this.http.delete(this.baseUrl + `/recipe/id/${recipeId}`)
  }

  getRecipesPage(pageNo: number){
    return this.http.get(this.baseUrl + "/recipe/all/" + pageNo.toString())

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

    return this.http.post(this.baseUrl + '/recipe/create-without-image', JSON.stringify(newRecipe), {headers})
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

  newPostNewRecipe(url: string, file: File, recipe): Observable<HttpEvent<any>>{
    console.log(recipe)

    let recipeJson = JSON.stringify(recipe);
    
    let formData = new FormData();
    formData.append('file', file);
    formData.append('recipe', recipeJson);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
      content: formData
    };

    const req = new HttpRequest('POST', url, formData, options);
    return this.http.request(req);

  }

  uploadFile(url: string, file: File, recordId: string): Observable<HttpEvent<any>> {

    let formData = new FormData();
    formData.append('file', file);
    formData.append('recipeId', recordId)

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', url, formData, options);
    return this.http.request(req);
  }

}
