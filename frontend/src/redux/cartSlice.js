import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

export const cartSlice = createSlice({
  name: "cartItems",
  initialState: {
    value: items,
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;

      const duplicateItem = findItem(state.value, newItem);

      if (duplicateItem.length > 0) {
        state.value = deleteItem(state.value, newItem);

        state.value = [
          ...state.value,
          {
            ...newItem,
            id: duplicateItem[0].id,
            quantity: newItem.quantity + duplicateItem[0].quantity,
          },
        ];
      } else {
        state.value = [
          ...state.value,
          {
            ...newItem,
            id:
              state.value.length > 0
                ? state.value[state.value.length - 1].id + 1
                : 1,
          },
        ];
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
        )
      );
    },

    updateItem: (state, action) => {
      const updatedItem = action.payload;
      const item = findItem(state.value, updatedItem);

      if (item.length > 0) {
        state.value = deleteItem(state.value, updatedItem);

        state.value = [
          ...state.value,
          {
            ...updatedItem,
            id: item[0].id,
          },
        ];
        localStorage.setItem(
          "cartItems",
          JSON.stringify(
            state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
          )
        );
      }
    },
    
    removeItem: (state, action) => {
      const removedItem = action.payload;
      state.value = deleteItem(state.value, removedItem);
      localStorage.setItem("cartItems", JSON.stringify(updateId(state.value)));
    },
  },
});

const updateId = (arr) => {
  let initId = 1;
  if (arr.length > 0) {
    return arr.map((item) => {
      return {
        ...item,
        id: initId++,
      };
    });
  } else {
    return [];
  }
};

const findItem = (arr, item) => {
  return arr.filter(
    (e) =>
      e.slug === item.slug && e.color === item.color && e.size === item.size
  );
};

const deleteItem = (arr, item) => {
  return arr.filter(
    (e) =>
      e.slug !== item.slug || e.color !== item.color || e.size !== item.size
  );
};

export const { addItem, updateItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
