export class Recipe {
    recipeId: string;
    title: string;
    recipeIngredients: RecipeIngredient[];
    asset: Asset[];
}

export class RecipeIngredient {
    recipeIngredientId: string;
    ingredient: Ingredient;
    recipeId: string;
    qty: number;    
    measurementUnitId: number;
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

export class Asset{
    filename: string;
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

export enum MeasurementUnitIdEnum {
    Pinch = 1,
    Dash = 2,
    Teaspoon = 3,
    Tablespoon = 4,
    Cup = 5,
    Gallon = 6,
    Milliliter = 7,
    Liter = 8,
    Ounce = 9,
    Pound = 10,
    Can = 11,
    Gram = 12,
    Sixteenth = 13,
    Eighth = 14,
    Quarter = 15,
    Half = 16,
    Whole = 17,
    FluidOunce =18
}



//usage: MeasurementEnum.Weight evaluates as 1