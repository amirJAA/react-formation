import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  setCurrentRecipeData,
  updateCurrentRecipeTitle,
  updateCurrentRecipeIngredient,
  addCurrentRecipeIngredient,
  updateCurrentRecipeInstructions,
} from "../store/store";

export default function RecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.currentRecipe);
  const { title, ingredients, instructions, isEditing } = recipe;

  useEffect(() => {
    if (id) {
      axios.get(`https://localhost:7149/recipes/${id}`)
        .then(response => {
          const recipeData = response.data;
          dispatch(setCurrentRecipeData({
            title: recipeData.name,
            ingredients: recipeData.ingredients.length ? recipeData.ingredients : [{ name: "", quantity: "" }],
            instructions: recipeData.instructions,
            isEditing: true,
          }));
        })
        .catch(error => console.error("Erreur de chargement de la recette :", error));
    }
  }, [id, dispatch]);

  const handleSubmit = () => {
    const recipeData = {
      name: title,
      ingredients,
      instructions,
    };

    if (isEditing) {
      axios.put(`https://localhost:7149/recipes/${id}`, recipeData)
        .then(() => {
          navigate("/");
        })
        .catch(error => console.error("Erreur lors de la modification de la recette :", error));
    } else {
      axios.post("https://localhost:7149/recipes", recipeData)
        .then(() => {
          navigate("/");
        })
        .catch(error => console.error("Erreur lors de la création de la recette :", error));
    }
  };

  const handleIngredientChange = (i, key, value) => {
    dispatch(updateCurrentRecipeIngredient({ index: i, key, value }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Button onClick={() => navigate("/")} variant="contained" sx={{ mb: 2 }}>
        Retour à la liste
      </Button>
      <Typography variant="h4">{isEditing ? "Modifier la Recette" : "Créer une Recette"}</Typography>

      <TextField
        fullWidth
        label="Titre de la recette"
        value={title}
        onChange={(e) => dispatch(updateCurrentRecipeTitle(e.target.value))}
        sx={{ mt: 2 }}
      />

      <Typography variant="h6" sx={{ mt: 2 }}>Ingrédients</Typography>
      {ingredients.map((ingredient, i) => (
        <Box key={i} sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <TextField
            fullWidth
            label="Nom de l'ingrédient"
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(i, "name", e.target.value)}
          />
          <TextField
            fullWidth
            label="Quantité"
            value={ingredient.quantity}
            onChange={(e) => handleIngredientChange(i, "quantity", e.target.value)}
            sx={{ ml: 1 }}
          />
        </Box>
      ))}
      <Button onClick={() => dispatch(addCurrentRecipeIngredient())} variant="contained" sx={{ mt: 3 }}>
        + Ajouter un ingrédient
      </Button>

      <Typography variant="h6" sx={{ mt: 2 }}>Instructions</Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={instructions}
        onChange={(e) => dispatch(updateCurrentRecipeInstructions(e.target.value))}
      />

      <Button onClick={handleSubmit} variant="contained" sx={{ mt: 3 }}>
        {isEditing ? "Modifier la recette" : "Créer la recette"}
      </Button>
    </Container>
  );
}
