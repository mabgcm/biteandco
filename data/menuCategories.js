const menuCategories = [
  { id: 'all', label: 'All Items', icon: 'bi-grid' },
  { id: 'main', label: 'Main Dishes', icon: 'bi-egg-fried', fallbackImage: '/assets/img/menu/ovenchicken.png' },
  { id: 'sides', label: 'Sides & Veggies', icon: 'bi-flower1', fallbackImage: '/assets/img/menu/veganhummus.png' },
  { id: 'salads', label: 'Salads', icon: 'bi-flower2', fallbackImage: '/assets/img/menu/mediterranean.png' },
  { id: 'mezze', label: 'Mezze & Dips', icon: 'bi-circle-half', fallbackImage: '/assets/img/menu/veganhummus.png' },
  { id: 'desserts', label: 'Desserts', icon: 'bi-cake2', fallbackImage: '/assets/img/menu/tiramisu.png' },
  { id: 'bakery', label: 'Bakery', icon: 'bi-basket', fallbackImage: '/assets/img/menu/borek.png' },
  { id: 'snacks', label: 'Snacks', icon: 'bi-stars', fallbackImage: '/assets/img/menu/truffles.png' }
];

export const visibleMenuCategories = menuCategories.filter(category => category.id !== 'all');

export function getMenuCategory(categoryId) {
  return menuCategories.find(category => category.id === categoryId);
}

export function getMenuCategoryLabel(categoryId) {
  return getMenuCategory(categoryId)?.label || 'Menu';
}

export function getMenuCategoryFallbackImage(categoryId) {
  return getMenuCategory(categoryId)?.fallbackImage || '/assets/img/menu/menu-item-1.png';
}

export default menuCategories;
