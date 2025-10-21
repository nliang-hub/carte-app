import './AddDishForm.css';
import { useImmer } from 'use-immer';

const AddDishForm = ({ onSubmit, onClose }) => {
  const [formData, updateFormData] = useImmer({
    image: null,
    imageUrl: null,
    dishName: '',
    description: '',
    category: ''
  });

  const handleCloseClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  const handleImageClick = () => {
    document.getElementById('image-upload').click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        updateFormData(draft => {
          draft.image = file;
          draft.imageUrl = base64String;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field) => (e) => {
    updateFormData(draft => {
      draft[field] = e.target.value;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert('Please upload an image for your new dish');
      return;
    }

    const newDish = {
      dishName: formData.dishName,
      description: formData.description,
      category: formData.category,
      imageUrl: formData.imageUrl
    };

    onSubmit(newDish);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit}>
        <div className="modal-container">
          <div className="modal-header" onClick={handleImageClick}>
            <div>
              {formData.imageUrl ? (
                <img
                  id="dish-picture"
                  src={formData.imageUrl}
                  alt="Dish Preview"
                />
              ) : (
                <div className="picture-placeholder">
                  📷 Upload Dish Picture
                </div>
              )}
              <input
                id="image-upload"
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                required
              />
            </div>
            <button
              className="close-button"
              onClick={handleCloseClick}
            >
              ✗
            </button>
          </div>
          <div className="modal-body">
            <input
              className="dish-name"
              name="dishName"
              type="text"
              value={formData.dishName}
              onChange={handleInputChange('dishName')}
              required
              placeholder="Dish Name"
            />
            <textarea
              className="dish-description"
              name="dishDescription"
              value={formData.description}
              onChange={handleInputChange('description')}
              placeholder="Dish Description (optional)"
              maxLength="150"
              rows="3"
            />
            <div className="category-selection">
              <label>
                <input
                  type="radio"
                  name="category"
                  value="appetizer"
                  checked={formData.category === 'appetizer'}
                  onChange={handleInputChange('category')}
                  required
                />
                🥗 Appetizer
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="main"
                  checked={formData.category === 'main'}
                  onChange={handleInputChange('category')}
                />
                🍖 Main Course
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="pasta"
                  checked={formData.category === 'pasta'}
                  onChange={handleInputChange('category')}
                />
                🍝 Pasta
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="seafood"
                  checked={formData.category === 'seafood'}
                  onChange={handleInputChange('category')}
                />
                🐟 Seafood
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="vegetarian"
                  checked={formData.category === 'vegetarian'}
                  onChange={handleInputChange('category')}
                />
                🥕 Vegetarian
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="dessert"
                  checked={formData.category === 'dessert'}
                  onChange={handleInputChange('category')}
                />
                🍰 Dessert
              </label>
            </div>
          </div>
        </div>
        <button className="submit-button" type="submit">
          ✓
        </button>
      </form>
    </div>
  );
};

export default AddDishForm;

/*
const [formData, setFormData] = useState({
  dishName: '',
  description: '',
  category: ''
});

// === EVENT HANDLERS ===
const handleInputChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = (e) => {
  e.preventDefault();
  const submitData = new FormData();

  // Add form fields
  submitData.append('dishName', formData.dishName);
  submitData.append('description', formData.description);
  submitData.append('category', formData.category);

  // Add file if selected
  if (selectedFile) {
    submitData.append('dishImage', selectedFile);
  }

  // Submit to API or parent component
  console.log('Submitting:', submitData);
  onAddDish(submitData);
  onClose();
};

// === CSS STYLES ===
.image-upload-area {
  width: 100%;
  height: 200px;
  border: 2px dashed var(--orange-light);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  position: relative;
}

.image-upload-area:hover {
  border-color: var(--primary-orange);
  background-color: rgba(255, 140, 66, 0.05);
}

.image-upload-area.has-image {
  border: 1px solid var(--orange-light);
  padding: 0;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--warm-gray);
}

.camera-icon {
  font-size: 2rem;
}

.upload-text {
  font-size: 1rem;
  font-weight: 500;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-upload-area.has-image:hover::after {
  content: "Click to change";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

.category-selection {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.category-selection label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid var(--orange-light);
  border-radius: 6px;
  transition: all 0.2s ease;
}

.category-selection label:hover {
  background-color: var(--orange-light);
}

.category-selection input[type="radio"] {
  width: auto;
  margin: 0;
}

// === CLEANUP ===
useEffect(() => {
  return () => {
    // Cleanup preview URL to avoid memory leaks
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };
}, [previewUrl]);
*/