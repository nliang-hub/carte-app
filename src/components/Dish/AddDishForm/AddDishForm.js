import DishForm from '../DishForm';

const AddDishForm = ({ onSubmit, onClose }) => {
  return (
    <DishForm
      initialData={{}}
      onSubmit={onSubmit}
      onClose={onClose}
      submitText="✓"
      requireImage={true}
    />
  );
};

export default AddDishForm;