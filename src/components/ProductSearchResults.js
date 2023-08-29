import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

export default function ProductSearchResults({searchResults, prodClicked}) {
    let [productInfo, setProductInfo] = useState({});
    
    const onClickProduct = (id) => {
        prodClicked(id);
    }

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:3001/ecommerce/item/${searchResults}`);
            if (response.ok) {
                const jsonData = await response.json();
                setProductInfo(jsonData);
            } else {
                console.error("Error with the server status");
            }
        } catch (error) {
            console.error('Error fetching product:', error.message);
        }
    };

    useEffect(() => {
        if (searchResults.length !== 0) {
            fetchProduct();
        }else if (searchResults.length === 0) {
            setProductInfo([]);
        }
    }, [searchResults]);
    

    return (
        //absolute left-0 right-0
            <div className="absolute left-0 right-0 z-50"> 
               <div className={productInfo.length >= 1 ? "p-2 bg-transparent backdrop-blur-md backdrop-brightness-50 text-white w-full" : "hidden"}>
                    {Array.isArray(productInfo) && productInfo.length >= 1 && productInfo.map(prodArrayItems => {
                            return(                                                               
                            <Link  key={prodArrayItems._id} to={`/Product/${prodArrayItems._id}`} onClick={()=>onClickProduct(prodArrayItems._id)}> {/*state={{prodId: prodArrayItems._id}}*/}
                                <div key={prodArrayItems._id} className="grid grid-cols-3 justify-items-start border-solid  border-b-2 border-black-600">
                                <img src={prodArrayItems.src} width="50px" height="50px" alt={prodArrayItems.item} />
                                <p>{prodArrayItems.item}</p>
                                <p>{prodArrayItems.price}</p>
                                </div>
                            </Link>)})}
                </div>
            </div>
    )
}