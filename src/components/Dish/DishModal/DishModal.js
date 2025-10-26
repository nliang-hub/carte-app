import React, { useState } from "react";
import PropTypes from "prop-types";
import DishForm from "../DishForm";
import { getCategoryDisplay } from "../../../utils/categoryMapping";
import "./DishModal.css";

const DishModal = ({ dish = {}, onClose, handleDelete, onSubmit }) => {
    const [isEditing, setIsEditing] = useState(false);

    const { imageUrl = "", dishName = "", description = "", category = "" } = dish;

    if (isEditing) {
        return (
            <DishForm
                initialData={dish}
                onSubmit={onSubmit}
                onClose={onClose}
                requireImage={false}
            />
        );
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container" role="dialog" aria-modal="true" aria-label={dishName}>
                <div className="dish-modal-header">
                    <img src={imageUrl} alt={dishName || "Dish image"} />
                    <button
                        className="close-button"
                        onClick={onClose}
                        type="button"
                        aria-label="Close"
                    >
                        ✗
                    </button>
                </div>

                <div className="modal-body">
                    <h2>{dishName}</h2>

                    <section className="dish-details">
                        <div className="detail-group">
                            <h3 className="detail-label">Description</h3>
                            <p className="detail-content">{description}</p>
                        </div>

                        <div className="detail-group">
                            <h3 className="detail-label">Category</h3>
                            <span className="category-badge">{getCategoryDisplay(category)}</span>
                        </div>
                    </section>

                    <section className="modal-actions">
                        <button
                            className="action-button edit-button"
                            onClick={() => setIsEditing(true)}
                            type="button"
                        >
                            ✏️ Edit
                        </button>
                        <button
                            className="action-button delete-button"
                            onClick={handleDelete}
                            type="button"
                        >
                            🗑️ Delete
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};

DishModal.propTypes = {
    dish: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default DishModal;
