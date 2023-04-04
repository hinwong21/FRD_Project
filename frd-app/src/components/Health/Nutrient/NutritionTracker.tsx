import React, { useEffect, useRef, useState } from "react";
import style from "./Nutrition.module.scss";
import { useDispatch } from "react-redux";
import { Preferences } from "@capacitor/preferences";
import { v4 as uuidv4 } from "uuid";

const API_KEY = "nohVmcYxyGXqKGGIEAVyKDfes1fYC8prMvht7gJC";

type Meals = {
  id: number;
  meal: string | undefined;
};

type Food = {
  fdcId: number;
  description: string;
};

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
  const [foodItems, setFoodItems] = useState<{ [key: number]: Food[] }>({});
  const dispatch = useDispatch();

  useEffect(() => {
    const resetData = async () => {
      const { value } = await Preferences.get({ key: "meals" });
      if (value !== null) {
        let json = JSON.parse(value);
        let date = new Date(json[json.length - 1].date).getTime();
        let now = new Date().getTime();

        if (now >= date) {
          await Preferences.remove({ key: "meals" });
          await Preferences.remove({ key: "nutrient" });
          setMeals([]);
          setNutrients({});
        }
      }
    };
    resetData();
  }, []);

  useEffect(() => {
    const getMealsLocal = async () => {
      const { value } = await Preferences.get({ key: "meals" });
      console.log(value, 123);

      if (value !== null) {
        setMeals(JSON.parse(value));
      }
    };
    getMealsLocal();
  }, []);

  useEffect(() => {
    const getNutrientLocal = async () => {
      const { value } = await Preferences.get({ key: "nutrient" });
      if (value !== null) {
        setNutrients(JSON.parse(value));
      }
    };
    getNutrientLocal();
  }, []);

  const setMealsLocal = async (
    meals: Meals[],
    mealSelect: HTMLSelectElement
  ) => {
    const now = new Date();
    const resetTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      6,
      0,
      0
    );

    if (now > resetTime) {
      // If the current time is past the reset time, set the reset time to tomorrow
      resetTime.setDate(resetTime.getDate() + 1);
    }
    await Preferences.set({
      key: "meals",
      value: JSON.stringify([
        ...meals,
        { id: meals.length + 1, meal: mealSelect?.value, date: resetTime },
      ]),
    });
  };

  let mealSelectRef = useRef<HTMLSelectElement>(null);

  const handleAddMeal = () => {
    let mealSelect = mealSelectRef.current as HTMLSelectElement;

    // if no choose meal type, it will return nothing
    if (mealSelect.value === "") {
      return;
    }

    setMeals([...meals, { id: meals.length + 1, meal: mealSelect.value }]);

    const newMeals = [...meals];

    setMealsLocal(newMeals, mealSelect);
    console.log(mealSelect);
    console.log(newMeals);

    // reset the select tag value
    mealSelect.value = "";
  };

  const foodSearch = (mealId: number, newValue: string) => {
    fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${newValue}`
    )
      .then((response) => response.json())
      .then((data) => {
        const foods: Food[] = data.foods;
        const uniqueFoods: Food[] = [];

        for (let i = 0; i < 7; i++) {
          const food: Food = foods[i];

          // avoid search result is undefined to throw error
          if (typeof food == "undefined") {
            return;
          }

          const isDuplicate: boolean = uniqueFoods.some(
            (uniqueFood) => uniqueFood.description === food.description
          );

          if (!isDuplicate) {
            uniqueFoods.push({
              fdcId: food.fdcId,
              description: food.description,
            });
          }
        }

        const newFoodItem = {
          [mealId]: [
            ...uniqueFoods.map((food) => ({
              fdcId: food.fdcId,
              description: food.description,
            })),
          ],
        };
        setFoodItems(newFoodItem);
      })
      .catch((error) => console.error(error));
  };

  const handleSearchResultClick = (
    mealId: number,
    event: React.MouseEvent<HTMLElement>
  ) => {
    const foodName = document.querySelector(
      `.food-search-bar-${mealId}`
    ) as HTMLInputElement;

    const foodItem = event?.currentTarget.textContent || "";

    foodName.value = foodItem;
    setFoodItems({});
  };

  const nutrientSearch =
    (mealId: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      const foodName = document.querySelector(
        `.food-search-bar-${mealId}`
      ) as HTMLInputElement;

      if (foodName.value === "") {
        setFoodItems([]);
        return;
      }

      setFoodItems([]);

      fetch(
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

          const setNutrientLocal = async () => {
            await Preferences.set({
              key: "nutrient",
              value: JSON.stringify({
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
              }),
            });
          };
          setNutrientLocal();

          let id = uuidv4();
          // update daily intake to database
          fetch(`http://localhost:8080/nutrition/dailyIntake`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: id,
              calories: caloriesNutrient.value,
              carbs: carbsNutrient.value,
              protein: proteinNutrient.value,
              fat: fatNutrient.value,
              date: new Date().toISOString().slice(0, 10),
            }),
          });

          dispatch({
            type: "INCREMENT",
            calories: caloriesNutrient.value,
            carbs: carbsNutrient.value,
            protein: proteinNutrient.value,
            fat: fatNutrient.value,
          });

          foodName.value = "";
          setFoodItems([]);
        });
    };

  return (
    <div className={style.foodTrackerWrapper}>
      <div className={style.foodTrackerContainer}>
        <header className={style.foodTrackerContainerHeader}>
          <div>Food tracking</div>
          <select className={style.selectMealType} ref={mealSelectRef}>
            <option value="">Select meal type</option>
            <option value="Breakfast">breakfast</option>
            <option value="Brunch">brunch</option>
            <option value="Lunch">lunch</option>
            <option value="Tea">tea</option>
            <option value="Snack">snack</option>
            <option value="Dinner">dinner</option>
            <option value="Siu Ye">siu ye</option>
          </select>
          <button className={style.addMealBtn} onClick={handleAddMeal}>
            Add meal
          </button>
        </header>

        {/* show each meal and the intake food */}
        {meals.map((meal) => (
          <div className={style.mealContainer} key={meal.id}>
            <div className={style.mealType}>{meal.meal}</div>
            <div className={style.foodSearchContainer}>
              <div className={style.foodSearchResult}>
                <input
                  className={`food-search-bar-${meal.id}`}
                  placeholder="Enter food name"
                  type="text"
                  key={meal.id}
                  onChange={(event) =>
                    foodSearch(meal.id, event.target.value as string)
                  }
                />
                <ul className={style.nutrientUl}>
                  {foodItems[meal.id] &&
                    foodItems[meal.id].map((food: Food) => (
                      <li
                        className={style.nutrientLi}
                        key={food.fdcId}
                        onClick={(event) =>
                          handleSearchResultClick(meal.id, event)
                        }
                      >
                        {food.description}
                      </li>
                    ))}
                </ul>
              </div>
              <button
                className={style.nutrientAddBtn}
                onClick={nutrientSearch(meal.id)}
              >
                +
              </button>
            </div>

            <div className={style.intakeHistoryContainer}>
              {nutrients[meal.id] &&
                nutrients[meal.id].map((nutrient) => (
                  <div className={style.intakeHistory} key={nutrient.id}>
                    <div className={style.foodNameCaloriesContainer}>
                      <div className={style.foodName}>
                        Food: {nutrient.foodName}
                      </div>
                      <div className={style.nutrient}>
                        Calories: {nutrient?.calories} kcal
                      </div>
                    </div>

                    <div className={style.foodNutrient}>
                      <div className={style.nutrient}>
                        Carbs: {nutrient?.carbs}g
                      </div>
                      <div className={style.nutrient}>
                        Protein: {nutrient?.protein}g
                      </div>
                      <div className={style.nutrient}>
                        Fat: {nutrient?.fat}g
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
