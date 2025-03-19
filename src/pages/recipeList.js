import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Container, Typography, List, ListItem, Button, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setRecipes } from "../store/store";

export default function RecipeList() {
  const recipes = useSelector((state) => state.recipes); 
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://localhost:7149/recipes") 
      .then(response => {
        dispatch(setRecipes(response.data)); 
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des recettes :", error);
      });
  }, [dispatch]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Liste des Recettes</Typography>
      
      {recipes.length === 0 ? (
        <Typography variant="h6" color="textSecondary">Aucune recette disponible.</Typography>
      ) : (
        <List>
          {recipes.map((recipe) => (
            <ListItem 
              key={recipe.id} 
              button 
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              sx={{ mb: 1, bgcolor: "#f5f5f5", borderRadius: 2 }}
            >
              <ListItemText primary={recipe.name} />
            </ListItem>
          ))}
        </List>
      )}
      <Button onClick={() => navigate(`/create`)} variant="contained" sx={{ mt: 3 }}>Nouvelle recette</Button>
    </Container>
  );
}