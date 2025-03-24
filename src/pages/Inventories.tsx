
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserInventories } from '@/utils/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus, Package } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

const inventorySchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
});

type InventoryFormValues = z.infer<typeof inventorySchema>;

const Inventories: React.FC = () => {
  const { authState } = useAuth();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<InventoryFormValues>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      name: '',
    },
  });

  const inventories = authState.user ? getUserInventories(authState.user.id) : [];

  const onSubmit = (data: InventoryFormValues) => {
    // Mock adding an inventory
    toast({
      title: "Inventaire créé",
      description: `L'inventaire ${data.name} a été créé avec succès`,
    });
    setShowAddDialog(false);
    form.reset();
  };

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Mes Inventaires</h1>
          <p className="text-muted-foreground">
            Gérez vos inventaires d'ingrédients
          </p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouvel Inventaire
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un inventaire</DialogTitle>
              <DialogDescription>
                Donnez un nom à votre nouvel inventaire.
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
                        <Input placeholder="Placard cuisine, Réfrigérateur, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit">Créer</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {inventories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {inventories.map((inventory) => (
            <Card key={inventory.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg border-border/40 hover:border-primary/20">
              <CardHeader className="pb-4">
                <CardTitle>{inventory.name}</CardTitle>
                <CardDescription>{inventory.items.length} ingrédient(s)</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-6">
                {inventory.items.length > 0 ? (
                  <ul className="space-y-1">
                    {inventory.items.slice(0, 3).map((item) => (
                      <li key={item.ingredientId} className="text-sm text-muted-foreground">
                        {item.ingredient.name}: {item.quantity} {item.ingredient.unit}
                      </li>
                    ))}
                    {inventory.items.length > 3 && (
                      <li className="text-sm text-muted-foreground">
                        + {inventory.items.length - 3} autre(s) ingrédient(s)
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Aucun ingrédient dans cet inventaire
                  </p>
                )}
              </CardContent>
              
              <CardFooter className="pt-0">
                <Link to={`/inventories/${inventory.id}`} className="w-full">
                  <Button variant="outline" className="w-full">Voir les détails</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted rounded-full p-4 mb-4">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">Aucun inventaire</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            Vous n'avez pas encore créé d'inventaire. Commencez par en créer un nouveau.
          </p>
          <Button onClick={() => setShowAddDialog(true)}>
            Créer mon premier inventaire
          </Button>
        </div>
      )}
    </div>
  );
};

export default Inventories;
