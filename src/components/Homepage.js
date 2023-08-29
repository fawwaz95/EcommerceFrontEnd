import { Link } from "react-router-dom";

const Homepage = () => {
    return(
        <div className="flex items-center justify-center h-screen">
        <img
          className="h-full w-full object-cover"
          alt=""
          src="https://solesavy.com/wp-content/uploads/2020/08/Screen-Shot-2020-08-24-at-9.46.17-AM.png"
        />
        <div className="absolute">
          <div className="">
            <Link to="/Shop" className="vintageFont text-white text-4xl">
              Paix & Amour
            </Link>
          </div>
        </div>
      </div>
         //"https://cdn.shopify.com/s/files/1/0509/0079/5541/files/FD8453-428_FD8460-428_DM0879-100_0753_300dpi_V2.jpg?v=1690335608w_1990"
        /*<img src="//www.aimeleondore.com/cdn/shop/files/LEON_DORE_MOBILE_0001_230718_ALD_SS23_VINTAGE_SHOT_01_430.jpg?v=1691157120" 
             className="h-full w-auto object-cover"
             alt="Homepage Image"
        />*/
        /*"//cdn.shopify.com/s/files/1/0302/7829/files/DESKTOP_HP_0001_Scan_6_a19f8a0f-149f-46be-a66d-6a7dff556bb3_3000x.jpg?v=1683900362"*/
        /*<img src="https://www.pbs.org/independentlens/wp-content/uploads/2019/10/decadeoffire-skateboard.jpg" className="absolute h-full w-full -z-50"></img>*/
       /* <div className="bg-[url('https://borasification.com/wp-content/uploads/2023/02/Teddy-Santis-Aime%CC%81-Leon-Dore-histoire.jpeg')] bg-cover bg-no-repeat h-full w-full fixed">
        </div>*/
    )
}

export default Homepage;