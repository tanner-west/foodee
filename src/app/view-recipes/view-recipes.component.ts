import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Recipe } from '../app.models';

@Component({
  selector: 'app-view-recipes',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.sass']
})
export class ViewRecipesComponent implements OnInit {


  recipes: Recipe[];
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getAllRecipes().subscribe(res => {
      this.recipes  = res as [Recipe];
      console.log(this.recipes)
    })
  }

}
