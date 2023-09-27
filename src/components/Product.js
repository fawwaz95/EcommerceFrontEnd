import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/actions/cartActions';
import { useLocation, useParams } from 'react-router-dom';

export default function Product () {
    const PORT = process.env.PORT || 3001;
    const productEndPoint = process.env.REACT_APP_BACKENDSERVER ? `${process.env.REACT_APP_BACKENDSERVER}/ecommerce/ProductID/${prodId}` : `http://localhost:${PORT}/ecommerce/ProductID/${prodId}`;
    const [productInfo, setProductInfo] = useState({});
    const [productId, setProductId] = useState(null);
    const dispatch = useDispatch();
    const { prodId } = useParams();

    const fetchProdId = async () => {
      console.log(`get the prodId param ${prodId}`);
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
            <div className="scrollProd -z-10">
              {_id &&
                <div id={_id} className="prodItemGrid">
                    <img id="prodImg" src={src} className="prodImg" alt="product image"/>
                    <div id="prodInfo" className="desc vintageFont text-xs">{item}</div>
                    <div id="prodPrice" className="price vintageFont text-xs">{price}</div>
                    <a href="#" className="button text-sm slide-animation" onClick={() => {
                        dispatch(addItemToCart({
                            _id, src, item, price
                        }))}}>
                        <span>Add to bag</span>
                    </a>
                </div>
              }
            </div>
        </div>
    )
}
