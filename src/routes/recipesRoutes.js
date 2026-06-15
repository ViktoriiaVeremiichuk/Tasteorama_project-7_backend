import { Router } from "express";
import { celebrate } from "celebrate";

import {
  createRecipe,
  searchRecipes,
  addFavoriteRecipe,
  removeFavoriteRecipe,
  getRecipeByIdController,
  deleteOwnRecipe,
  getOwnRecipes,
  getFavoriteRecipes,
} from "../controllers/recipesController.js";

import { authenticate } from "../middleware/authenticate.js";
import { upload } from "../middleware/upload.js";
import { isValidRecipeId } from "../middleware/isValidRecipeId.js";

import {
  recipeIdParamSchema,
  recipeQuerySchema,
  createRecipeSchema,
  recipeSearchQuerySchema,
} from "../validation/recipesValidation.js";

const router = Router();

router.post(
  "/",
  /*
    #swagger.tags = ['Recipes']
    #swagger.summary = 'Create recipe'
    #swagger.description = 'Creates a new recipe'

    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  authenticate,
  upload.single("thumb"),
  celebrate(createRecipeSchema),
  createRecipe
);

router.get(
  "/search",
  /*
    #swagger.tags = ['Recipes']
    #swagger.summary = 'Search recipes'
    #swagger.description = 'Search recipes by filters'
  */
  celebrate(recipeSearchQuerySchema),
  searchRecipes
);

router.get(
  "/own",
  /*
    #swagger.tags = ['Recipes']
    #swagger.summary = 'Get own recipes'
    #swagger.description = 'Returns recipes created by current user'
router.get("/search", celebrate(recipeSearchQuerySchema), searchRecipes);


router.get(
  "/own",
  /*
    #swagger.tags = ['Recipes']
    #swagger.summary = 'Get own recipes'
    #swagger.description = 'Returns recipes created by current user'

    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  authenticate,
  celebrate(recipeQuerySchema),
  getOwnRecipes
);

router.get(
  "/favorite",
  /*
    #swagger.tags = ['Recipes']
    #swagger.summary = 'Get favorite recipes'
    #swagger.description = 'Returns favorite recipes of current user'

    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  authenticate,
  getFavoriteRecipes
);





    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  authenticate,
  celebrate(recipeQuerySchema),
  getOwnRecipes
);

router.get(
  "/favorite",
  /*
    #swagger.tags = ['Recipes']
    #swagger.summary = 'Get favorite recipes'
    #swagger.description = 'Returns favorite recipes of current user'

    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  authenticate,
  getFavoriteRecipes
);

router.post(
  "/favorites/:recipeId",
  /*
    #swagger.tags = ['Recipes']
    #swagger.summary = 'Add recipe to favorites'
    #swagger.description = 'Adds recipe to user favorites'

    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  isValidRecipeId,
  authenticate,
  addFavoriteRecipe
);

router.delete(
  "/favorites/:recipeId",
  /*
    #swagger.tags = ['Recipes']
    #swagger.summary = 'Remove recipe from favorites'
    #swagger.description = 'Removes recipe from user favorites'

    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  authenticate,
  celebrate(recipeIdParamSchema),
  removeFavoriteRecipe
);

router.delete(
  "/:recipeId",
  /*
    #swagger.tags = ['Recipes']
    #swagger.summary = 'Delete own recipe'
    #swagger.description = 'Deletes recipe created by current user'

    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  isValidRecipeId,
  authenticate,
  deleteOwnRecipe
);

router.get(
  "/:recipeId",
  /*
    #swagger.tags = ['Recipes']
    #swagger.summary = 'Get recipe by id'
    #swagger.description = 'Returns recipe details by id'
  */
  isValidRecipeId,
  getRecipeByIdController
);

export default router;