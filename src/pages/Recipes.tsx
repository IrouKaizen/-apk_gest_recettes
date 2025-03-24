
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getUserRecipes } from '@/utils/mockData';
import RecipeCard from '@/components/RecipeCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';

const Recipes: React.FC = () => {
  const { authState } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  const userRecipes = authState.user ? getUserRecipes(authState.user.id) : [];
  
  const filteredRecipes = userRecipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Mes Recettes</h1>
          <p className="text-muted-foreground">
            Gérez vos recettes personnelles
          </p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Link to="/recipes/new">
            <Button className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouvelle Recette
            </Button>
          </Link>
        </div>
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : searchTerm ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted rounded-full p-4 mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">Aucune recette trouvée</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            Aucune recette ne correspond à votre recherche. Essayez avec d'autres termes ou créez une nouvelle recette.
          </p>
          <Link to="/recipes/new">
            <Button>Créer une nouvelle recette</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted rounded-full p-4 mb-4">
            <PlusCircle className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">Aucune recette</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            Vous n'avez pas encore créé de recettes. Commencez par en créer une nouvelle.
          </p>
          <Link to="/recipes/new">
            <Button>Créer ma première recette</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Recipes;
