import './AddDishForm.css';
import { useState } from 'react';

const AddDishForm = ({ onClose }) => {
    const [image, setImage] = useState(null);

    const closeButtonClick = (e) => {
        e.stopPropagation();
        onClose();
    }

    const handleImageClick = () => {
        document.getElementById('image-upload').click();
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (image) {
            const formData = new FormData(e.target);
            const dishName = formData.get('dishName');
            const description = formData.get('dishDescription');
            const category = formData.get('category');
            formData.append('dishImage', image);
            console.log('Form submitted:', {
                dishName,
                description,
                category,
                image: image.name
            });
            onClose();
        } else {
            alert('Please upload an image for your new dish');
            return;
        }
    }
    
    return (
        <div className="modal-overlay">
            <form onSubmit={handleSubmit}>
                <div className="modal-container">
                    <div className='modal-header' onClick={handleImageClick}>
                        <div>
                            {image ? <img id='dish-picture' src={URL.createObjectURL(image)} alt='Dish Preview'/> : <div className='picture-placeholder'>📷 Upload Dish Picture</div>}
                            <input 
                                id='image-upload' 
                                className='hidden' 
                                type='file' 
                                accept='image/*'
                                onChange={handleImageUpload}
                                required
                            />
                        </div>
                        <button className='close-button' onClick={closeButtonClick} >✗</button>
                    </div>
                    <div className='modal-body'>
                        <input 
                            className='dish-name' 
                            name='dishName'
                            type='text'
                            required 
                            placeholder='Dish Name'/>
                        <textarea 
                            className='dish-description' 
                            name='dishDescription'
                            placeholder='Dish Description (optional)'
                            maxLength='150'
                            rows='3'
                        />
                        <div className='category-selection'>
                            <label>
                                <input
                                    type='radio'
                                    name='category'
                                    value='appetizer'
                                    required
                                />
                                🥗 Appetizer
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    name='category'
                                    value='main'
                                />
                                🍖 Main Course
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    name='category'
                                    value='pasta'
                                />
                                🍝 Pasta
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    name='category'
                                    value='seafood'
                                />
                                🐟 Seafood
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    name='category'
                                    value='vegetarian'
                                />
                                🥕 Vegetarian
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    name='category'
                                    value='dessert'
                                />
                                🍰 Dessert
                            </label>
                        </div>
                    </div>
                </div>
                <button class='submit-button'>✓</button>
            </form>
        </div>
    );
}

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