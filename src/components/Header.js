import React, { useState, useEffect, useRef, useMemo   } from 'react';
import { useSelector } from 'react-redux';
import ProductSearchResults from './ProductSearchResults';
import {Link} from 'react-router-dom';
import Navbar from './Navbar.js';

export default function Header (){
    let [openSearchField, setSearchField] = useState(false);
    let [searchResults, setSearchResults] = useState("");
    let [navBar, setNav] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [isCartQuantityChanged, setIsCartQuantityChanged] = useState(false);
    const [isProdClicked, setIsProdClicked] = useState(false);
    const prevCartQuantityRef = useRef(0);
    const isMounted = useRef(false);

    const cart = useSelector((state) => state.cart.cart);
    const currentCartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    const collapseOrShowSearchField = () => {
        console.log("what is the searchfield: " + openSearchField);
        setSearchField(current => !current);    //set openSearchField to true if the search button is clicked
        setNav(false);
        setIsProdClicked(false);
    }

    const collapseOrShowNav = () => {
        setNav(current => !current);
        setSearchField(false);
    }

    const getTotalQuantity = () => {
        let total = 0
            cart.forEach(item => {
                total += item.quantity
            })
        return total
    }

    const handleInputChange = (e) => {
        setSearchResults(e.target.value);
    }

    const prodClicked = (id) => {
        console.log('Clicked this prod ' + id);
        setIsProdClicked(true);
        setSearchField(false);
    }

    const checkCartQntyChanged = () => {
        if (isMounted.current && currentCartQuantity !== prevCartQuantityRef.current) {
            setCartQuantity(currentCartQuantity);
            prevCartQuantityRef.current = currentCartQuantity;
            setIsCartQuantityChanged(true);
          }
      
          if (isMounted.current) {
            const timeoutId = setTimeout(() => {
              setIsCartQuantityChanged(false);
            }, 3400);
            
            return () => {
              clearTimeout(timeoutId);
            };
          } else {
            //On initial render we need to set the prevCartQuantityRef to the currentCartQuantity
            isMounted.current = true;
            prevCartQuantityRef.current = currentCartQuantity;
          }
    }

    useEffect(() => {
        checkCartQntyChanged();
    }, [currentCartQuantity]); 

        return(
            <div className="relative border-b">
                <header className="bg-none flex justify-between m-5">
                        <div className="z-50" onClick={collapseOrShowNav}>
                            {!navBar &&
                                <a href="#">
                                    <svg id="hamburger" xmlns="http://www.w3.org/2000/svg"  className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth="1." stroke="black">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                </a>
                            }
                        </div>
                            <div className="absolute left-0 right-0 m-auto text-center block">
                                <h1 className="text-lg font-bold uppercase text-black vintageFont">
                                    <Link to="/Home"> Paix & Amour </Link>
                                </h1>
                            </div>
                    <div className="flex flex-wrap space-x-3 z-50">
                        <Link to="/Cart">
                            <div id="cart" className={isCartQuantityChanged ? 'animate-bounce' : ''}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/> </svg>      
                                <p className="absolute -mt-10 ml-2 text-bold text-md">{getTotalQuantity() || ""}</p>
                            </div>
                        </Link>
                        <div id="searchButton" className="vintageFont font-bold text-sm sm:text-md uppercase text-black">
                                <a className="text-xs" href="#" onClick={collapseOrShowSearchField}>Search</a>
                        </div>
                    </div>
                </header>
                {navBar && ( //only set the nav if the navBar variable is true
                    <Navbar collapseOrShowNav={collapseOrShowNav}/>
                )}
                {openSearchField && !isProdClicked && (
                    <div className="">
                        <input id="searchfield" type="search" className={ "relative w-full p-1 bg-transparent backdrop-blur-md backdrop-brightness-50 border-b-2 border-b-white text-white z-50"} placeholder="Search something..." onChange={handleInputChange}/>
                        <ProductSearchResults searchResults={searchResults} prodClicked={prodClicked}/>
                    </div>
                )}
            </div>
        );
}
