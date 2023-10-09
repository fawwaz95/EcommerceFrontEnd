import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/actions/cartActions';
import { useLocation, useParams } from 'react-router-dom';

export default function Product () {
    const { prodId } = useParams();
    const PORT = process.env.PORT || 3001;
    const productEndPoint = process.env.REACT_APP_BACKENDSERVER ? `${process.env.REACT_APP_BACKENDSERVER}/ecommerce/ProductID/${prodId}` : `http://localhost:${PORT}/ecommerce/ProductID/${prodId}`;
    const [productInfo, setProductInfo] = useState({});
    const [productId, setProductId] = useState(null);
    const [showProdDetails, setShowProdDetails] = useState(false);
    const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);
    const dispatch = useDispatch();

    const toggleDeliveryDetails = () => {
        setShowDeliveryDetails(current => !current);
    }

    const toggleProdDetails = () => {
        setShowProdDetails(current => !current);
    }

    const fetchProdId = async () => {
      try {
          if (prodId) {
            setProductId(prodId);
              const response = await fetch(productEndPoint); //`http://localhost:3001/ecommerce/ProductID/${prodId}`
              if (response.ok) {
                  const jsonData = await response.json();
                  setProductInfo(...jsonData);
              } else {
                  console.error('Error fetching product with ID:', response.status);
              }
          }
      } catch (error) {
          console.error('Error fetching product with ID:', error.message);
      }
    }

    useEffect(() => {
        fetchProdId();
    }, [prodId]);

    const { _id, item, src, price } = productInfo;

    return (
        <div>
            <div className="-z-10">
              {_id &&
                <div id={_id} className="prodItemGrid">
                    <div className="descAndPriceContainer">
                            <div className="desc">{item} {price}</div>
                            <div className="generalDetails pb-2 pt-2" onClick={() => toggleProdDetails()}> Product details and sizing</div>
                            {showProdDetails && 
                                <ul className="generalDetailsList">
                                    <li>True to size</li>
                                    <li>Made in Italy</li>
                                    <li>Handmade craftsmenship</li>
                                </ul>
                            }
  
                            <div className="generalDetails pb-2 pt-2" onClick={() => toggleDeliveryDetails()}> Delivery and returns</div>
                            {showDeliveryDetails && 
                                <ul className="generalDetailsList">
                                    <li>30 days from delivery date for all returns</li>
                                    <li>Returns must be in original packaging</li>
                                    <li>Full refunds or credit is available for all items </li>
                                </ul>
                            }
                     </div>
                    <img id="prodImg" src={src} className="prodImg" alt="product image" />
                    <div className="prodDetailsContainer">
                        <div> 
                            Bring out your inner fashion with this amazing piece. Ill add more to this once i update my cluster within Mongodo.
                            For now fill this up with some temp content, to see how it fills up on the page.
                        </div>
                        <a href="#" className="button text-sm slide-animation"
                            onClick={() => {
                                dispatch(
                                addItemToCart({
                                    _id,
                                    src,
                                    item,
                                    price,
                                })
                                );
                            }}
                            >
                            <span>Add to bag</span>
                        </a>
                    </div>
                </div>
              }
            </div>
        </div>
    )
}
