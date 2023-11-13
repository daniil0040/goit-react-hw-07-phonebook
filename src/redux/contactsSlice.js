import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContacts, deleteContacts } from './operations';

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
    [fetchContacts.pending](state) {
      state.contacts.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    },
    [addContacts.pending](state) {
      state.contacts.isLoading = true;
    },
    [addContacts.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items.push(action.payload);
    },
    [addContacts.rejected](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    },
    [deleteContacts.pending](state) {
      state.contacts.isLoading = true;
    },
    [deleteContacts.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      const index = state.contacts.items.findIndex(
        task => task.id === action.payload.id
      );
      state.contacts.items.splice(index, 1);
    },
    [deleteContacts.rejected](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;

export const { changeFilters } = contactsSlice.actions;

//Selectors
export const getContacts = state => state.contacts.contacts.items;

export const getFilter = state => state.contacts.filter;

export const selectLoading = state => state.contacts.contacts.isLoading;

export const selectErr = state => state.contacts.contacts.error;
