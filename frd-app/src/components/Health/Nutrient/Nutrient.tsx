// import { IonContent, IonPage } from "@ionic/react";
import React, { useState, useCallback, useEffect } from "react";
import "./Nutrient.css";

const API_KEY = "nohVmcYxyGXqKGGIEAVyKDfes1fYC8prMvht7gJC";

interface Food {
  fdcId: number;
  description: string;
}

export function Nutrient() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [calories, setCalories] = useState("");

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

  const handleSearchInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setSearchQuery(event.target.value);
    },
    []
  );

  function caloriesSearch() {
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

        // Update the state with the food name and calories
        setSearchQuery("");
        setCalories(`${caloriesNutrient.value} ${caloriesNutrient.unitName}`);
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      {/* <IonPage> */}
      {/* <IonContent fullscreen> */}
      <div className="page-container">
        <div className="nutrient-header">
          <div>Today Calories Intake:</div>
          <h3 className="today-calories-intake">2000 calories</h3>
          <div>Expected Calories Intake: 2155 calories / day</div>
        </div>

        <div className="food-search-container">
          <div className="food-search-result">
            <input
              className="food-search-bar"
              placeholder="Enter food name"
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
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
          <button className="nutrient-addBtn" onClick={caloriesSearch}>
            Add Food
          </button>
        </div>

        {/* {resultingClientExists.map(obj=><d></>} */}

        <div className="intake-history-container">
          <div className="intake-history">
            <div className="food-name">Food: Apple</div>
            <div className="food-calories">Calories: 52 KCAL</div>
          </div>

          <div className="intake-history">
            <div className="food-name">Food: Orange, raw</div>
            <div className="food-calories">Calories: 50 KCAL</div>
          </div>

          <div className="intake-history">
            <div className="food-name">Food: Banana, raw</div>
            <div className="food-calories">Calories: 97 KCAL</div>
          </div>

          <div className="intake-history">
            <div className="food-name">Food: Apple</div>
            <div className="food-calories">Calories: 52 KCAL</div>
          </div>

          <div className="intake-history">
            <div className="food-name">Food: Orange, raw</div>
            <div className="food-calories">Calories: 50 KCAL</div>
          </div>

          <div className="intake-history">
            <div className="food-name">Food: Banana, raw</div>
            <div className="food-calories">Calories: 97 KCAL</div>
          </div>

          <div className="intake-history">
            <div className="food-name">Food: {searchQuery}</div>
            <div className="food-calories">Calories: {calories}</div>
          </div>
        </div>
        <div className="data-notice">
          *The data will only be retained for a period of seven days.
        </div>
      </div>
      {/* </IonContent> */}
      {/* </IonPage> */}
    </>
  );
}
