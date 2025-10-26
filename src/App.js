import { useState, useEffect } from 'react';
import './App.css';
import DishList from './components/Dish/DishList';
import AddDishButton from './components/Dish/AddDishButton';
import AddDishForm from './components/Dish/AddDishForm';
import DishModal from './components/Dish/DishModal';

function App() {
  const [dishes, setDishes] = useState(() => {
    const saved = localStorage.getItem('dishes');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            dishName: 'Grilled Asparagus',
            description:
              'Fresh asparagus spears grilled to perfection with olive oil and seasonings',
            category: 'vegetarian',
            imageUrl: '/images/dishes/asparagus.jpeg',
          },
          {
            id: 2,
            dishName: 'Kung Pao Chicken',
            description:
              'Spicy Sichuan dish with tender chicken, peanuts, and dried chilies in savory sauce',
            category: 'main',
            imageUrl: '/images/dishes/kung-pao-chicken.webp',
          },
          {
            id: 3,
            dishName: 'Classic Pasta',
            description: 'Traditional Italian pasta with rich tomato sauce and fresh herbs',
            category: 'pasta',
            imageUrl: '/images/dishes/pasta.jpg',
          },
          {
            id: 4,
            dishName: 'Hawaiian Poke Bowl',
            description:
              'Fresh cubed fish served over rice with vegetables and traditional seasonings',
            category: 'seafood',
            imageUrl: '/images/dishes/poke.webp',
          },
          {
            id: 5,
            dishName: 'Street Tacos',
            description: 'Authentic Mexican tacos with seasoned meat, fresh cilantro, and lime',
            category: 'main',
            imageUrl: '/images/dishes/tacos.jpg',
          },
        ];
  });

  const [dishFormOpen, setDishFormOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    localStorage.setItem('dishes', JSON.stringify(dishes));
  }, [dishes]);

  const handleAddDish = (newDish) => {
    setDishes((prev) => [
      ...prev,
      {
        ...newDish,
        id: prev.length + 1,
      },
    ]);
    setDishFormOpen(false);
  };

  const handleDishClick = (dish) => setSelectedDish(dish);

  return (
    <div className="App">
      {dishes && dishes.length > 0 ? (
        <DishList dishes={dishes} onDishClick={handleDishClick} />
      ) : (
        <p>Add your first dish!</p>
      )}

      {!dishFormOpen && <AddDishButton onClick={() => setDishFormOpen(true)} />}

      {selectedDish && <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)}/>}

      {dishFormOpen && (
        <AddDishForm onSubmit={handleAddDish} onClose={() => setDishFormOpen(false)} />
      )}
    </div>
  );
}

export default App;
