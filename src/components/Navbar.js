import {useState} from 'react';
import {Link} from 'react-router-dom';

const Navbar = ({collapseOrShowNav}) => {
    const [showNav, setShowNav] = useState(true);

    const openOrShowNav = () =>{
        setShowNav(toggle => !toggle);
        collapseOrShowNav(showNav); //callback to header.js
    }

    return (
            <nav className={"pt-20 fixed top-0 h-full w-1/3 backdrop-blur-md backdrop-brightness-50 text-white border-white border-4 z-10"}>
                <button onClick={openOrShowNav}>
                    <svg id="close" xmlns="http://www.w3.org/2000/svg" className="fixed top-0 right-0 m-3 w-5 h-5" viewBox="0 0 24 24" stroke="white">
                        <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
                    </svg>
                </button>
                <div id="navList" className="ml-5 text-left navFont uppercase text-xs sm:text-xl" onClick={openOrShowNav}>
                    <ul>
                        <li>
                            <Link to="/Home">Home</Link>
                        </li>
                        <li>
                            <Link to="/Shop">Shop</Link>
                        </li>
                        <li>
                            <Link to="/LookBook">LookBook</Link>
                        </li>
                        <li>
                            <Link to="/Insperations">Insperations</Link>
                        </li>
                    </ul>
                </div>
                <div id="navFooter" className="absolute ml-5 bottom-5 left-0 text-left navFont uppercase text-xs" onClick={openOrShowNav}>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Returns</a></li>
                        <li><a href="#">Terms</a></li>
                    </ul>
                </div>
            </nav>
    )
}

export default Navbar;