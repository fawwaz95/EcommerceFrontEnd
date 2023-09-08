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
        const numberOfImgs = imagePaths.length + 1;
        const getImg = document.getElementById("lookbookImg");
        const formatImg = getImg.src.split("http://localhost:3000")[1];
        const indexOfImg = imagePaths.indexOf(formatImg);

            if(indexOfImg === numberOfImgs && id === "rightArrow"){ //Check if current image index isnt the last image in the array
                console.log("Clicked right arrow... and we are on the last image");
                setPathofImg(imagePaths[0]);
            }else if (indexOfImg === 0 && id === "leftArrow"){ //Check if we are at the first image and we clicked the left arrow
                console.log("Clicked left arrow... and we are on the first image");
                setPathofImg(imagePaths[numberOfImgs-1]);
            }else if (indexOfImg !== numberOfImgs && id === "rightArrow"){
                console.log("Clicked right arrow... but we have more images");
                setPathofImg(imagePaths[indexOfImg + 1]);
            }else if (indexOfImg !== numberOfImgs && id === "leftArrow"){
                console.log("Clicked left arrow... but we have more images");
                setPathofImg(imagePaths[indexOfImg - 1]);
            }
        
        console.log("indexOfImg");
        console.log(indexOfImg);

        console.log("number of images");
        console.log(numberOfImgs);
    }


    return (
        <div className={ "scrollable"}>
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
            <div className="relative">
                <div id="closeBtn">                   
                    <a href="#" className="flex justify-end pr-5" onClick={() => closeImage()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"  stroke="white">
                            <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
                        </svg>
                    </a>
                </div>
                <div className="flex items-center">
                    <div id="leftArrow" className="w-1/4 flex justify-end" onClick={() => changeImg("leftArrow")}>  {/*Need to fix the alignment of my left arrow.....*/}
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
                                <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"/>
                            </svg>
                        </a>
                    </div>
                    <div id="lookbookContainer" className="flex justify-center items-center w-1/2">
                        <img id="lookbookImg" src={pathofImg} className="h-auto sm:h-screen" alt="Lookbook image" />
                    </div>
                    <div id="rightArrow" className="w-1/4 justify-start" onClick={() => changeImg("rightArrow")}>
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
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