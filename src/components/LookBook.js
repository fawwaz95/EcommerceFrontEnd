import { useEffect } from "react";
const imageContext = require.context("../images/lookbook", false, /\.(jpg|jpeg|png)$/);
const imagePaths = imageContext.keys().map(imageContext);
const dateOpts = { weekday: 'long', month: 'long', day: 'numeric' };
const todayDate = new Date().toLocaleDateString("en-US", dateOpts);

const LookBook = () => {

    useEffect(() => {

    },[])

    return (
        <div>
            <div className="flex justify-center text-center p-10">
                <div>
                    <div className="text-xs"> {todayDate} </div>
                    <p className="Financier Display font-semibold text-lg"> Paix & Amour LookBook </p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3 pr-10 pl-10 pb-10">
                {
                    imagePaths.map((imgPath, index) => {
                        return(
                            <img key={index} id={index}  src={imgPath} alt={`Lookbook image ${index}`}/>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default LookBook;