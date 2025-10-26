export const CATEGORY_MAPPING = {
  appetizer: '🥗 Appetizer',
  main: '🍖 Main Course', 
  pasta: '🍝 Pasta',
  seafood: '🐟 Seafood',
  vegetarian: '🥕 Vegetarian',
  dessert: '🍰 Dessert'
};

export const getCategoryDisplay = (categoryKey) => {
  return CATEGORY_MAPPING[categoryKey] || categoryKey;
};