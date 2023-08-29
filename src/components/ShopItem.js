import React, { useEffect } from "react";
import {Link} from 'react-router-dom';

const ShopItem = ({items}) => {
    return (
        <Link to={`/Product/${items._id}`} >
            <div id={items._id} className="border border-2 border-white">
                <img id="prodImg" src={items.src}/>
                <div className="flex justify-between pt-5 vintageFont text-xs">
                    <p className="align-left"> {items.item}</p>
                    <div className="align-right">{items.price}</div>
                </div>
            </div>
        </Link>
    )
}

export default ShopItem;