
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, ShoppingCart, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock shopping list data
const mockShoppingList = [
  { id: '1', name: 'Farine', quantity: 500, unit: 'g', price: 1.0, completed: false },
  { id: '2', name: 'Œufs', quantity: 6, unit: 'pièce', price: 1.5, completed: false },
  { id: '3', name: 'Lait', quantity: 1, unit: 'L', price: 0.95, completed: false },
  { id: '4', name: 'Sucre', quantity: 250, unit: 'g', price: 0.75, completed: false },
  { id: '5', name: 'Beurre', quantity: 200, unit: 'g', price: 2.25, completed: false },
];

const ShoppingList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState(mockShoppingList);
  const { toast } = useToast();

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPrice = filteredItems.reduce((sum, item) => sum + (item.completed ? 0 : item.price), 0);
  const completedCount = items.filter(item => item.completed).length;

  const toggleItemCompleted = (id: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const clearCompletedItems = () => {
    if (completedCount === 0) return;
    
    setItems(prevItems => prevItems.filter(item => !item.completed));
    toast({
      title: "Liste nettoyée",
      description: `${completedCount} article(s) complété(s) ont été supprimés`,
    });
  };

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Liste de Courses</h1>
          <p className="text-muted-foreground">
            Gérez vos achats à faire
          </p>
        </div>
        
        {completedCount > 0 && (
          <Button variant="outline" onClick={clearCompletedItems}>
            <Trash2 className="mr-2 h-4 w-4" />
            Supprimer les articles complétés ({completedCount})
          </Button>
        )}
      </div>
      
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Articles ({filteredItems.length})</CardTitle>
          </div>
          
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
        </CardHeader>
        
        <CardContent>
          {filteredItems.length > 0 ? (
            <div className="space-y-4">
              <div className="border rounded-md divide-y">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id} 
                    className={`flex items-center justify-between p-4 transition-colors ${
                      item.completed ? 'bg-muted/30' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Checkbox 
                        id={`item-${item.id}`}
                        checked={item.completed}
                        onCheckedChange={() => toggleItemCompleted(item.id)}
                      />
                      <label 
                        htmlFor={`item-${item.id}`}
                        className={`text-sm flex-1 ${item.completed ? 'line-through text-muted-foreground' : ''}`}
                      >
                        {item.name} ({item.quantity} {item.unit})
                      </label>
                      <div className={`text-sm ${item.completed ? 'text-muted-foreground line-through' : ''}`}>
                        {item.price.toFixed(2)} €
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center border-t pt-4 mt-6">
                <div className="font-medium">Total</div>
                <div className="font-medium">{totalPrice.toFixed(2)} €</div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted rounded-full p-4 mb-4">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">Liste de courses vide</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                {searchTerm ? "Aucun article ne correspond à votre recherche." : "Ajoutez des articles à partir des recettes pour remplir votre liste de courses."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingList;
