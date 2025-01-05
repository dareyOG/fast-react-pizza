import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';

function DeleteItem({ id }) {
  const dispatch = useDispatch();

  // delete pizza item
  const handleDeleteItem = () => {
    dispatch(deleteItem(id));
  };

  return (
    <Button type={'small'} onClick={handleDeleteItem}>
      Delete
    </Button>
  );
}

export default DeleteItem;
