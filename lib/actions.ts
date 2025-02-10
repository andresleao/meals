'use server';

import { Meal } from "@/components/meals/types";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";
import paths from "@/paths";
import { revalidatePath } from "next/cache";

export type MealFormProps = Omit<Meal, 'id' | 'slug' | 'image'> & { image?: File };

export interface ShareMealFormState {
    message?: string;
}

function isInvalidField(fieldName: string | undefined) {
    return (!fieldName || fieldName.trim() === '');
}

export async function shareMeal(
    formState: ShareMealFormState,
    formData: FormData
): Promise<ShareMealFormState> {
    const meal = {
      creator: formData.get('name') as string ,
      creator_email: formData.get('email') as string,
      title: formData.get('title') as string,
      summary: formData.get('summary') as string,
      instructions: formData.get('instructions') as string,
      image: formData.get('image') as File | undefined,
    }

    if (
        isInvalidField(meal.title) ||
        isInvalidField(meal.creator) ||
        isInvalidField(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        isInvalidField(meal.summary) ||
        isInvalidField(meal.instructions)
    ) {
        return { message: 'Invalid input' };
    } else if (!meal.image) {
        return { message: 'Invalid IMAGE' };
    }

    try {
        await saveMeal(meal);
    } catch(e: unknown) {
        if (e instanceof Error) {
            return { message: 'Sharing meal error' };
        }
        return { message: 'An error ocurred' };
    }

    revalidatePath(paths.meals());
    redirect(paths.meals());
  }