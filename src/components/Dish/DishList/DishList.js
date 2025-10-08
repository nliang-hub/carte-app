import DishCard from "../DishCard";
import './DishList.css';

const DishList = ({ dishes }) => {
    return (
        <section className="dish-list">
            {dishes.map((dish) => <DishCard dish={dish}/>)}
        </section>
    );
}

export default DishList;