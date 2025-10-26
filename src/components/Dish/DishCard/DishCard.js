import './DishCard.css';

const DishCard = ({ dish, onClick }) => {
    return (
        <figure className="dish-card" onClick={() => onClick(dish)}>
            <img src={dish.imageUrl} alt={dish.dishName} />
            <figcaption>
                <h3>{dish.dishName}</h3>
                <p>{dish.description}</p>
            </figcaption>
        </figure>
    );
}

export default DishCard;