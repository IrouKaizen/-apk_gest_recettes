
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

// Pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Recipes from "@/pages/Recipes";
import PublicRecipes from "@/pages/PublicRecipes";
import RecipeDetail from "@/pages/RecipeDetail";
import Ingredients from "@/pages/Ingredients";
import Inventories from "@/pages/Inventories";
import InventoryDetail from "@/pages/InventoryDetail";
import ShoppingList from "@/pages/ShoppingList";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route 
              path="/recipes" 
              element={
                <ProtectedRoute>
                  <Recipes />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/recipes/:id" 
              element={
                <ProtectedRoute>
                  <RecipeDetail />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/public-recipes" 
              element={
                <ProtectedRoute>
                  <PublicRecipes />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/ingredients" 
              element={
                <ProtectedRoute>
                  <Ingredients />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/inventories" 
              element={
                <ProtectedRoute>
                  <Inventories />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/inventories/:id" 
              element={
                <ProtectedRoute>
                  <InventoryDetail />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/shopping-list" 
              element={
                <ProtectedRoute>
                  <ShoppingList />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
