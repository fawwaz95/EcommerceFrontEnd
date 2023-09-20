import { useEffect, useState } from "react";

const Insperations = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        "https://cdn.shopify.com/s/files/1/0302/7829/files/1_51d92cdd-280a-4396-a41d-6b6f280da3b1_480x480.jpg?v=1677263740",
        "https://cdn.shopify.com/s/files/1/0302/7829/files/2_c1e27961-7922-4308-98f7-60135468afc6_480x480.jpg?v=1677263720",
        "https://cdn.shopify.com/s/files/1/0302/7829/files/7_595c3928-e270-4081-932f-9b8e1374d2a6_480x480.jpg?v=1677263580",
        "https://cdn.shopify.com/s/files/1/0302/7829/files/5_58229e69-e7e3-41a9-90ee-ae329c4b67ab_480x480.jpg?v=1677263641",
        "https://cdn.shopify.com/s/files/1/0302/7829/files/4_fa3ef4a1-589d-428d-89bf-aa585fddb034_480x480.jpg?v=1677263660",
        "https://cdn.shopify.com/s/files/1/0302/7829/files/3_7b780cdf-ce78-405b-b19b-327c575ccf31_480x480.jpg?v=1677263705"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="grid grid-cols-1 justify-center items-center pt-0 pb-10 scrollable">
            <div className="book">
                <div className="page">
                    <img src={images[currentIndex]} alt={`Page`} />
                    <div>
                <article className="absolute bottom-0 left-0 right-0 vintageFont text-center text-xs pt-5 pb-10">
                    Paix & Amour does not claim ownership<br></br>
                    of any images unless otherwise stated.
                </article>
            </div>
                </div>
            </div>

        </div>
    );
};

export default Insperations;