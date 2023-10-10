import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState ,useEffect} from "react";

export default function MyOrder() {
  const baseUrl = "https://restaurantenligne.onrender.com"; 
  const [orderData,setOrderData]=useState("")
  const fetchOrder=async ()=>{
    console.log(localStorage.getItem('userEmail'))
    await fetch(`${baseUrl}/myorderData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: localStorage.getItem("userEmail") }),
    }).then(async (res) => {
      let response = await res.json();
      await setOrderData(response);
    });
  }
  useEffect(() => {
    fetchOrder()
  
  }, [])
  
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        {orderData !== {}
          ? Array(orderData).map((data) => {
              return data.orderData
                ? data.orderData.order_data
                    .slice(0)
                    .reverse()
                    .map((item) => {
                      return item.map((arrayData) => {
                        return (
                          <div>
                            {arrayData.order_date ? (
                              <div className="m-auto mt5">
                                {data=arrayData.order_date}
                                <hr />
                              </div>
                            ) : (
                              <div className="col-12 col-md-6 col-lg-3 ">
                                <div
                                  className="card mt-3"
                                  style={{ width: "16rem", maxHeight: "360px" }}
                                >
                                  <img
                                    src={arrayData.img}
                                    className="card-img-top"
                                    atl="..."
                                  />
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      {arrayData.name}{" "}
                                    </h5>
                                    <div>
                                      <span className="m-1">
                                        {arrayData.qty}{" "}
                                      </span>
                                      <span className="m-1">
                                        {arrayData.size}{" "}
                                      </span>
                                      <span className="m-1">{data} </span>
                                      <div className="d-inline ms-2 h-100 w-20 fs-5">
                                        ${arrayData.price}/-
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      });
                    })
                : "";
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
