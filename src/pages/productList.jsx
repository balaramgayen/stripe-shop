import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

export default function ProductList() {
  const [product, setProduct] = useState(null);
  const [token, setToken] = useState(null);

  const key =
    "pk_test_51KBdvASCPXj2si8YUEZQSheMA4Z64vK5s9WNamv3eC5AdfR720zhwUDMWU5JXNLVGESPQPGHS3Ty7H2thERpmBei006WCFfLrk";

  const getProduct = async () => {
    await axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log("there are some error", err);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  const onToken = async (stripeToken) => {
    setToken(stripeToken);
  };

  useEffect(() => {
    onToken();
  }, [token]);

  if (token) {
    alert("product purchase successful");
  }

  return (
    <div>
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <h3 class="navbar-brand">shop</h3>
          <form class="d-flex">
            <button class="btn btn-outline-success" type="submit">
              Cart
            </button>
          </form>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row">
          {product &&
            product.map((item) => {
              return (
                <div className="col col-md-3 p-2">
                  <div class="card">
                    <img
                      src={item.image}
                      style={{ height: "200px", width: "auto" }}
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <h5 class="card-title">{item.title}</h5>
                      <p class="card-text">rating: {item.rating.rate}</p>

                      <h3>Price: {item.price}</h3>
                      <StripeCheckout
                        name="fake Shop"
                        image="https://cdn.pixabay.com/photo/2013/07/13/11/31/shop-158317_960_720.png"
                        billingAddress
                        shippingAddress
                        description={`Your total is $${item.price}`}
                        amount={item.price}
                        token={onToken}
                        stripeKey={key}
                      >
                        <a href="#" class="btn btn-primary">
                          Buy Now
                        </a>
                      </StripeCheckout>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
