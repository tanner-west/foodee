import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ingredient, Recipe } from '../app.models';


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

}
