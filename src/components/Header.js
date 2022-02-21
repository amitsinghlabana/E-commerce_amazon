import Image from "next/image";
import {MenuIcon,
        SearchIcon,
        ShoppingCartIcon,
      ChevronDownIcon} from "@heroicons/react/outline"
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header(props) {
  const {data: session} = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);
  
  return (
    <header className="sticky top-0 z-50 inset-x-0 ">
      {/* Top Nav */}
      
      <div className="  flex align-self: flex-start items-center bg-amazon_blue p-1 flex-grow py-2 space-x-5">
          <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 relative">          
            <Image
              onClick = {() => router.push('/')}
              src="https://links.papareact.com/f90"
              width={150}
              height={40}
              objectFit="contain"
              className="cursor-pointer"
              />
              <span className="hidden sm:inline absolute text-sm overflow-hidden cursor-pointer text-white top-[3px] left-[130px] ">  .in</span>
          </div>

          {/* search */}
          <div className="hidden md:inline-flex  items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400  hover:bg-yellow-500">
            <input className="flex-col p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none" 
              placeholder={
                router.route === "/"
                    ? " Search products"
                    : ""
            }
            onInput={(event) =>
                router.route === "/" &&
                props.onSearchValue(event.target.value)
            }
            type="text" />
            <SearchIcon className="h-12 p-4" />
          </div>
        


          
          {/* Right */}
          <div className="text-white flex items-center text-xs space-x-6 mx-6 text-center whitespace-nowrap ">
         
          <div className="hidden sm:inline-flex items-center space-x-2 link" > 
            <img className="h-6" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/282/flag-india_1f1ee-1f1f3.png" alt="" /> 
            <ChevronDownIcon className="h-4" /> 
          </div>
          
          <img src={session ? `${session.user.image}`:'https://toppng.com/uploads/preview/file-svg-user-icon-material-desi-11563317072p2p27gjccw.png'} alt="profileimg" className="sm:inline-flex  w-8 h-8 rounded-full mr-1 ml-1 hidden  "/>
            <div onClick={!session ? signIn : signOut } className="link">
              <p>
                {session ?  `Hello, ${session.user.name}` : "Hello, Sign in"}
              </p>
              <p className="font-extrabold md:text-sm">Account & Lists</p>
            </div>

            <div onClick={() => router.push("/orders")} className="link">
              <p>Returns</p>
              <p className="font-extrabold md:text-sm">& Orders</p>
            </div>

            <div onClick={() => router.push('/checkout')} className="relative link flex items-center">
              
              <span className="absolute top-0 right-0 md:right-5 h-4 w-4  md:mt-1 bg-yellow-400 text-center rounded-full text-black font-bold">
                {items.length}
              </span>

              

              <ShoppingCartIcon className="h-10" />

              <p className="hidden md:inline font-extrabold md:text-sm mt-4 pr-3">Cart</p>
            </div>

           </div>

      </div>

        <div className="md:hidden px-2 ml-2 bg-amazon_blue p-1 flex-grow py-2 space-x-5">
          <div className="flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400  hover:bg-yellow-500 md:hidden">
            <input className="flex-col p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none" 
              placeholder={
                router.route === "/"
                    ? " Search products"
                    : ""
            }
            onInput={(event) =>
                router.route === "/" &&
                props.onSearchValue(event.target.value)
            }
            type="text" />
            <SearchIcon className="h-12 p-4" />
          </div>
          </div>
      
      



      {/* Bottom Nav*/}
      {/* <div className="inset-x-0 overflow-hidden flex text-center space-x-3 p-2  pl-6 bg-amazon_blue-light text-white text-sm">
        
        <p className="link flex text-center font-semibold">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>

        <a href="https://www.primevideo.com" target="_blank" className="link">Prime Video</a> 
        <a href="https://business.amazon.in/" target="_blank" className="link">Amazon Business</a>
        <p className="link">Today's Deal</p>
        <a href="https://www.audible.in" target="_blank" className="link">Audible</a>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <a href="https://www.amazonfresh.com" target="_blank" className="link hidden lg:inline-flex">Food & Grocery</a>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <a href="https://www.amazon.care" target="_blank"  className="link hidden lg:inline-flex">Health & Personal Care</a>
        
      </div> */}
    </header>
    
  );
}

export default Header;
