
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, BookOpen, Package, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Home: React.FC = () => {
  const { authState } = useAuth();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Gérez vos recettes et<br />ingredients facilement
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              RecipeGuru vous permet de créer, gérer et partager vos recettes tout en suivant vos inventaires d'ingrédients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {authState.isAuthenticated ? (
                <Link to="/recipes">
                  <Button size="lg" className="w-full sm:w-auto">
                    Mes Recettes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" className="w-full sm:w-auto">
                      Créer un compte
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Se connecter
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="relative mx-auto mt-8 mb-12 max-w-4xl overflow-hidden rounded-xl shadow-2xl">
            <div className="aspect-video bg-muted">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="RecipeGuru App" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Toutes les fonctionnalités dont vous avez besoin
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Gérez tous les aspects de vos recettes et de vos ingrédients dans une seule application.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Book className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Gestion de recettes</CardTitle>
              <CardDescription>
                Créez et organisez vos recettes personnelles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ajoutez les ingrédients, les étapes de préparation et les temps de cuisson. Marquez vos recettes comme publiques ou privées.
              </p>
            </CardContent>
            <CardFooter>
              <Link to={authState.isAuthenticated ? "/recipes" : "/signup"} className="text-primary text-sm font-medium hover:underline flex items-center">
                En savoir plus
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Recettes publiques</CardTitle>
              <CardDescription>
                Découvrez les recettes partagées par d'autres.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Explorez une diversité de recettes publiées par d'autres utilisateurs pour trouver de l'inspiration.
              </p>
            </CardContent>
            <CardFooter>
              <Link to={authState.isAuthenticated ? "/public-recipes" : "/signup"} className="text-primary text-sm font-medium hover:underline flex items-center">
                En savoir plus
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Gestion d'inventaires</CardTitle>
              <CardDescription>
                Suivez vos ingrédients disponibles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Créez plusieurs inventaires pour organiser et suivre les quantités d'ingrédients que vous avez en stock.
              </p>
            </CardContent>
            <CardFooter>
              <Link to={authState.isAuthenticated ? "/inventories" : "/signup"} className="text-primary text-sm font-medium hover:underline flex items-center">
                En savoir plus
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Liste de courses</CardTitle>
              <CardDescription>
                Générez des listes d'achats automatiquement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Comparez les ingrédients nécessaires pour vos recettes avec votre inventaire pour créer des listes de courses précises.
              </p>
            </CardContent>
            <CardFooter>
              <Link to={authState.isAuthenticated ? "/shopping-list" : "/signup"} className="text-primary text-sm font-medium hover:underline flex items-center">
                En savoir plus
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
