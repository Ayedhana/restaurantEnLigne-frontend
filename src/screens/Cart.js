import React from 'react'
import {useCart,useDispatchCart} from '../components/ContextReducer'

export default function Cart() {
   const baseUrl = "https://restaurantenligne.onrender.com";
let data=useCart();
console.log(data)
let dispatch=useDispatchCart()
    if (data.length === 0) {
      return (
        <div>
          <div className="m-5 w-100 text-center fs-3">The cart is empty</div>
        </div>
      );
    }
    const handleChekout=async()=>{
   let userEmail=localStorage.getItem("userEmail");
   let response = await fetch(
     `${baseUrl}/orderData`,
     {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         order_data: data,
         email: userEmail,
         order_date: new Date().toDateString(),
       }),
     }
   );
      console.log("order response",response)
      if(response.status===200)
      { dispatch({type:"DROP"})}
    }
    let totalPrice=data.reduce((total,food)=>total+food.price,0)
    
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-rm">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scop="row">{index + 1}</th>
                <td>{food.name} </td>
                <td>{food.qty} </td>
                <td>{food.size} </td>
                <td>{food.price} </td>
                <td>
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    Delete
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price:{totalPrice}/-</h1>{" "}
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={handleChekout}>Check Out</button>{" "}
        </div>
      </div>
    </div>
  );
}
