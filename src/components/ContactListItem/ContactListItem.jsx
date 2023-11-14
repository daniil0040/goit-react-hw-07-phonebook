import { useDispatch, useSelector } from 'react-redux';
import { Contact } from './ContactListItem.styled';
import { getVisibleContacts } from 'redux/contactsSlice';
import { deleteContacts } from 'redux/operations';

export const ContactListItem = () => {
  const visibleContacts = useSelector(getVisibleContacts);
  const dispatch = useDispatch();

  return visibleContacts.map(({ name, phone, id }) => {
    return (
      <Contact key={id}>
        <p>{name}</p>
        <p>{phone}</p>
        <button type="button" onClick={() => dispatch(deleteContacts(id))}>
          Delete
        </button>
      </Contact>
    );
  });
};
