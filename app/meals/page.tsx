import Link from 'next/link';
import classes from './page.module.css';
import paths from '@/paths';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';
//import { unstable_noStore } from 'next/cache';

//export const dynamic = 'force-dynamic'; // remove cache for all components inside this page
//export const revalidate = 5;

async function Meals() {
    //unstable_noStore(); // remove cache for specific component (this page)
    const result = await getMeals();

    if (!result || result instanceof Error) {
        return (
            <main className="error">
                <h1>An error ocurred!</h1>
                <p>Failed to fetch data</p>
            </main>
        );
    }

    return <MealsGrid meals={result} />
}

export default function MealsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals, created <span className={classes.highlight}>by you</span>
                </h1>
                <p>
                    Choose your favorite recipe and cook it yourself. It is easy and fun!
                </p>
                <p className={classes.cta}>
                    <Link href={paths.mealsShare()}>
                        Share Your Favorite Recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={
                    <p className={classes.loading}>
                        Fetching meals...
                    </p>
                }>
                    <Meals />
                </Suspense>
            </main>
        </>
    );
}