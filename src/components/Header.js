import Image from "next/image";
import {MenuIcon,
        SearchIcon,
        ShoppingCartIcon,
      ChevronDownIcon} from "@heroicons/react/outline"

function Header() {
 
  return (
    <header className="sticky top-0 z-50 inset-x-0 ">
      {/* Top Nav */}
      
      <div className="  flex align-self: flex-start items-center bg-amazon_blue p-1 flex-grow py-2 space-x-5">
          <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 relative">          
            <Image
              src="https://links.papareact.com/f90"
              width={150}
              height={40}
              objectFit="contain"
              className="cursor-pointer"
              />
              <span className="absolute text-sm overflow-hidden cursor-pointer text-white top-[3px] left-[130px] ">  .amit</span>
          </div>

          {/* search */}
          <div className="hidden sm:flex  items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400  hover:bg-yellow-500">
            <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none" type="text" />
            <SearchIcon className="h-12 p-4" />
          </div>
        


          
          {/* Right */}
          <div className="text-white flex items-center text-xs space-x-6 mx-6 text-center whitespace-nowrap">
         
          <div className="hidden lg:inline-flex items-center space-x-2 link" > 
            <img className="h-6" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/282/flag-india_1f1ee-1f1f3.png" alt="" /> 
            <ChevronDownIcon className="h-4" /> 
          </div>
          
         
            <div className="link">
              <p>Hello! Amit Singh</p>
              <p className="font-extrabold md:text-sm">Account & Lists</p>
            </div>

            <div className="link">
              <p>Returns</p>
              <p className="font-extrabold md:text-sm">& Orders</p>
            </div>

            <div className="relative link flex items-center">
              
              <span className="absolute top-0 right-0 md:right-5 h-4 w-4  md:mt-1 bg-yellow-400 text-center rounded-full text-black font-bold">0</span>

              

              <ShoppingCartIcon className="h-10" />

              <p className="hidden md:inline font-extrabold md:text-sm mt-4 pr-3">Cart</p>
            </div>

           </div>

      </div>
      
      



      {/* Bottom Nav*/}
      <div className="inset-x-0 overflow-hidden flex text-center space-x-3 p-2  pl-6 bg-amazon_blue-light text-white text-sm">
        
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
        
      </div>
    </header>
  );
}

export default Header;