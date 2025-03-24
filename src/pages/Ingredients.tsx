
import React, { useState } from 'react';
import { getAllIngredients } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Plus, Search } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

const ingredientSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  unit: z.string().min(1, { message: 'Veuillez spécifier une unité' }),
  unitPrice: z.coerce.number().min(0, { message: 'Le prix doit être positif' }),
});

type IngredientFormValues = z.infer<typeof ingredientSchema>;

const Ingredients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: {
      name: '',
      unit: '',
      unitPrice: 0,
    },
  });

  const ingredients = getAllIngredients();
  const filteredIngredients = ingredients.filter(ingredient => 
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = (data: IngredientFormValues) => {
    // Mock adding an ingredient
    toast({
      title: "Ingrédient ajouté",
      description: `L'ingrédient ${data.name} a été ajouté avec succès`,
    });
    setShowAddDialog(false);
    form.reset();
  };

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Ingrédients</h1>
          <p className="text-muted-foreground">
            Gérez votre catalogue d'ingrédients
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
          
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Nouvel Ingrédient
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un ingrédient</DialogTitle>
                <DialogDescription>
                  Complétez les informations pour ajouter un nouvel ingrédient à votre catalogue.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Farine, Sucre, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unité</FormLabel>
                        <FormControl>
                          <Input placeholder="g, ml, pièce, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="unitPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prix unitaire (€)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="submit">Ajouter</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des ingrédients</CardTitle>
          <CardDescription>
            {filteredIngredients.length} ingrédient(s) dans votre catalogue
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredIngredients.length > 0 ? (
            <div className="border rounded-md divide-y">
              <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm bg-muted/50">
                <div className="col-span-5">Nom</div>
                <div className="col-span-3">Unité</div>
                <div className="col-span-4">Prix unitaire</div>
              </div>
              
              {filteredIngredients.map((ingredient) => (
                <div key={ingredient.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                  <div className="col-span-5">{ingredient.name}</div>
                  <div className="col-span-3 text-muted-foreground">{ingredient.unit}</div>
                  <div className="col-span-4 text-muted-foreground">{ingredient.unitPrice.toFixed(3)} € / {ingredient.unit}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted rounded-full p-4 mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">Aucun ingrédient trouvé</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Aucun ingrédient ne correspond à votre recherche.
              </p>
              <Button onClick={() => setShowAddDialog(true)}>
                Ajouter un ingrédient
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Ingredients;
