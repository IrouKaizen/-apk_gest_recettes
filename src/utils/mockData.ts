
import { Recipe, Ingredient, Inventory, User } from '../types';

export const mockIngredients: Ingredient[] = [
  { id: '1', name: 'Farine', unit: 'g', unitPrice: 0.002 },
  { id: '2', name: 'Sucre', unit: 'g', unitPrice: 0.003 },
  { id: '3', name: 'Œufs', unit: 'pièce', unitPrice: 0.25 },
  { id: '4', name: 'Lait', unit: 'ml', unitPrice: 0.002 },
  { id: '5', name: 'Beurre', unit: 'g', unitPrice: 0.012 },
  { id: '6', name: 'Sel', unit: 'g', unitPrice: 0.001 },
  { id: '7', name: 'Levure chimique', unit: 'g', unitPrice: 0.03 },
  { id: '8', name: 'Chocolat noir', unit: 'g', unitPrice: 0.02 },
  { id: '9', name: 'Vanille', unit: 'g', unitPrice: 0.05 },
  { id: '10', name: 'Fraises', unit: 'g', unitPrice: 0.015 },
  { id: '11', name: 'Poulet', unit: 'g', unitPrice: 0.012 },
  { id: '12', name: 'Riz', unit: 'g', unitPrice: 0.004 },
  { id: '13', name: 'Oignon', unit: 'pièce', unitPrice: 0.4 },
  { id: '14', name: 'Ail', unit: 'gousse', unitPrice: 0.2 },
  { id: '15', name: 'Huile d\'olive', unit: 'ml', unitPrice: 0.01 },
];

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Gâteau au chocolat',
    description: 'Un délicieux gâteau au chocolat fondant',
    prepTime: 20,
    cookTime: 30,
    isPublic: true,
    userId: '1',
    ingredients: [
      { ingredientId: '1', ingredient: mockIngredients[0], quantity: 200 },
      { ingredientId: '2', ingredient: mockIngredients[1], quantity: 150 },
      { ingredientId: '3', ingredient: mockIngredients[2], quantity: 3 },
      { ingredientId: '5', ingredient: mockIngredients[4], quantity: 100 },
      { ingredientId: '8', ingredient: mockIngredients[7], quantity: 200 },
    ],
    steps: [
      'Préchauffer le four à 180°C',
      'Faire fondre le chocolat avec le beurre',
      'Mélanger les œufs et le sucre',
      'Ajouter la farine et le mélange chocolat-beurre',
      'Verser dans un moule et enfourner pour 30 minutes'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=2089&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    name: 'Crêpes',
    description: 'Recette simple et rapide de crêpes',
    prepTime: 10,
    cookTime: 15,
    isPublic: true,
    userId: '1',
    ingredients: [
      { ingredientId: '1', ingredient: mockIngredients[0], quantity: 250 },
      { ingredientId: '2', ingredient: mockIngredients[1], quantity: 30 },
      { ingredientId: '3', ingredient: mockIngredients[2], quantity: 4 },
      { ingredientId: '4', ingredient: mockIngredients[3], quantity: 500 },
      { ingredientId: '6', ingredient: mockIngredients[5], quantity: 1 },
    ],
    steps: [
      'Mélanger tous les ingrédients jusqu\'à obtenir une pâte lisse',
      'Laisser reposer 1 heure',
      'Cuire les crêpes dans une poêle chaude'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3'
  },
  {
    id: '3',
    name: 'Poulet au riz',
    description: 'Un plat complet et savoureux',
    prepTime: 15,
    cookTime: 25,
    isPublic: false,
    userId: '1',
    ingredients: [
      { ingredientId: '11', ingredient: mockIngredients[10], quantity: 500 },
      { ingredientId: '12', ingredient: mockIngredients[11], quantity: 300 },
      { ingredientId: '13', ingredient: mockIngredients[12], quantity: 1 },
      { ingredientId: '14', ingredient: mockIngredients[13], quantity: 2 },
      { ingredientId: '15', ingredient: mockIngredients[14], quantity: 20 },
    ],
    steps: [
      'Faire revenir l\'oignon et l\'ail dans l\'huile d\'olive',
      'Ajouter le poulet et faire dorer',
      'Ajouter le riz et l\'eau',
      'Cuire à couvert pendant 20 minutes'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1604908554105-088645ba61f9?auto=format&fit=crop&q=80&w=1780&ixlib=rb-4.0.3'
  },
];

export const mockInventories: Inventory[] = [
  {
    id: '1',
    name: 'Placard cuisine',
    userId: '1',
    items: [
      { ingredientId: '1', ingredient: mockIngredients[0], quantity: 1000 },
      { ingredientId: '2', ingredient: mockIngredients[1], quantity: 500 },
      { ingredientId: '6', ingredient: mockIngredients[5], quantity: 100 },
      { ingredientId: '7', ingredient: mockIngredients[6], quantity: 50 },
    ]
  },
  {
    id: '2',
    name: 'Réfrigérateur',
    userId: '1',
    items: [
      { ingredientId: '3', ingredient: mockIngredients[2], quantity: 6 },
      { ingredientId: '4', ingredient: mockIngredients[3], quantity: 1000 },
      { ingredientId: '5', ingredient: mockIngredients[4], quantity: 250 },
      { ingredientId: '10', ingredient: mockIngredients[9], quantity: 300 },
    ]
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
  }
];

export const getPublicRecipes = (): Recipe[] => {
  return mockRecipes.filter(recipe => recipe.isPublic);
};

export const getUserRecipes = (userId: string): Recipe[] => {
  return mockRecipes.filter(recipe => recipe.userId === userId);
};

export const getRecipeById = (recipeId: string): Recipe | undefined => {
  return mockRecipes.find(recipe => recipe.id === recipeId);
};

export const getUserInventories = (userId: string): Inventory[] => {
  return mockInventories.filter(inventory => inventory.userId === userId);
};

export const getInventoryById = (inventoryId: string): Inventory | undefined => {
  return mockInventories.find(inventory => inventory.id === inventoryId);
};

export const getIngredientById = (ingredientId: string): Ingredient | undefined => {
  return mockIngredients.find(ingredient => ingredient.id === ingredientId);
};

export const getAllIngredients = (): Ingredient[] => {
  return mockIngredients;
};

export const calculateShoppingList = (recipeId: string, inventoryId: string) => {
  const recipe = getRecipeById(recipeId);
  const inventory = getInventoryById(inventoryId);
  
  if (!recipe || !inventory) return [];
  
  return recipe.ingredients.map(recipeItem => {
    const inventoryItem = inventory.items.find(item => item.ingredientId === recipeItem.ingredientId);
    
    // Calculate how much more we need
    const neededQuantity = inventoryItem 
      ? Math.max(0, recipeItem.quantity - inventoryItem.quantity)
      : recipeItem.quantity;
    
    return {
      ingredientId: recipeItem.ingredientId,
      ingredient: recipeItem.ingredient,
      quantity: neededQuantity,
      price: neededQuantity * recipeItem.ingredient.unitPrice,
    };
  }).filter(item => item.quantity > 0);
};
