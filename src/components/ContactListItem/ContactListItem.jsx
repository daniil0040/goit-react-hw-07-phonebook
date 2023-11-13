import { useDispatch, useSelector } from 'react-redux';
import { Contact } from './ContactListItem.styled';
import { getContacts, getFilter } from 'redux/contactsSlice';
import { deleteContacts } from 'redux/operations';

export const ContactListItem = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const visibleContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter);
  });

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
