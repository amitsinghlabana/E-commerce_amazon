import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],

  // testing 
  // products: null,
  // basketTotalQuantity: 0,
  // basketTotalAmount: 0,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    //Actions
    
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },

    //testing
    // addToBasket(state, action) {
    //   const index = state.items.findIndex(
    //     (basketItem) => basketItem.id === action.payload.id
    //   );

    //   if (index >= 0) {
    //     state.items[index] = {
    //       ...state.items[index],
    //       basketQuantity: state.items[index].basketQuantity + 1,
    //     };
    //   } else {
    //     let tempProductItem = { ...action.payload, basketQuantity: 1 };
    //     state.items.push(tempProductItem);        
    //   }
    // },


   


    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        //item exixsts in the basket... remove it...
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as it's not in the cart`
        );
      }

      state.items = newBasket;
    },


    // testing
    // getTotals(state, action) {
    //   let { total, quantity } = state.items.reduce(
    //     (basketTotal, basketItem) => {
    //       const { price, basketQuantity } = basketItem;
    //       const itemTotal = price * basketQuantity;

    //       basketTotal.total += itemTotal;
    //       basketTotal.quantity += basketQuantity;

    //       return basketTotal;
    //     },
    //     {
    //       total: 0,
    //       quantity: 0,
    //     }
    //   );
    //   total = parseFloat(total.toFixed(2));
    //   state.basketTotalQuantity = quantity;
    //   state.basketTotalAmount = total;
    // },
    removeGroupedFromBasket: (state, action) => {
      let newBasket = state.items.filter(
          (item) => item.id !== action.payload.id
      );

      state.items = newBasket;
    },

  },
});

export const { addToBasket, removeFromBasket, removeGroupedFromBasket} = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
