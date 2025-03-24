
import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ChefHat, Lock, Unlock } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  showPrivateLabel?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, showPrivateLabel = true }) => {
  return (
    <Link to={`/recipes/${recipe.id}`}>
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg border-border/40 hover:border-primary/20 group">
        <div className="relative w-full h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
          {recipe.imageUrl ? (
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted/50 flex items-center justify-center">
              <ChefHat className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          
          {showPrivateLabel && (
            <div className="absolute top-3 right-3 z-20">
              {recipe.isPublic ? (
                <Badge variant="secondary" className="gap-1">
                  <Unlock className="h-3 w-3" />
                  Public
                </Badge>
              ) : (
                <Badge variant="outline" className="gap-1 bg-background/80">
                  <Lock className="h-3 w-3" />
                  Privé
                </Badge>
              )}
            </div>
          )}
        </div>
        
        <CardHeader className="pb-2">
          <h3 className="text-xl font-semibold tracking-tight line-clamp-1">{recipe.name}</h3>
        </CardHeader>
        
        <CardContent className="pb-4">
          <p className="text-muted-foreground text-sm line-clamp-2 h-10">{recipe.description}</p>
        </CardContent>
        
        <CardFooter className="flex items-center text-sm text-muted-foreground pt-0">
          <div className="flex items-center mr-4">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="flex items-center">
            <span>{recipe.ingredients.length} ingrédients</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard;
