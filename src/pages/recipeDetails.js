import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, List, ListItem, ListItemText, Button, Box, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("ID récupéré depuis l'URL :", id);
    if (!id) {
      setError("ID invalide.");
      setLoading(false);
      return;
    }
  
    axios.get(`https://localhost:7149/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors du chargement de la recette :", error);
        setError("Impossible de charger la recette.");
        setLoading(false);
      });
  }, [id]);


  const handleDelete = () => {
    axios.delete(`https://localhost:7149/recipes/${id}`)
      .then(() => {
        navigate("/"); 
      })
      .catch(error => {
        console.error("Erreur lors de la suppression de la recette :", error);
        setError("Erreur lors de la suppression.");
      });
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  if (!recipe) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h6" color="textSecondary">Recette non trouvée.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Button onClick={() => navigate("/")} variant="contained" sx={{ mb: 2 }}>
        Retour à la liste
      </Button>
      <Card sx={{ p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>{recipe.name}</Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>Ingrédients :</Typography>
          <List dense>
            {recipe.ingredients.map((ingredient, i) => (
              <ListItem key={i}>
                <ListItemText primary={`${ingredient.name} - ${ingredient.quantity}`} />
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" sx={{ mt: 2 }}>Instructions :</Typography>
          <ul style={{ paddingLeft: "20px" }}>
            {recipe.instructions.split("\n").map((instruction, i) => (
              <li key={i} style={{ marginBottom: "8px" }}>{instruction}</li>
            ))}
          </ul>
          
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => navigate(`/edit/${id}`)}
            >
              Modifier
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={handleDelete}
            >
              Supprimer
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
