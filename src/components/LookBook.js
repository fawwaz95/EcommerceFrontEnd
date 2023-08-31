import { useEffect, useState } from "react";
const imageContext = require.context("../images/lookbook", false, /\.(jpg|jpeg|png)$/);
const imagePaths = imageContext.keys().map(imageContext);
const dateOpts = { weekday: 'long', month: 'long', day: 'numeric' };
const todayDate = new Date().toLocaleDateString("en-US", dateOpts);

const LookBook = () => {
    const [openImage, setOpenImage] = useState(false);
    const [pathofImg, setPathofImg] = useState("");

    useEffect(() => {
        console.log("Rerendering.......");
    },[openImage])

    const resizeImage = (imagePath) => {
        console.log("Clicked image.....");
        setOpenImage(true);
        setPathofImg(imagePath);
    }

    const closeImage = () => {
        console.log("Closing image.....");
        setOpenImage(false);
    }

    return (
        <div>
            <div className="flex justify-center text-center p-10">
                <div>
                    <div className="text-xs"> {todayDate} </div>
                    <p className="Financier Display font-semibold text-lg"> Paix & Amour LookBook </p>
                </div>
            </div>
            {!openImage ?
            <div className="grid grid-cols-3 justify-items-center gap-3 pr-10 pl-10 pb-10">
                {
                    imagePaths.map((imgPath, index) => {
                        return(
                            <div key={index} className="hover:transform hover:scale-105"> {/*hover:transform hover:scale-105 will increase size of image by 5%*/}
                                <img  id={index} src={imgPath} alt={`Lookbook image ${index}`} onClick={() => resizeImage(imgPath)}/>
                            </div>
                        )
                    })
                }
            </div>
            : 
            <div>
                <a href="#" className="flex justify-end pr-5" onClick={() => closeImage()}>
                    <svg id="close" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"  stroke="white">
                        <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
                    </svg>
                </a>
                <div className="flex justify-center items-center pt-1 pb-5 pl-5 pr-5">
                    <img src={pathofImg} className="h-auto sm:h-screen"/>
                </div>
            </div>

            }
        </div>
    );
}

export default LookBook;