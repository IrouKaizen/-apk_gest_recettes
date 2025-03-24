
import React, { useState } from 'react';
import { getPublicRecipes } from '@/utils/mockData';
import RecipeCard from '@/components/RecipeCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const PublicRecipes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const publicRecipes = getPublicRecipes();
  
  const filteredRecipes = publicRecipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Recettes Publiques</h1>
          <p className="text-muted-foreground">
            Découvrez des recettes partagées par d'autres utilisateurs
          </p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} showPrivateLabel={false} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted rounded-full p-4 mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">Aucune recette trouvée</h3>
          <p className="text-muted-foreground max-w-md">
            Aucune recette publique ne correspond à votre recherche. Essayez avec d'autres termes.
          </p>
        </div>
      )}
    </div>
  );
};

export default PublicRecipes;
