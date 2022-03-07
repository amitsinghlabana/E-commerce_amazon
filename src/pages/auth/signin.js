import React from "react";
// import styles from './signin.module.css';
import { getProviders, signIn as signinprovider } from "next-auth/react";
import Header from "../../components/Header";
import Bottomnav from "../../components/Bottomnav";

export default function signIn({ providers }) {
  return (
    <>
      <Header />
      <Bottomnav />

      <div className="max-w-screen-lg mx-auto p-10">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <div className="flex justify-items-center items-center flex-col">
              <img
                src="https://blog.logomyway.com/wp-content/uploads/2017/02/amazon-logo-1.jpg"
                alt="amazon logo"
                height={300}
                width={300}
                className=""
              />
              <p className="mt-10 text-lg text-center disclaimer">
                This is not real Amazon, This build is for learning purposes
                only.
              </p>
              <p className="text-gray-600">Made with ❤️ by Amit Singh.</p>
              <button
                className="signinBtn mt-10"
                onClick={() =>
                  signinprovider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
