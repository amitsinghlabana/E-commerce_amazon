import { CheckCircleIcon } from "@heroicons/react/solid";
import React from "react";
import Bottomnav from "../components/Bottomnav";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function success() {

  const { data: session, loading } = useSession();
  const router = useRouter();

  if (loading) {
  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <Bottomnav />

      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="ml-2 items-center space-x-2 mb-4 text-4xl font-bold text-yellow-500 ">
            Hello, {session.user.name}
          </div>
          
          
          <div className="flex items-center space-x-2 mb-5">
            <div>
              <CheckCircleIcon className="sm:block text-green-500 h-10" />
            </div>
            <h1 className="text-3xl">
              Thank you, your order has been confirmed!
            </h1>
          </div>

          <p>
            Thank you for shopping with us. We'll send a confirmation once your
            item has shipped, if you would like to check the status of your
            order(s) please press the link below.
          </p>

          <button onClick={()=> router.push('/orders')} className="button mt-8">
              Go to my orders
              </button>
          
        </div>
      </main>
    </div>

  );
}


if (!loading && !session) {
  return(
<div className="bg-gray-100 h-screen">
      <Header />
      <Bottomnav />

      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
        <h1 className="text-3xl">
          You must be signed in to view this page
        </h1>
        </div>
      </main>
    </div>
  )
}else{
  router.push('/auth/signin')
}
}



export default success;


