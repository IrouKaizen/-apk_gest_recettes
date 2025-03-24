
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  unitPrice: number;
}

export interface RecipeIngredient {
  ingredientId: string;
  ingredient: Ingredient;
  quantity: number;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  prepTime: number;
  cookTime: number;
  isPublic: boolean;
  userId: string;
  user?: User;
  ingredients: RecipeIngredient[];
  steps: string[];
  imageUrl?: string;
}

export interface Inventory {
  id: string;
  name: string;
  userId: string;
  items: InventoryItem[];
}

export interface InventoryItem {
  ingredientId: string;
  ingredient: Ingredient;
  quantity: number;
}

export interface ShoppingListItem {
  ingredientId: string;
  ingredient: Ingredient;
  quantity: number;
  price: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
