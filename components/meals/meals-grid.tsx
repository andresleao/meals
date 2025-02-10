import MealItem from "./meal-item";
import classes from "./meals.grid.module.css";
import { Meal } from "./types";

type MealItemProps = {
    meals: Meal[];
}

export default function MealsGrid({ meals }: MealItemProps) {
    return (
        <ul className={classes.meals}>
            {meals.map((m) => (
                <li key={m.id}>
                    <MealItem {...m}/>
                </li>
            ))}
        </ul>
    );
}