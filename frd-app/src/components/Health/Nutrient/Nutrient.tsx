// import { IonContent, IonPage } from "@ionic/react";
import React, { useState, useCallback, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { Action, storeNutrition } from "../../../redux/Nutrition/store";
import HealthNutrition from "./HealthNutrition";
import "./Nutrient.css";
import { WaterProgressBar } from "./WaterProgressBar";

const API_KEY = "nohVmcYxyGXqKGGIEAVyKDfes1fYC8prMvht7gJC";

interface Food {
  fdcId: number;
  description: string;
}

type FoodNutrient = {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
};

interface MealProps {
  id: number;
  name: string;
}

export function Nutrient() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [foodNutrient, setFoodNutrient] = useState<FoodNutrient>();
  const [waterIntake, setWaterIntake] = useState<number>(0);
  const [meals, setMeals] = useState<MealProps[]>([]);
  const [elements, setElements] = useState<JSX.Element[]>([]);
  const [selectedMealType, setSelectedMealType] = useState<string>("");

  const handleSearch = useCallback(() => {
    if (searchQuery.length === 0) {
      setSearchResults([]);
      return;
    }

    fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${searchQuery}`
    )
      .then((response) => response.json())
      .then((data) => {
        const foods: Food[] = data.foods;
        const uniqueFoods: Food[] = [];

        for (let i = 0; i < 10; i++) {
          const food: Food = foods[i];

          const isDuplicate: boolean = uniqueFoods.some(
            (uniqueFood) => uniqueFood.description === food.description
          );

          if (!isDuplicate) {
            uniqueFoods.push(food);
          }
        }

        setSearchResults(uniqueFoods);
      })
      .catch((error) => console.error(error));
  }, [searchQuery]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, handleSearch]);

  const handleSearchResultClick = useCallback(
    (food: Food): void => {
      setSearchQuery(food.description);
      setSearchResults([]);
    },
    [setSearchQuery, setSearchResults]
  );

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchQuery(event.target.value);
  };

  function nutrientSearch() {
    // Make the API call to get the food data
    fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${searchQuery}`
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

        // Update the state with the food name and calories
        setSearchQuery("");
        setFoodNutrient({
          calories: caloriesNutrient.value,
          carbs: carbsNutrient.value,
          protein: proteinNutrient.value,
          fat: fatNutrient.value,
        });
      })
      .catch((error) => console.error(error));
  }

  function addWaterIntake() {
    const newWaterIntake = (waterIntake + 0.1).toFixed(1);
    setWaterIntake(parseFloat(newWaterIntake));
  }

  const handleMealTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedMealType(event.target.value);
  };

  const handleAddMeal = () => {
    const newMeal = { id: meals.length + 1, name: selectedMealType };
    if (newMeal.name === "") {
      return;
    }

    const newElement = (
      <div className="meal-container" key={newMeal.id}>
        <div className="meal-type">{newMeal.name}</div>
        <div className="food-search-container">
          <div className="food-search-result">
            <input
              className="food-search-bar"
              placeholder="Enter food name"
              type="text"
              value={searchQuery}
              onChange={() => handleSearchInputChange}
            />
            <ul>
              {searchResults.map((food: Food) => (
                <li
                  key={food.fdcId}
                  onClick={() => handleSearchResultClick(food)}
                >
                  {food.description}
                </li>
              ))}
            </ul>
          </div>
          <button className="nutrient-addBtn" onClick={nutrientSearch}>
            +
          </button>
        </div>

        <div className="intake-history-container">
          <div className="intake-history">
            <div className="food-name-calories-container">
              <div className="food-name">Food: Apple</div>
              <div className="nutrient">Calories: 52 KCAL</div>
            </div>

            <div className="food-nutrient">
              <div className="nutrient">Carbs: 14.3 G</div>
              <div className="nutrient">Protein: 0 G</div>
              <div className="nutrient">Fat: 0.65 G</div>
            </div>
          </div>

          <div className="intake-history">
            <div className="food-name-calories-container">
              <div className="food-name">Food: Apple</div>
              <div className="nutrient">
                Calories: {foodNutrient?.calories} kcal
              </div>
            </div>

            <div className="food-nutrient">
              <div className="nutrient">Carbs: {foodNutrient?.carbs}g</div>
              <div className="nutrient">Protein: {foodNutrient?.protein}g</div>
              <div className="nutrient">Fat: {foodNutrient?.fat}g</div>
            </div>
          </div>
        </div>
      </div>
    );
    setMeals([...meals, newMeal]);
    setElements((prevElements) => [...prevElements, newElement]);
    setSelectedMealType("");
  };

  return (
    <>
      {/* <IonPage> */}
      {/* <IonContent fullscreen> */}
      <div className="page-container">
        <Provider store={storeNutrition}>
          <HealthNutrition />
        </Provider>

        {/* Water balance */}
        <div className="water-balance-container">
          <div className="water-balance-header">Water balance</div>

          <div className="water-balance-main">
            <div className="water-intake-container">
              <div className="water-intake">
                <div className="current-water-intake">Water: {waterIntake}</div>
                <div className="water-minimum-intake">
                  Daily minimum intake: 1.6 L
                </div>
              </div>
              <button className="water-intake-addBtn" onClick={addWaterIntake}>
                +
              </button>
            </div>
            <div className="water-progressBar-container">
              <WaterProgressBar dailyIntake={1.6} currentIntake={waterIntake} />
            </div>
          </div>
        </div>

        <div className="food-tracker-container">
          <header>
            <div>Food tracking</div>
            <select
              className="select-meal-type"
              value={selectedMealType}
              onChange={handleMealTypeChange}
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

          <div className="meal-container">
            <div className="food-search-container">
              <div className="food-search-result">
                <input
                  className="food-search-bar"
                  placeholder="Enter food name"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
                <ul className="nutrient-ul">
                  {searchResults.map((food: Food) => (
                    <li
                      className="nutrient-li"
                      key={food.fdcId}
                      onClick={() => handleSearchResultClick(food)}
                    >
                      {food.description}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="nutrient-addBtn" onClick={nutrientSearch}>
                +
              </button>
            </div>

            <div className="intake-history-container">
              <div className="intake-history">
                <div className="food-name-calories-container">
                  <div className="food-name">Food: Apple</div>
                  <div className="nutrient">Calories: 52 KCAL</div>
                </div>

                <div className="food-nutrient">
                  <div className="nutrient">Carbs: 14.3 G</div>
                  <div className="nutrient">Protein: 0 G</div>
                  <div className="nutrient">Fat: 0.65 G</div>
                </div>
              </div>

              <div className="intake-history">
                <div className="food-name-calories-container">
                  <div className="food-name">Food: Apple</div>
                  <div className="nutrient">
                    Calories: {foodNutrient?.calories} kcal
                  </div>
                </div>

                <div className="food-nutrient">
                  <div className="nutrient">Carbs: {foodNutrient?.carbs}g</div>
                  <div className="nutrient">
                    Protein: {foodNutrient?.protein}g
                  </div>
                  <div className="nutrient">Fat: {foodNutrient?.fat}g</div>
                </div>
              </div>
            </div>
          </div>

          {elements}
        </div>

        {/* {result.map(obj=><d></>} */}
        {/* <footer className="data-notice">
          *The data will only be retained for a period of seven days.
        </footer> */}
      </div>
      {/* </IonContent> */}
      {/* </IonPage> */}
    </>
  );
}
