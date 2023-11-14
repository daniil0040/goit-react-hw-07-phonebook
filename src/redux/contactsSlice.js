import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContacts, deleteContacts } from './operations';

const handlePending = state => {
  state.contacts.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },
  reducers: {
    changeFilters: (state, action) => {
      state.filter = action.payload;
    },
    // deleteContact: (state, action) => {
    //   state.contacts.items = state.contacts.items.filter(
    //     ({ id }) => id !== action.payload
    //   );
    // },
    // addContact: {
    //   reducer(state, action) {
    //     state.contacts.items.push(action.payload);
    //   },
    //   prepare(value) {
    //     return {
    //       payload: {
    //         ...value,
    //         id: nanoid(),
    //       },
    //     };
    //   },
    // },
  },
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = action.payload;
    },
    [fetchContacts.rejected]: handleRejected,
    [addContacts.pending]: handlePending,
    [addContacts.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items.push(action.payload);
    },
    [addContacts.rejected]: handleRejected,
    [deleteContacts.pending]: handlePending,
    [deleteContacts.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      const index = state.contacts.items.findIndex(
        task => task.id === action.payload.id
      );
      state.contacts.items.splice(index, 1);
    },
    [deleteContacts.rejected]: handleRejected,
  },
});

export const contactsReducer = contactsSlice.reducer;

export const { changeFilters } = contactsSlice.actions;

//Selectors
export const selectContacts = state => state.contacts.contacts.items;

export const selectFilter = state => state.contacts.filter;

export const selectLoading = state => state.contacts.contacts.isLoading;

export const selectErr = state => state.contacts.contacts.error;

export const getVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter);
    });
  }
);
