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

    const getCheckoutSessionFromStripe = async (prodArray) => {
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

        const {session} = response.ok ? await response.json() : new Error("Failed to fetch session URL from stripeCheckout");

        console.log("What is the session here ");
        console.log(session);

        return session;
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
        const jsonData =  response.ok ? await response.json() : new Error ("Cant stripeGetProds");
        console.log("The products with priceid, prodName, qty");
        console.log(jsonData);

        return jsonData;
      }
      
      const checkoutOrder = async () => {
        const stripeSessionStatus = process.env.REACT_APP_BACKENDSERVER ? 
                                    `${process.env.REACT_APP_BACKENDSERVER}/ecommerce/session_status`: 
                                    `http://localhost:${PORT}/ecommerce/session_status`;

        const cartItems = cart;
        const productsFromStripe = await getProductsFromStripe(cart);
        const getSession = await getCheckoutSessionFromStripe(productsFromStripe);

        console.log("getSession");
        console.log(getSession);
        window.location.replace(getSession.session_url);
        const getOrderSuccess = await fetch(stripeSessionStatus+`?session_id=${getSession.session_id}`);
        const retrieveSession = getOrderSuccess.ok ? await getOrderSuccess.json() : new Error ("Unale to retriev session");

        console.log("Got session info from front end");
        console.log(retrieveSession);
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



