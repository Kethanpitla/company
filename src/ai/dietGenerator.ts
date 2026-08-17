import type { DietPlan } from "../types/diet";

export const generateDietPlan = (
  goal: string,
  dietType: string
): DietPlan => {
  // ------------------------------
  // Gain Muscle
  // ------------------------------

  if (goal === "Gain Muscle") {
    if (dietType === "Vegetarian") {
      return {
        meals: [
          {
            id: 1,
            title: "Breakfast",
            time: "8:00 AM",
            foods: [
              {
                name: "Oats",
                quantity: "100g",
                calories: 390,
                protein: 17,
                carbs: 66,
                fats: 7,
              },
              {
                name: "Milk",
                quantity: "300ml",
                calories: 180,
                protein: 10,
                carbs: 14,
                fats: 8,
              },
              {
                name: "Banana",
                quantity: "1",
                calories: 105,
                protein: 1,
                carbs: 27,
                fats: 0,
              },
            ],
          },

          {
            id: 2,
            title: "Lunch",
            time: "1:00 PM",
            foods: [
              {
                name: "Paneer",
                quantity: "200g",
                calories: 520,
                protein: 36,
                carbs: 8,
                fats: 40,
              },
              {
                name: "Rice",
                quantity: "200g",
                calories: 260,
                protein: 5,
                carbs: 56,
                fats: 1,
              },
            ],
          },

          {
            id: 3,
            title: "Dinner",
            time: "8:00 PM",
            foods: [
              {
                name: "Tofu",
                quantity: "200g",
                calories: 180,
                protein: 20,
                carbs: 6,
                fats: 10,
              },
              {
                name: "Chapati",
                quantity: "3",
                calories: 300,
                protein: 9,
                carbs: 60,
                fats: 3,
              },
            ],
          },
        ],

        nutrition: {
          calories: 2600,
          protein: 170,
          carbs: 310,
          fats: 70,
          water: 3.5,
        },
      };
    }

    // Non-Veg

    return {
      meals: [
        {
          id: 1,
          title: "Breakfast",
          time: "8:00 AM",
          foods: [
            {
              name: "Oats",
              quantity: "100g",
              calories: 390,
              protein: 17,
              carbs: 66,
              fats: 7,
            },
            {
              name: "Eggs",
              quantity: "4",
              calories: 280,
              protein: 24,
              carbs: 2,
              fats: 20,
            },
            {
              name: "Banana",
              quantity: "1",
              calories: 105,
              protein: 1,
              carbs: 27,
              fats: 0,
            },
          ],
        },

        {
          id: 2,
          title: "Lunch",
          time: "1:00 PM",
          foods: [
            {
              name: "Chicken Breast",
              quantity: "250g",
              calories: 410,
              protein: 70,
              carbs: 0,
              fats: 8,
            },
            {
              name: "Rice",
              quantity: "250g",
              calories: 320,
              protein: 6,
              carbs: 72,
              fats: 1,
            },
          ],
        },

        {
          id: 3,
          title: "Dinner",
          time: "8:00 PM",
          foods: [
            {
              name: "Fish",
              quantity: "200g",
              calories: 260,
              protein: 44,
              carbs: 0,
              fats: 8,
            },
            {
              name: "Sweet Potato",
              quantity: "250g",
              calories: 220,
              protein: 5,
              carbs: 50,
              fats: 0,
            },
          ],
        },
      ],

      nutrition: {
        calories: 2800,
        protein: 190,
        carbs: 320,
        fats: 75,
        water: 4,
      },
    };
  }

  // ------------------------------
  // Lose Fat
  // ------------------------------

  if (goal === "Lose Fat") {
    return {
      meals: [
        {
          id: 1,
          title: "Breakfast",
          time: "8:00 AM",
          foods: [
            {
              name: "Egg Whites",
              quantity: "6",
              calories: 100,
              protein: 22,
              carbs: 2,
              fats: 0,
            },
            {
              name: "Oats",
              quantity: "60g",
              calories: 230,
              protein: 10,
              carbs: 38,
              fats: 4,
            },
          ],
        },

        {
          id: 2,
          title: "Lunch",
          time: "1:00 PM",
          foods: [
            {
              name: "Chicken Breast",
              quantity: "200g",
              calories: 330,
              protein: 62,
              carbs: 0,
              fats: 7,
            },
            {
              name: "Salad",
              quantity: "1 bowl",
              calories: 90,
              protein: 4,
              carbs: 14,
              fats: 1,
            },
          ],
        },

        {
          id: 3,
          title: "Dinner",
          time: "8:00 PM",
          foods: [
            {
              name: "Fish",
              quantity: "180g",
              calories: 240,
              protein: 40,
              carbs: 0,
              fats: 8,
            },
            {
              name: "Vegetables",
              quantity: "200g",
              calories: 80,
              protein: 5,
              carbs: 12,
              fats: 1,
            },
          ],
        },
      ],

      nutrition: {
        calories: 1800,
        protein: 170,
        carbs: 120,
        fats: 45,
        water: 4,
      },
    };
  }

  // ------------------------------
  // Default (Maintain)
  // ------------------------------

  return {
    meals: [],
    nutrition: {
      calories: 2200,
      protein: 150,
      carbs: 220,
      fats: 60,
      water: 3,
    },
  };
};