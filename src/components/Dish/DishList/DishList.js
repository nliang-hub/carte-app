import DishCard from "../DishCard";
import './DishList.css';

const DishList = ({ dishes, onDishClick }) => {
    return (
        <section className="dish-list">
            {dishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} onClick={onDishClick} />
            ))}
        </section>
    );
};

export default DishList;