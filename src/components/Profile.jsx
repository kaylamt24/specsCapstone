import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AuthContext from "../store/authContext";

import Header from "./Header";



import imageOne from './images/imageOne.png'
import imageTwo from './images/imageTwo.png'
import imageThree from './images/imageThree.png'
import imageFour from './images/imageFour.png'
import imageFive from './images/imageFive.png'
import imageSix from './images/imageSix.png'
import imageSeven from './images/imageSeven.png'
import imageEight from './images/imageEight.png'





const Profile = () => {

  const images = [
    imageOne,
    imageTwo,
    imageThree,
    imageFour,
    imageFive,
    imageSix,
    imageSeven,
    imageEight
  ]


  const { userId, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [item_url, setItem_Url] = useState("");
  const [item_name, setItem_Name] = useState("");
  const [item_picture, setItem_Picture] = useState("");
  const [item_price, setItem_Price] = useState("");
  const [scrapeData, setScrapeData] = useState("");
  const [loading, setLoading] = useState(false);

  const category = ("Electronics", "Beauty", "Household", "Clothing");
  const [categories, setCategories] = useState("");

  const [randomImage, setRandomImage] = useState(images[0])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get("/scraperThree", {
        params: {
          url: item_url,
        },
      });

      if (response.data && categories) {
        console.log(response.data, "resp data");
        setScrapeData(response.data);
        setItem_Name(scrapeData.title);
        setItem_Picture(scrapeData.screenshotBase64);
        setItem_Price(scrapeData.price);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrapeData && categories) {
      axios
        .post(
          "/savedItems",
          {
            item_url,
            item_name: scrapeData.title,
            item_picture: scrapeData.screenshotBase64,
            item_price: scrapeData.price,
            category: categories,
            userId,
          },
          {
            headers: {
              authorization: token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          setScrapeData(response.data);
          console.log(response.data, "resp data ");
          categories === "Electronics"
            ? navigate("/electronics")
            : categories === "Beauty"
            ? navigate("/beauty")
            : categories === "Clothing"
            ? navigate("/clothing")
            : categories === "Household"
            ? navigate("/household")
            : navigate("/profile");
        })
        .catch((err) => console.log(err, "error at useEffect"));
    }
    console.log(scrapeData, "useEffect");
  }, [scrapeData, categories]);

  useEffect(() => {
    const randomImageSelector = Math.floor(Math.random() * images.length)
    setRandomImage(images[randomImageSelector])
  }, [])

  return (

    <main>
      
  <Header/>
      <div className='grid grid-cols-2 bg-white h-full w-full mr-24'>
        <div className="grid mt-6 ml-28 mb-4  shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] bg-white relative mx-auto rounded-lg overflow-hidden">
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          id="url"
          name="url"
          placeholder="Paste it..."
          value={item_url}
          onChange={(e) => setItem_Url(e.target.value)}
          className="grid w-96 mt-20 ml-20 h-14 text-2xl text-center shadow-[0px_7px_25px_navy] relative mx-auto rounded-lg overflow-hidden placeholder-black bg-white " 
        />
        
          <div className="flex-col justify-center mt-6 w-96 mb-24 h-12 mr-20 ml-20 text-2xl rounded-xl text-center  bg-transparent">
            <div>
            <input className="mt-6 mb-4"
              type="radio"
              value="Beauty"
              checked={categories === "Beauty"}
              onChange={(e) => setCategories(e.target.value)}
            />
             <label className='mr-4 ml-4'>Health and Beauty</label>
             </div>


             <div>
            <input className="mt-4 mb-4"
              type="radio"
              value="Clothing"
              checked={categories === "Clothing"}
              onChange={(e) => setCategories(e.target.value)}
            />
            <label className='mr-4 ml-4'>Clothing, Shoes & Accessories</label>
            </div>



            <div>
            <input className="mt-4 mb-4"
              type="radio"
              value="Household"
              checked={categories === "Household"}
              onChange={(e) => setCategories(e.target.value)}
            />
         <label className='mr-4 ml-4'>Household Goods</label>
         </div>


         <div>
            <input className="mt-4 mb-4"
              type="radio"
              value="Electronics"
              checked={categories === "Electronics"}
              onChange={(e) => setCategories(e.target.value)}
            />
            <label className='mr-4 ml-4' >Electronics</label>
            </div>
          </div>
          
          <button className="mt-20 w-52 h-12 ml-40 bg-limegreen shadow-[0px_7px_25px_navy] text-2xl rounded-l bg-transparent text-center items-center" >
            {loading ? "Loading..." : "Save it..."}
          </button>
    
      </form>
      </div>
      <span className='grid mt-5 ml-16 mb-4 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] bg-transparent relative mx-auto rounded-lg overflow-hidden'><img src={randomImage}/></span>
      </div>
    </main>
    
  );

};

export default Profile;
