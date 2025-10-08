import { useState } from 'react';
import './App.css';
import DishList from './components/Dish/DishList';
import AddDishButton from './components/Dish/AddDishButton';
import AddDishForm from './components/Dish/AddDishForm';

const dishes = [
  {
    id: 1,
    name: "Grilled Asparagus",
    description: "Fresh asparagus spears grilled to perfection with olive oil and seasonings",
    imageUrl: "/images/dishes/asparagus.jpeg"
  },
  {
    id: 2,
    name: "Kung Pao Chicken",
    description: "Spicy Sichuan dish with tender chicken, peanuts, and dried chilies in savory sauce",
    imageUrl: "/images/dishes/kung-pao-chicken.webp"
  },
  {
    id: 3,
    name: "Classic Pasta",
    description: "Traditional Italian pasta with rich tomato sauce and fresh herbs",
    imageUrl: "/images/dishes/pasta.jpg"
  },
  {
    id: 4,
    name: "Hawaiian Poke Bowl",
    description: "Fresh cubed fish served over rice with vegetables and traditional seasonings",
    imageUrl: "/images/dishes/poke.webp"
  },
  {
    id: 5,
    name: "Street Tacos",
    description: "Authentic Mexican tacos with seasoned meat, fresh cilantro, and lime",
    imageUrl: "/images/dishes/tacos.jpg"
  }
];

function App() {
  const [dishFormOpen, setDishFormOpen] = useState(false);

  return (
    <div className="App">
      <DishList dishes={dishes}/>
      {dishFormOpen || <AddDishButton onClick={() => setDishFormOpen(true)} />}
      {dishFormOpen && <AddDishForm onClose={() => setDishFormOpen(false)} />}
    </div>
  );
}

export default App;
