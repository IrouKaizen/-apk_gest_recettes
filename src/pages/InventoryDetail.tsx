
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getInventoryById, getAllIngredients } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, Plus, Search, Trash2 } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

const addIngredientSchema = z.object({
  ingredientId: z.string().min(1, { message: 'Veuillez sélectionner un ingrédient' }),
  quantity: z.coerce.number().positive({ message: 'La quantité doit être positive' }),
});

type AddIngredientFormValues = z.infer<typeof addIngredientSchema>;

const InventoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const inventory = id ? getInventoryById(id) : undefined;
  const allIngredients = getAllIngredients();
  
  const form = useForm<AddIngredientFormValues>({
    resolver: zodResolver(addIngredientSchema),
    defaultValues: {
      ingredientId: '',
      quantity: 0,
    },
  });

  const filteredItems = inventory?.items.filter(item => 
    item.ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const onSubmit = (data: AddIngredientFormValues) => {
    // Mock adding an ingredient to inventory
    const ingredient = allIngredients.find(ing => ing.id === data.ingredientId);
    if (ingredient) {
      toast({
        title: "Ingrédient ajouté",
        description: `${data.quantity} ${ingredient.unit} de ${ingredient.name} ont été ajoutés à l'inventaire`,
      });
      setShowAddDialog(false);
      form.reset();
    }
  };

  const handleDelete = () => {
    // Mock delete functionality
    toast({
      title: "Inventaire supprimé",
      description: "L'inventaire a été supprimé avec succès",
    });
    navigate('/inventories');
  };

  if (!inventory) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Inventaire non trouvé</h1>
        <p className="text-muted-foreground mb-6">L'inventaire que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link to="/inventories">
          <Button>Retour aux inventaires</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fade-in">
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">{inventory.name}</h1>
            <p className="text-muted-foreground">
              {inventory.items.length} ingrédient(s) dans cet inventaire
            </p>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="flex-1 sm:flex-none">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un ingrédient
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un ingrédient</DialogTitle>
                  <DialogDescription>
                    Ajoutez un ingrédient à votre inventaire {inventory.name}.
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="ingredientId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ingrédient</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez un ingrédient" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {allIngredients.map((ingredient) => (
                                <SelectItem key={ingredient.id} value={ingredient.id}>
                                  {ingredient.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantité</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.1" {...field} />
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
            
            <Button variant="outline" className="flex-1 sm:flex-none" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </Button>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Ingrédients</CardTitle>
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
            <div className="border rounded-md divide-y">
              <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm bg-muted/50">
                <div className="col-span-6 sm:col-span-8">Ingrédient</div>
                <div className="col-span-4 sm:col-span-3">Quantité</div>
                <div className="col-span-2 sm:col-span-1"></div>
              </div>
              
              {filteredItems.map((item) => (
                <div key={item.ingredientId} className="grid grid-cols-12 gap-4 p-4 items-center">
                  <div className="col-span-6 sm:col-span-8">{item.ingredient.name}</div>
                  <div className="col-span-4 sm:col-span-3 text-muted-foreground">
                    {item.quantity} {item.ingredient.unit}
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex justify-end">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : searchTerm ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted rounded-full p-4 mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">Aucun ingrédient trouvé</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Aucun ingrédient ne correspond à votre recherche.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted rounded-full p-4 mb-4">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">Aucun ingrédient</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Commencez par ajouter des ingrédients à votre inventaire.
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

export default InventoryDetail;
