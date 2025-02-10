const paths = {
    home() {
      return '/';
    },
    meals() {
      return '/meals';
    },
    mealsShare() {
      return '/meals/share';
    },
    mealDetails(mealSlug: string) {
      return `/meals/${mealSlug}`;
    },
    community() {
        return '/community';
    }
  };

  export default paths;