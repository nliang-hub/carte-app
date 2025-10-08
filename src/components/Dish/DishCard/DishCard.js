import './DishCard.css';

const DishCard = ({ dish }) => {
    return (
        <figure className="dish-card">
            <img src={dish.imageUrl} alt={dish.name} />
            <figcaption>
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
            </figcaption>
        </figure>
    );
}

export default DishCard;