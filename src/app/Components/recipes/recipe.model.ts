import { v4 as uuidv4 } from 'uuid';

export class Recipe {
  recipeID: string;
  recipeName: string;
  recipeCategory: string;
  recipeDescription: string;
  recipeURL: string;

  constructor(name: string, caty: string, desc: string, url: string) {
    this.recipeID = uuidv4(); // Unique ID generated using UUID for Detecting every item uniquely
    this.recipeName = name;
    this.recipeCategory = caty;
    this.recipeDescription = desc;
    this.recipeURL = url;
  }
}
