import { useEffect, useState } from "react";
const imageContext = require.context("../../public/images/lookbook", false, /\.(jpg|jpeg|png)$/);
const imagePaths = imageContext.keys().map(imageContext);
const dateOpts = { weekday: 'long', month: 'long', day: 'numeric' };
const todayDate = new Date().toLocaleDateString("en-US", dateOpts);

const LookBook = () => {
    const [openImage, setOpenImage] = useState(false);
    const [pathofImg, setPathofImg] = useState("");

    useEffect(() => {
    },[openImage, pathofImg])

    const resizeImage = (imagePath) => {
        console.log("Clicked image.....");
        setOpenImage(true);
        setPathofImg(imagePath);
    }

    const closeImage = () => {
        console.log("Closing image.....");
        setOpenImage(false);
    }

    const changeImg = (id) => {
        const numberOfImgs = imagePaths.length;
        const getImg = document.getElementById("lookbookImg");
        const formatImg = getImg.src.split("https://paixamour.netlify.app")[1]; //"http://localhost:3000"
        console.log("formated img");
        console.log(formatImg);
        const indexOfImg = imagePaths.indexOf(formatImg);
        console.log("index of img");
        console.log(indexOfImg);
      
        let newIndex;
      
        if (id === "rightArrow") {
          newIndex = (indexOfImg + 1) % numberOfImgs; //% operator (modulo), is used to stay within the range of the array. If we exceed its range, it will wrap around the array and return 0
        } else if (id === "leftArrow") {
          newIndex = (indexOfImg - 1 + numberOfImgs) % numberOfImgs; //% operator (modulo), same as above but once we hit -1. It will wrap around the otherside of the array and return 20.
        }
      
        setPathofImg(imagePaths[newIndex]);
    }


    return (
        <div className="scrollable">
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
                <div id="closeBtn">                   
                    <a href="#" className="flex justify-end pr-5" onClick={() => closeImage()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"  stroke="white">
                            <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
                        </svg>
                    </a>
                </div>
                <div className="relative flex items-center h-full">
                        <div id="leftArrow" className="w-1/4 flex justify-start ml-4" onClick={() => changeImg("leftArrow")}>  {/*Need to fix the alignment of my left arrow.....*/}
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" >
                                    <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"/>
                                </svg>
                            </a>
                        </div>
                        <div id="lookbookContainer" className="flex justify-center m-10">
                            <img id="lookbookImg" src={pathofImg} className="sm:w-2/6" alt="Lookbook image" />
                        </div>
                        <div id="rightArrow" className="w-1/4 flex justify-end mr-4" onClick={() => changeImg("rightArrow")}>
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                                    <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/>
                                </svg>
                            </a>
                        </div>
                </div>
            </div>
            }
        </div>
    );
}

export default LookBook;