import React from "react";
import { getSession } from "next-auth/react";
import Header from "../components/Header";
import CheckoutProduct from "../components/CheckoutProduct";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { useSession } from "next-auth/react";
import Currency from "react-currency-formatter";
import Bottomnav from "../components/Bottomnav";
import { loadStripe } from "@stripe/stripe-js";
import { groupBy } from "lodash";

import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

function checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();


  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    //call the backend to create a checkout  session...

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    // Redirect user/customer to Stripe CheckoutProduct
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };


  const groupedItems = Object.values(groupBy(items, "id"));
  return (
    <div className="bg-gray-100">
      <link
        rel="icon"
        href="https://pngimg.com/uploads/amazon/amazon_PNG18.png"
      />
      <Header />
      <Bottomnav />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* left */}
        <div className="flex-grow m-5 shadow-md">
          <Image
            src="https://links.papareact.com/ikj"
            width="1020"
            height="250"
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-xl sm:text-3xl md:text-4xl border-b pb-4">
              {items.length === 0 ? (
                <span className="flex flex-grow items-center">
                  <img
                    className="h-7 md:h-20 lg:h-40"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1JmJQQP996cQ_aGG6Mb9tAt2kaQQW9a3VLw&usqp=CAU"
                  />{" "}
                  {"Your Amazon Cart is empty"}{" "}
                </span>
              ) : (
                <span className="flex flex-grow items-center">
                  {" "}
                  <img 
                  className="h-7 md:h-20 lg:h-40"
                  src="https://raymand.net/wp-content/uploads/2021/03/%D8%B4%D8%B1%D8%A7%DB%8C%D8%B7-%D9%81%D8%B1%D9%88%D8%B4.png" />
                  {"Shopping Cart"}
                </span>
              )}
            </h1>

            {groupedItems.map((group, i) => (
              <CheckoutProduct
                key={i}
                id={group[0].id}
                title={group[0].title}
                rating={group[0].rating}
                price={group[0].price}
                description={group[0].description}
                category={group[0].category}
                image={group[0].image}
                hasPrime={group[0].hasPrime}
                quantity={group.length}
              />
            ))}
          </div>

          {items.length > 0 && (
            <div className=" py-6 space-y-2 px-7 mb-4 bg-white border-t-2 border-yellow-500 text-right">
              <span className="text-lg  md:text-xl  lg:text-2xl  ">
                Subtotal ({items.length} items):
              </span>

              <span className="ml-2 text-lg  md:text-lg  lg:text-xl font-bold">
                <Currency quantity={total} currency="INR" />
              </span>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="INR" />
                </span>
              </h2>

              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default checkout;
