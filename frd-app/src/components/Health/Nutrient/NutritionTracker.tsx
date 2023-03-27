import React, { useState } from "react";
import "./Nutrient.css";
import { useDispatch } from "react-redux";

const API_KEY = "nohVmcYxyGXqKGGIEAVyKDfes1fYC8prMvht7gJC";

type Meals = {
  id: number;
  meal: string;
};

// type Food = {
//   fdcId: number;
//   description: string;
// };

type Nutrient = {
  id: number;
  foodName: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
};

export const NutritionTracker = () => {
  const [meals, setMeals] = useState<Meals[]>([]);
  const [nutrients, setNutrients] = useState<{ [key: number]: Nutrient[] }>({});
  const dispatch = useDispatch();

  const handleAddMeal = () => {
    const mealSelect = document.querySelector(
      ".select-meal-type"
    ) as HTMLSelectElement;

    // if no choose meal type, it will return nothing
    if (mealSelect.value === "") {
      return;
    }

    setMeals([...meals, { id: meals.length + 1, meal: mealSelect.value }]);

    // reset the select tag value
    mealSelect.value = "";
  };

  const nutrientSearch =
    (mealId: number) => async (event: React.MouseEvent<HTMLButtonElement>) => {
      const foodName = document.querySelector(
        `.food-search-bar-${mealId}`
      ) as HTMLInputElement;

      if (foodName.value === "") {
        return;
      }

      await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${foodName.value}`
      )
        .then((response) => response.json())
        .then((data) => {
          const foodItem = data.foods[0];
          const foodNutrients = foodItem.foodNutrients;

          // Find the nutrient with ID 1008, which corresponds to calories
          const caloriesNutrient = foodNutrients.find(
            (nutrient: { nutrientId: number }) => nutrient.nutrientId === 1008
          );

          // Find the nutrient with ID 1005, which corresponds to carbohydrates
          const carbsNutrient = foodNutrients.find(
            (nutrient: { nutrientId: number }) => nutrient.nutrientId === 1005
          );

          // Find the nutrient with ID 1008, which corresponds to protein
          const proteinNutrient = foodNutrients.find(
            (nutrient: { nutrientId: number }) => nutrient.nutrientId === 1003
          );

          // Find the nutrient with ID 1008, which corresponds to fat
          const fatNutrient = foodNutrients.find(
            (nutrient: { nutrientId: number }) => nutrient.nutrientId === 1004
          );

          setNutrients({
            ...nutrients,
            [mealId]: [
              ...(nutrients[mealId] || []),
              {
                id: nutrients[mealId] ? nutrients[mealId].length + 1 : 1,
                foodName: foodName.value,
                calories: caloriesNutrient.value,
                carbs: carbsNutrient.value,
                protein: proteinNutrient.value,
                fat: fatNutrient.value,
              },
            ],
          });

          dispatch({
            type: "INCREMENT",
            calories: caloriesNutrient.value,
            carbs: carbsNutrient.value,
            protein: proteinNutrient.value,
            fat: fatNutrient.value,
          });
          foodName.value = "";
        })
        .catch((error) => console.error(error));
    };

  return (
    <div className="food-tracker-container">
      <header>
        <div>Food tracking</div>
        <select
          className="select-meal-type"
          // onChange={handleMealTypeChange}
        >
          <option value="">Select meal type</option>
          <option value="Breakfast">breakfast</option>
          <option value="Brunch">brunch</option>
          <option value="Lunch">lunch</option>
          <option value="Tea">tea</option>
          <option value="Snack">snack</option>
          <option value="Dinner">dinner</option>
          <option value="Siu Ye">siu ye</option>
        </select>
        <button className="add-mealBtn" onClick={handleAddMeal}>
          Add meal
        </button>
      </header>

      {/* show each meal and the intake food */}
      {meals.map((meal) => (
        <div className="meal-container" key={meal.id}>
          <div className="meal-type">{meal.meal}</div>
          <div className="food-search-container">
            <div className="food-search-result">
              <input
                className={`food-search-bar-${meal.id}`}
                placeholder="Enter food name"
                type="text"
                key={`search-input-${meal.id}`}
                // onChange={() => handleSearchInputChange}
              />
              {/* <ul className="nutrient-ul">
              {searchResults.map((food: Food) => (
                <li
                className="nutrient-li"
                  key={food.fdcId}
                  onClick={() => handleSearchResultClick(food)}
                >
                  {food.description}
                </li>
              ))}
            </ul> */}
            </div>
            <button
              className="nutrient-addBtn"
              onClick={nutrientSearch(meal.id)}
            >
              +
            </button>
          </div>

          <div className="intake-history-container">
            {nutrients[meal.id] &&
              nutrients[meal.id].map((nutrient) => (
                <div className="intake-history" key={nutrient.id}>
                  <div className="food-name-calories-container">
                    <div className="food-name">Food: {nutrient.foodName}</div>
                    <div className="nutrient">
                      Calories: {nutrient?.calories} kcal
                    </div>
                  </div>

                  <div className="food-nutrient">
                    <div className="nutrient">Carbs: {nutrient?.carbs}g</div>
                    <div className="nutrient">
                      Protein: {nutrient?.protein}g
                    </div>
                    <div className="nutrient">Fat: {nutrient?.fat}g</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
