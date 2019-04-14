export class Recipe {
    recipeId: string;
    title: string;
    recipeIngredients: RecipeIngredient[];
}

export class RecipeIngredient {
    recipeIngredientId: string;
    ingredient: Ingredient;
    recipeId: string;
    qty: number;    
}

export class Ingredient {
    ingredientId: string;
    title: string;
    categoryId: number;
    measurementId: number;
}

export class ShoppingListIngredient{
    shoppingListIngredientId: string;
    shoppingList: ShoppingList;
    ingredient: Ingredient;
    recipe: Recipe;
}

export class ShoppingList{
    shoppingListId: string;
    shoppingListTitle: string;
    shoppingListIngredients: ShoppingListIngredient[];
}

export enum IngredientCategoryEnum {
    Produce = 1,
    Pantry = 2,
    Meat = 3,
    Dairy = 4
}

export enum MeasurementEnum {
    Weight = 1,
    Volume = 2,
    Each = 3

}



//usage: MeasurementEnum.Weight evaluates as 1