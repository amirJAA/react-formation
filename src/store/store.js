import { configureStore, createSlice } from "@reduxjs/toolkit";


const recipesSlice = createSlice({
  name: "recipes",
  initialState: [],
  reducers: {
    setRecipes: (state, action) => {
      return action.payload; 
    },
    addRecipe: (state, action) => {
      state.push(action.payload); 
    },
    deleteRecipe: (state, action) => {
      return state.filter(recipe => recipe.id !== action.payload); 
    },
  },
});


const currentRecipeSlice = createSlice({
  name: "currentRecipe",
  initialState: {
    title: "",
    ingredients: [{ name: "", quantity: "" }],
    instructions: "",
    isEditing: false,
  },
  reducers: {
    setCurrentRecipeData: (state, action) => {
      const { title, ingredients, instructions, isEditing } = action.payload;
      state.title = title;
      state.ingredients = ingredients;
      state.instructions = instructions;
      state.isEditing = isEditing;
    },
    updateCurrentRecipeTitle: (state, action) => {
      state.title = action.payload;
    },
    updateCurrentRecipeIngredient: (state, action) => {
      const { index, key, value } = action.payload;
      state.ingredients[index][key] = value;
    },
    addCurrentRecipeIngredient: (state) => {
      state.ingredients.push({ name: "", quantity: "" });
    },
    updateCurrentRecipeInstructions: (state, action) => {
      state.instructions = action.payload;
    },
  },
});

export const {
  setRecipes,
  addRecipe,
  deleteRecipe,
} = recipesSlice.actions;

export const {
  setCurrentRecipeData,
  updateCurrentRecipeTitle,
  updateCurrentRecipeIngredient,
  addCurrentRecipeIngredient,
  updateCurrentRecipeInstructions,
} = currentRecipeSlice.actions;

const store = configureStore({
  reducer: {
    recipes: recipesSlice.reducer,
    currentRecipe: currentRecipeSlice.reducer,
  },
});

export default store;
