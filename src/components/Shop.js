import {useEffect, useState} from 'react';
import ShopItem from './ShopItem';
import FetchingData from './FetchingData';

export default function Shop(){
    const PORT = process.env.PORT || 3001;
    const itemEndPoint = process.env.REACT_APP_URL ?  `${process.env.REACT_APP_URL}/ecommerce/Shop` : `http://localhost:${PORT}/ecommerce/Shop`;
    let [shopInfo, setShop] = useState();
    let [isLoading, setIsLoading] = useState(true);

    const fetchShop = async () => {
        try{
            console.log("The env endpoint: " + process.env.reactAppUrl);
            const response = await fetch(itemEndPoint); //`http://localhost:3001/ecommerce/Shop`
            const jsonData = response.ok? await response.json() : new Error('Error fetching Shop endpoint');
            setShop(jsonData);
        }catch(error){
            console.error('Error fetching product with ID:', error.message);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        fetchShop();
    }, []);

        return(
                 <div className="bg-white h-full w-full text-black">
                    <div className="scrollable">
                            <div id="productList" className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-10 text-sm align-content-start">
                            {!isLoading ?
                                shopInfo.map((items) => {
                                    return(
                                        <ShopItem items={items} />
                                    )
                                    }) : <FetchingData />
                            }                             
                            </div> 
                        </div>
                </div>
        )
}

