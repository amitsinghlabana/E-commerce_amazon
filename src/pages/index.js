import { getSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import Banner from "../components/Banner";
import Bottomnav from "../components/Bottomnav";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";


export default function Home({ products }) {
  const [filteredProducts, setProducts] = useState(products);

  function filterProducts(searchText) {
      const matchedProducts = products.filter((product) =>
          product.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setProducts([...matchedProducts]);
  }
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon - Online shopping site</title>
        <link rel="icon" href="https://pngimg.com/uploads/amazon/amazon_PNG18.png" />
      
      </Head>

      <Header onSearchValue={filterProducts} />
      <Bottomnav />

      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />

        {/* ProductFeed */}

        {filteredProducts.length > 0 ? (
                    <ProductFeed products={filteredProducts} />
                ) : (
                    <h1 className="text-center text-2xl py-4">
                         No matching products…
                    </h1>
                )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products")
  .then(
    res => res.json()
  );

  return { 
    props: {
      products,
      session,
    }, 
  };
}
 