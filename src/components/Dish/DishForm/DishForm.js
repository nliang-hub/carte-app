import './DishForm.css';
import { useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useImmer } from 'use-immer';
import { CATEGORY_MAPPING } from '../../../utils/categoryMapping';

const createInitialForm = (initialData) => ({
    dishName: initialData.dishName || '',
    description: initialData.description || '',
    category: initialData.category || 'appetizer',
    image: null,
    imageUrl: initialData.imageUrl || '',
});

const DishForm = ({
    initialData = {},
    onSubmit,
    onClose,
    submitText = '✓',
    requireImage = true,
}) => {
    const fileInputRef = useRef(null);

    const [formData, updateFormData] = useImmer(createInitialForm(initialData));

    const categoryEntries = useMemo(
        () => Object.entries(CATEGORY_MAPPING),
        []
    );

    const handleCloseClick = useCallback((e) => {
        e.stopPropagation();
        onClose();
    }, [onClose]);

    const handleImageClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleImageUpload = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result;
            updateFormData((draft) => {
                draft.image = file;
                draft.imageUrl = base64;
            });
            // allow re-selecting the same file if needed
            if (fileInputRef.current) fileInputRef.current.value = '';
        };
        reader.readAsDataURL(file);
    }, [updateFormData]);

    const handleInputChange = useCallback((field) => (e) => {
        const value = e.target.value;
        updateFormData((draft) => {
            draft[field] = value;
        });
    }, [updateFormData]);

    const handleFormSubmit = useCallback((e) => {
        e.preventDefault();

        if (requireImage && !formData.image) {
            alert('Please upload an image for your dish');
            return;
        }

        const newDish = {
            id: initialData.id,
            dishName: formData.dishName,
            description: formData.description,
            category: formData.category,
            imageUrl: formData.imageUrl,
        };
        
        onSubmit(newDish);
        onClose();
    }, [formData, requireImage, onSubmit, onClose, initialData]);

    return (
        <div className="modal-overlay" role="dialog" aria-modal="true">
            <form onSubmit={handleFormSubmit} className="dish-form">
                <div className="modal-container">
                    <div className="modal-header" onClick={handleImageClick}>
                        <div className="image-wrapper">
                            {formData.imageUrl ? (
                                <img src={formData.imageUrl} alt="Dish preview" />
                            ) : (
                                <div className="picture-placeholder" aria-hidden>
                                    📷 Upload Dish Picture
                                </div>
                            )}

                            <input
                                ref={fileInputRef}
                                className="hidden"
                                type="file"
                                accept="image/*"
                                aria-label="Upload dish image"
                                onChange={handleImageUpload}
                            />
                        </div>

                        <button
                            className="close-button"
                            onClick={handleCloseClick}
                            type="button"
                            aria-label="Close"
                        >
                            ✗
                        </button>
                    </div>

                    <div className="modal-body">
                        <label className="sr-only" htmlFor="dishName">
                            Dish Name
                        </label>
                        <input
                            id="dishName"
                            className="dish-name"
                            name="dishName"
                            type="text"
                            value={formData.dishName}
                            onChange={handleInputChange('dishName')}
                            required
                            placeholder="Dish Name"
                        />

                        <label className="sr-only" htmlFor="dishDescription">
                            Dish Description
                        </label>
                        <textarea
                            id="dishDescription"
                            className="dish-description"
                            name="dishDescription"
                            value={formData.description}
                            onChange={handleInputChange('description')}
                            placeholder="Dish Description (optional)"
                            maxLength={150}
                            rows={3}
                        />

                        <fieldset className="category-selection" aria-label="Category">
                            <legend className="sr-only">Category</legend>
                            {categoryEntries.map(([key, display]) => (
                                <label key={key} className="category-option">
                                    <input
                                        type="radio"
                                        name="category"
                                        value={key}
                                        checked={formData.category === key}
                                        onChange={handleInputChange('category')}
                                    />
                                    {display}
                                </label>
                            ))}
                        </fieldset>
                    </div>
                </div>

                <button className="submit-button" type="submit">
                    {submitText}
                </button>
            </form>
        </div>
    );
};

DishForm.propTypes = {
    initialData: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    submitText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    requireImage: PropTypes.bool,
};

export default DishForm;