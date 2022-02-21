import moment from "moment";
import { getSession, useSession } from "next-auth/react";
import React from "react";
import db from "../../firebase";
import Bottomnav from "../components/Bottomnav";
import Header from "../components/Header";
import Order from "../components/Order";
import { mapValues, groupBy, omit } from "lodash";
// import { doc, onSnapshot, collection, query, where, getDocs, orderBy } from "firebase/firestore";


function orders({orders}) {
  const { data: session } = useSession();
  return (
    <div>
      <Header />
      <Bottomnav />

      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b pb-1 mb-2 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please sign in to se your orders</h2>
        )}

        <div className="mt-5 space-y-4">
            {orders?.map(({ id,amount, items, timestamp, images }) => (
                <Order
                  key={id}
                  id={id}
                  amount={amount}
                  items={items}
                  timestamp={timestamp}
                  images={images}
                /> 
            ))}
        </div>
        
      </main>
    </div>
  );
}

export default orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  

  // Get the user logged in credential
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  // const collectionRef = await getDocs(collection(db, "users","orderss", doc(session.user.email), orderBy("timestamp", "desc")));
  // console.log(collectionRef);
  


  // Firebase db
  const stripeOrders = await db
  .collection("users")
  .doc(session.user.email)
  .collection("orders")
  .orderBy("timestamp", "desc")
  .get();

  // const stripeOrders = collectionRef;
   

  // const stripeOrders = await getDocs(collection(db,'users', session.user.email));
  // console.log(stripeOrders);


  // Stripe  Orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      // amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );
  

  return {
    props: {
      // orders,
      orders: orders,

    },
  };
}
