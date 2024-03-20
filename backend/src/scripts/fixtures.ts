import { Recipe } from "../entities/Recipe";
import { dataSource } from "../datasource";

const recipesData = [
  {
    title: "Spaghetti Carbonara",
    description: "Classic Italian pasta dish with bacon, eggs, and cheese.",
  },
  {
    title: "Chicken Alfredo",
    description: "Creamy pasta dish with grilled chicken and Parmesan cheese.",
  },
  {
    title: "Vegetable Stir-Fry",
    description: "Healthy stir-fry with assorted vegetables and tofu.",
  },
  {
    title: "Homemade Pizza",
    description: "Delicious pizza made from scratch with fresh ingredients.",
  },
  {
    title: "Chocolate Chip Cookies",
    description: "Classic homemade cookies with gooey chocolate chips.",
  },
];
async function generateAndSaveFixtures() {
  try {
    await dataSource.initialize();
    const savedRecipes = await Promise.all(
      recipesData.map(async (recipeData) => {
        const recipe = new Recipe();
        recipe.title = recipeData.title;
        recipe.description = recipeData.description;
        return await recipe.save();
      })
    );
    console.log("Recettes enregistrées avec succès:", savedRecipes.length);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des recettes:", error);
  } finally {
    await dataSource.destroy();
  }
}
generateAndSaveFixtures();
