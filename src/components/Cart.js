import React, { useState, useEffect } from 'react';
import { incrementQuantity, decrementQuantity, removeItemFromCart } from '../redux/actions/cartActions';
import { useSelector, useDispatch } from 'react-redux';
import {Link, useNavigate } from 'react-router-dom';

export default function Cart() {
    const PORT = process.env.PORT || 3001;

    const [isMobileView, setIsMobileView] = useState(false);
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate ();

    const getTotal = (prodId) => {
        const findItem = cart.find((item) => {
            return item._id === prodId;
        });
        const trimPrice = findItem.price.split(" $")[1];
        var removeSpaces = trimPrice.replace(/ /g, '');
        const price = parseInt(removeSpaces);
        const qnty = parseInt(findItem.quantity);
        console.log(`the price qnty ${price}`);
        return price * qnty;
    }

    const checkIsMobileView = () => {
        const viewportWidth = window.innerWidth;
        const isMobile = viewportWidth < 768;
        setIsMobileView(isMobile);
    };

    const getSessionUrlFromStripe = async (prodArray) => {
        const stripeCheckout = process.env.REACT_APP_BACKENDSERVER ? 
                                `${process.env.REACT_APP_BACKENDSERVER}/ecommerce/Checkout`: 
                                `http://localhost:${PORT}/ecommerce/Checkout`;

        const response = await fetch(stripeCheckout, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({prodArray}),
        });

        const {sessionUrl} = response.ok ? await response.json() : new Error("Failed to fetch session URL from stripeCheckout");

        console.log("What is the sessionUrl: ");
        console.log(sessionUrl);

        return sessionUrl;
      };

      const getProductsFromStripe = async (cart) => {
        const stripeGetProds = process.env.REACT_APP_BACKENDSERVER ? 
                                `${process.env.REACT_APP_BACKENDSERVER}/ecommerce/stripeGetProds`: 
                                `http://localhost:${PORT}/ecommerce/stripeGetProds`;

        const response = await fetch(stripeGetProds, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({cart}),
        });
        const stripeProducts = response.ok ? await response.json() : new Error ("Cant get stripeGetProds");
        console.log("The products with priceid, prodName, qty");
        console.log(stripeProducts);

        return stripeProducts;
      }
      
      const checkoutOrder = async () => {
        const cartItems = cart;
        const productsFromStripe = await getProductsFromStripe(cart);
        const sessionUrl = await getSessionUrlFromStripe(productsFromStripe);
        window.location.replace(sessionUrl);
      }


    useEffect(() => {
        window.addEventListener('resize', checkIsMobileView);
        checkIsMobileView();
        return () => {
            window.removeEventListener('resize', checkIsMobileView);
        };
    }, []);

    console.log('The cart');
    console.log(cart);
    return (
        <div>
            {!isMobileView ?
                <div className="cart">
                    <div className="header">Cart</div>
                    <div className="cart-container">
                        <div className="availableNowTitle">AVAILABLE NOW</div>
                        <div className="item columnTitle">QUANTITY</div>
                        <div className="item columnTitle">PRICE</div>
                        <div className="item columnTitle">TOTAL</div>
                        <div className="item"></div>
                        {cart?.map((cartItem) => (                           
                            <React.Fragment key={cartItem._id}>
                                <Link to={`/Product/${cartItem._id}`}>
                                    <div className="prodInfoContainer">
                                        <img className="img" src={cartItem.src} alt="Image" />
                                        <div className="product-desc">{cartItem.item}</div>
                                    </div>
                                </Link>
                                <div className="item overflow-hidden whitespace-nowrap">
                                    <button onClick={() => dispatch(decrementQuantity(cartItem._id))}>-</button>
                                    <p className="pr-3 pl-3">{cartItem.quantity}</p>
                                    <button onClick={() => dispatch(incrementQuantity(cartItem._id))}>+</button>
                                </div>
                                <div className="item">{cartItem.price}</div>
                                <div className="item">
                                    <p>$CAD {getTotal(cartItem._id)}</p>
                                </div>
                                <div className="item">
                                    <button onClick={() => dispatch(removeItemFromCart(cartItem._id))}>
                                        Remove
                                    </button>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                    <div>
                        <button className="bg-slate-200 p-2" type="submit" onClick={() => checkoutOrder()}> Checkout </button>
                    </div>
                    <div>
                    </div>
                </div> :
                <div>
                    <div className="cart">
                        <div className="header">Cart</div>
                        <div className="availableNowTitle">AVAILABLE NOW</div>
                            {cart?.map((item) => (
                                <React.Fragment key={item._id}>
                                    <div className="grid-cart-container-mobile">
                                        <img className="image-mobile" src={item.src} alt="Image" />
                                        <div className="description-mobile">{item.item}</div>
                                        <button className="remove-button-mobile" onClick={() => dispatch(removeItemFromCart(item._id))}>
                                                Remove
                                        </button>
                                        <div className="price-mobile">$CAD {getTotal(item._id)}</div>
                                        <div className="quantity-mobile">
                                            <button onClick={() => dispatch(decrementQuantity(item._id))}>-</button>
                                            <p>{item.quantity}</p>
                                            <button onClick={() => dispatch(incrementQuantity(item._id))}>+</button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        <div>
                            <button className="bg-slate-200 p-2" type="submit" onClick={() => checkoutOrder()}> Checkout </button>
                        </div>
                    </div>
                </div>
            }
        </div >
      );
}



