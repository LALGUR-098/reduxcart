import {createReducer} from "@reduxjs/toolkit";
//const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));


const items =localStorage.getItem("cartItems")!== null?JSON.parse(localStorage.getItem("cartItems")):[];
const subTotal =localStorage.getItem("subTotal")!== null?JSON.parse(localStorage.getItem("subTotal")):[];
const total =localStorage.getItem("total")!== null?JSON.parse(localStorage.getItem("total")):[];
const tax =localStorage.getItem("tax")!== null?JSON.parse(localStorage.getItem("tax")):[];
const shipping =localStorage.getItem("shipping")!== null?JSON.parse(localStorage.getItem("shipping")):[];


export const cartReducer = createReducer(
    
    //cartFromLocalStorage ||
    {

    cartItems:items,
    subTotal:subTotal,
    shipping:shipping,
    tax:tax,
    total:total,
},{
    addToCart:(state,action )=>{
        const item = action.payload;
        const isItemExist = state.cartItems.find(i=>i.id===item.id);
        if(isItemExist){
        state.cartItems.forEach(i=>{
            if(i.id===item.id)i.quantity+=1;
        })
        }
        else{
            state.cartItems.push(item);
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

    },
    decrement:(state,action)=>{
        const item = state.cartItems.find(i=>i.id===action.payload);
        if(item.quantity>1){
           state.cartItems.forEach((i)=>{
            if(i.id===item.id)i.quantity-=1;
            
           }) 
        }

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  
        // Retrieve other values from local storage and update state if necessary
        const subTotal = localStorage.getItem("subTotal") !== null ? JSON.parse(localStorage.getItem("subTotal")) : [];
        const total = localStorage.getItem("total") !== null ? JSON.parse(localStorage.getItem("total")) : [];
        const tax = localStorage.getItem("tax") !== null ? JSON.parse(localStorage.getItem("tax")) : [];
        const shipping = localStorage.getItem("shipping") !== null ? JSON.parse(localStorage.getItem("shipping")) : [];
      
        // Update state with the retrieved values
        state.subTotal = subTotal;
        state.total = total;
        state.tax = tax;
        state.shipping = shipping;

      
















    },
    deleteFromCart:(state,action)=>{
        state.cartItems = state.cartItems.filter(i=>i.id!==action.payload);




        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  
        // Retrieve other values from local storage and update state if necessary
        const subTotal = localStorage.getItem("subTotal") !== null ? JSON.parse(localStorage.getItem("subTotal")) : [];
        const total = localStorage.getItem("total") !== null ? JSON.parse(localStorage.getItem("total")) : [];
        const tax = localStorage.getItem("tax") !== null ? JSON.parse(localStorage.getItem("tax")) : [];
        const shipping = localStorage.getItem("shipping") !== null ? JSON.parse(localStorage.getItem("shipping")) : [];
      
        // Update state with the retrieved values
        state.subTotal = subTotal;
        state.total = total;
        state.tax = tax;
        state.shipping = shipping;

      

  
    },
     

    calculatePrice: (state) => {
        let sum = 0;
        state.cartItems.forEach((i) => (sum += i.price * i.quantity));
        state.subTotal = sum;
        state.shipping = state.subTotal > 1000 ? 0 : 200;
        state.tax = +(state.subTotal * 0.18).toFixed();
        state.total = state.subTotal + state.tax + state.shipping;
      
        // Update local storage with the modified values
        localStorage.setItem("subTotal", JSON.stringify(state.subTotal));
        localStorage.setItem("shipping", JSON.stringify(state.shipping));
        localStorage.setItem("tax", JSON.stringify(state.tax));
        localStorage.setItem("total", JSON.stringify(state.total));
      },
      
});