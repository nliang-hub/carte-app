import './AddDishButton.css';

const AddDishButton = ({ onClick }) => {
    return (
        <button className="add-dish-button" onClick={onClick}>
            +
        </button>
    );
}

export default AddDishButton;