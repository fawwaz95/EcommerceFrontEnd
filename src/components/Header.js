import React, { useState, useEffect, useRef, useMemo   } from 'react';
import { useSelector } from 'react-redux';
import ProductSearchResults from './ProductSearchResults';
import {Link} from 'react-router-dom';

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
            <div className="relative">
                <header className="bg-none flex justify-between m-5">
                        <div onClick={collapseOrShowNav}>
                            <a href="#">
                                <svg id="hamburger" xmlns="http://www.w3.org/2000/svg"  className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth="1." stroke="black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </a>
                        </div>
                            <div className="flex items-center justify-center">
                                <h1 className="text-sm sm:text-3xl font-bold uppercase text-black vintageFont">
                                    <Link to="/Home"> Paix & Amour </Link>
                                </h1>
                            </div>
                    <div className="flex flex-wrap space-x-3">
                        <div id="cart" className={isCartQuantityChanged ? 'animate-bounce' : ''}>
                            <a href="#">
                                <Link to="/Cart">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/> </svg>      
                                    <p className="absolute -mt-10 ml-2 text-bold text-md">{getTotalQuantity() || ""}</p>
                                </Link>
                            </a>
                        </div>
                        <div id="searchButton" className="Old Standard italic font-bold text-sm sm:text-md uppercase text-black">
                                <a className="text-xs" href="#" onClick={collapseOrShowSearchField}>Search</a>
                        </div>
                    </div>
                </header>
                {navBar && ( //only set the nav if the navBar variable is true
                    <nav className={"pt-20 fixed top-0 h-full w-1/3 backdrop-blur-md backdrop-brightness-50 text-white border-white border-4 z-10"}>
                        <button onClick={collapseOrShowNav}>
                            <svg id="close" xmlns="http://www.w3.org/2000/svg" className="fixed top-0 right-0 m-3 w-5 h-5" viewBox="0 0 24 24"  stroke="white">
                                <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
                            </svg>
                        </button>
                        <div id="navList" className="ml-5 text-left navFont uppercase text-xs sm:text-xl" onClick={collapseOrShowNav}>
                            <ul>
                                <li>
                                    <Link to="/Home">Home</Link>
                                </li>
                                <li>
                                    <Link to="/Shop">Shop</Link>
                                </li>
                                <li><a href="#">LookBook</a></li>
                                <li>
                                    <Link to="/Insperations">Insperations</Link>
                                </li>
                            </ul>
                        </div>
                        <div id="navFooter" className="absolute ml-5 bottom-5 left-0 text-left navFont uppercase text-xs"  onClick={collapseOrShowNav}>
                            <ul>
                                <li><a href="#">Contact Us</a></li>
                                <li><a href="#">Returns</a></li>
                                <li><a href="#">Terms</a></li>
                            </ul>
                        </div>
                    </nav>
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
