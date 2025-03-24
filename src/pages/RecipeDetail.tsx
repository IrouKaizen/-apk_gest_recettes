
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRecipeById, getUserInventories, calculateShoppingList } from '@/utils/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ShoppingCart, Clock, Pencil, Trash2, ChevronLeft, Lock, Unlock, ChefHat } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ShoppingListItem } from '@/types';
import { useToast } from '@/hooks/use-toast';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedInventoryId, setSelectedInventoryId] = useState<string | null>(null);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [showShoppingListDialog, setShowShoppingListDialog] = useState(false);

  const recipe = id ? getRecipeById(id) : undefined;
  const userInventories = authState.user ? getUserInventories(authState.user.id) : [];
  const isOwner = recipe?.userId === authState.user?.id;

  const handleGenerateShoppingList = () => {
    if (!id || !selectedInventoryId) return;
    
    const list = calculateShoppingList(id, selectedInventoryId);
    setShoppingList(list);
    setShowShoppingListDialog(true);
  };

  const handleDelete = () => {
    // Mock delete functionality
    toast({
      title: "Recette supprimée",
      description: "La recette a été supprimée avec succès",
    });
    navigate('/recipes');
  };

  if (!recipe) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Recette non trouvée</h1>
        <p className="text-muted-foreground mb-6">La recette que vous recherchez n'existe pas ou a été supprimée.</p>
        <Link to="/recipes">
          <Button>Retour aux recettes</Button>
        </Link>
      </div>
    );
  }

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="container py-8 animate-fade-in">
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">{recipe.name}</h1>
              {recipe.isPublic ? (
                <Badge variant="secondary" className="gap-1">
                  <Unlock className="h-3 w-3" />
                  Public
                </Badge>
              ) : (
                <Badge variant="outline" className="gap-1">
                  <Lock className="h-3 w-3" />
                  Privé
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{recipe.description}</p>
          </div>
          
          {isOwner && (
            <div className="flex gap-2">
              <Link to={`/recipes/${recipe.id}/edit`}>
                <Button variant="outline" size="sm" className="gap-1">
                  <Pencil className="h-4 w-4" />
                  Modifier
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="gap-1 text-destructive hover:text-destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
                Supprimer
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg overflow-hidden h-64 sm:h-96 mb-8">
            {recipe.imageUrl ? (
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                <ChefHat className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="py-4">
                <CardDescription>Temps de préparation</CardDescription>
                <CardTitle>{recipe.prepTime} min</CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="py-4">
                <CardDescription>Temps de cuisson</CardDescription>
                <CardTitle>{recipe.cookTime} min</CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="py-4">
                <CardDescription>Temps total</CardDescription>
                <CardTitle>{totalTime} min</CardTitle>
              </CardHeader>
            </Card>
          </div>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Ingrédients</CardTitle>
                <CardDescription>Liste des ingrédients nécessaires</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recipe.ingredients.map((item) => (
                    <li key={item.ingredientId} className="flex justify-between items-center py-2 border-b border-border/40 last:border-0">
                      <span>{item.ingredient.name}</span>
                      <span className="text-muted-foreground">
                        {item.quantity} {item.ingredient.unit}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
                <CardDescription>Étapes de préparation</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {recipe.steps.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1 pt-1">
                        <p>{step}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Générer une liste de courses</CardTitle>
              <CardDescription>
                Comparez les ingrédients de cette recette avec votre inventaire
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userInventories.length > 0 ? (
                <>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Sélectionnez un inventaire :</h4>
                    <div className="space-y-2">
                      {userInventories.map((inventory) => (
                        <div
                          key={inventory.id}
                          className={`border rounded-md p-3 cursor-pointer transition-all ${
                            selectedInventoryId === inventory.id
                              ? 'border-primary bg-primary/5'
                              : 'hover:border-input'
                          }`}
                          onClick={() => setSelectedInventoryId(inventory.id)}
                        >
                          <div className="font-medium">{inventory.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {inventory.items.length} ingrédient(s)
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    className="w-full"
                    onClick={handleGenerateShoppingList}
                    disabled={!selectedInventoryId}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Générer la liste
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-center py-4">
                    <div className="bg-muted rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <ShoppingCart className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h4 className="font-medium mb-1">Aucun inventaire</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Créez un inventaire pour générer des listes de courses
                    </p>
                    <Link to="/inventories">
                      <Button variant="outline" size="sm">
                        Créer un inventaire
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Shopping List Dialog */}
      <Dialog open={showShoppingListDialog} onOpenChange={setShowShoppingListDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Liste de courses</DialogTitle>
            <DialogDescription>
              Ingrédients nécessaires pour {recipe.name}
            </DialogDescription>
          </DialogHeader>
          
          {shoppingList.length > 0 ? (
            <>
              <div className="max-h-[60vh] overflow-y-auto">
                <div className="space-y-3">
                  {shoppingList.map((item) => (
                    <div key={item.ingredientId} className="flex justify-between">
                      <span>
                        {item.ingredient.name} ({item.quantity} {item.ingredient.unit})
                      </span>
                      <span className="text-muted-foreground">
                        {(item.price).toFixed(2)} €
                      </span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>
                    {shoppingList.reduce((sum, item) => sum + item.price, 0).toFixed(2)} €
                  </span>
                </div>
              </div>
              
              <DialogFooter>
                <Button
                  type="button"
                  onClick={() => {
                    toast({
                      title: "Liste ajoutée",
                      description: "La liste a été ajoutée à vos courses",
                    });
                    setShowShoppingListDialog(false);
                  }}
                >
                  Ajouter à ma liste
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="bg-muted rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <ShoppingCart className="h-6 w-6 text-muted-foreground" />
              </div>
              <h4 className="font-medium mb-1">Aucun ingrédient manquant</h4>
              <p className="text-sm text-muted-foreground">
                Vous avez tous les ingrédients nécessaires dans votre inventaire.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecipeDetail;
