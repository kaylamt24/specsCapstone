import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AuthContext from "../store/authContext";

import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Header";


import imageThree from "./images/imageThree.png";
import imageFive from "./images/imageFive.png";
import imageEight from "./images/imageEight.png";
import imageNine from "./images/imageNine.png";
import imageThirteen from "./images/imageThirteen.png";
import imageFourteen from "./images/imageFourteen.png";


const Profile = () => {



  const images = [
    

    imageThree,
    imageFive,
    imageEight,
    imageNine,
    imageThirteen,
    imageFourteen,
 
  ];

  const { userId, token } = useContext(AuthContext);
  const navigate = useNavigate();


  const [item_url, setItem_Url] = useState("");
  const [item_name, setItem_Name] = useState("");
  const [item_picture, setItem_Picture] = useState("");
  const [item_price, setItem_Price] = useState("");
  const [scrapeData, setScrapeData] = useState("");
  const [loading, setLoading] = useState(false);

  const category = ("Electronics", "Beauty", "Household", "Clothing", "Miscellaneous");
  const [categories, setCategories] = useState("");

  const [randomImage, setRandomImage] = useState(images[0]);
  const [lastIndex, setLastIndex] = useState(-1)

  
  



  const handleSubmit = async (e) => {
    toast.success('We are adding this item to your list!')
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
            : categories === "Miscellaneous"
            ? navigate('/miscellaneous')
            : navigate("/profile");
        })
        .catch((err) => console.log(err, "error at useEffect"));
    }
    console.log(scrapeData, "useEffect");
  }, [scrapeData, categories]);



  useEffect(() => {
    const randomImageSelector = () => {
      let newIndex = Math.floor(Math.random() * images.length)
    while (newIndex === lastIndex) {
      newIndex = Math.floor(Math.randon() * images.length)
    };
    setLastIndex(newIndex)
    return images[newIndex]
  }
    setRandomImage(randomImageSelector());
  }, []);


  return (
    <main>

  <ToastContainer
  position="top-center"
  autoClose={7000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
  transition={Flip}
/>

      <Header />
      <div className="grid grid-cols-2 bg-slate-100 overflow-hidden h-full w-full mr-20 font-inter">
        <div className="grid mt-8 ml-32 mb-6 shadow-[0_15px_70px_navy] bg-white relative mx-auto rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} >
            <input
              type="url"
              id="url"
              name="url"
              placeholder="Paste it..."
              value={item_url}
              onChange={(e) => setItem_Url(e.target.value)}
              className="grid w-96 mb-4 mt-14 ml-20 h-14 text-xl text-center shadow-[0px_7px_25px_navy] relative mx-auto rounded-lg overflow-hidden placeholder-black"
            />



            <div className="flex-col text-xl  mt-8 w-96 mb-24 h-12 mr-10 ml-32 rounded-xl ">
              <div>
                <input
                  className="mt-8 mb-4 accent-navy"
                  type="checkbox"
                  value="Beauty"
                  checked={categories === "Beauty"}
                  onChange={(e) => setCategories(e.target.value)}
                />
                <label className="mr-4 ml-4">Health and Beauty</label>
              </div>

              <div>
                <input 
                  className="mt-4 mb-4 accent-navy"
                  type="checkbox"
                  value="Clothing"
                  checked={categories === "Clothing"}
                  onChange={(e) => setCategories(e.target.value)}
                />
                <label className="mr-4 ml-4">
                  Clothing, Shoes & Accessories
                </label>
              </div>

              <div>
                <input
                  className="mt-4 mb-4 accent-navy"
                  type="checkbox"
                  value="Household"
                  checked={categories === "Household"}
                  onChange={(e) => setCategories(e.target.value)}
                />
                <label className="mr-4 ml-4">Household Goods</label>
              </div>

              <div>
                <input
                  className="mt-4 mb-4 accent-navy"
                  type="checkbox"
                  value="Electronics"
                  checked={categories === "Electronics"}
                  onChange={(e) => setCategories(e.target.value)}
                />
                <label className="mr-4 ml-4">Electronics</label>
              </div>

              <div>
                <input
                  className="mt-4 mb-12 accent-navy"
                  type="checkbox"
                  value="Miscellaneous"
                  checked={categories === "Miscellaneous"}
                  onChange={(e) => setCategories(e.target.value)}
                />
                <label className="mr-4 ml-4">Miscellaneous</label>
              </div>

            </div>

            <div className="grid w-96 mb-4 mt-56 ml-20 h-14 text-xl text-center shadow-[0px_7px_25px_navy] relative mx-auto rounded-lg overflow-hidden placeholder-black">
              <button className="mt-2 mb-2 ">
                {loading ? "Loading..." : "Save it..."}
              </button>
            </div>
          </form>
        </div>

        
        <span className="grid mt-8 ml-16 mb-8 shadow-[0_15px_70px_navy] bg-transparent relative mx-auto rounded-lg overflow-hidden">
          <img src={randomImage} />
        </span>
      </div>
    </main>
  );
};

export default Profile;
