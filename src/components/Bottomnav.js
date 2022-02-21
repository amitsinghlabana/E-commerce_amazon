import React from 'react';
import {MenuIcon} from "@heroicons/react/outline"

function Bottomnav() {
  return( 

    <header>
  
        <div className="inset-x-0 overflow-hidden flex text-center space-x-3 p-2  pl-6 bg-amazon_blue-light text-white text-sm">
                
            <p className="link flex text-center font-semibold">
            <MenuIcon className="h-6 mr-1" />
            All
            </p>

            <a href="https://www.primevideo.com" target="_blank" className="link">Prime Video</a> 
            <a href="https://business.amazon.in/" target="_blank" className="link">Amazon Business</a>
            <p className="link hidden lg:inline-flex ">Today's Deal</p>
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

export default Bottomnav;
