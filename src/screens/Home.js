import React ,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
   const baseUrl = "https://restaurantenligne.onrender.com";
const [search, setSearch] = useState('');
const [foodCat,setFoodCat]=useState([])
const [food, setFood] = useState([]);
const loadData=async()=>{
  let response = await fetch(
    `${baseUrl}/foodData`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  response = await response.json();
  console.log(response[0]);
  console.log(response[1]);
  setFood(response[0]);
  setFoodCat(response[1])
  
}
useEffect(()=>{
loadData()
},[])
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carrousel">
            <div
              class="carousel-caption d-none d-md-block"
              style={{ zIndex: "10" }}
            >
              <div class="d-flex justify-content-center">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>{setSearch(e.target.value)}}
                />
               { /*<button
                  class="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
  </button>*/}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900×700/?burger"
                className="d-block w-100"
                alt="..."
                style={{ filter: "(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×700/?barbeque"
                className="d-block w-100"
                style={{ filter: "(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×700/?pastry"
                className="d-block w-100"
                style={{ filter: "(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div>
        <div className="container">
          {foodCat !== [] ? (
            foodCat.map((data) => {
              return (
                <div className="row">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {food !== [] ? (
                    food
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              foodItem={filterItems}
                              options={filterItems.option[0]}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div>No such data found</div>
                  )}
                </div>
              );
            })
          ) : (
            <div>''''</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
