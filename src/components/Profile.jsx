import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AuthContext from "../store/authContext";

import Header from "./Header";

import { FaSearchengin } from "react-icons/fa";

const Profile = () => {


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

  return (

    <main>
      <Header/>
 





      <form onSubmit={handleSubmit}>
        <input
          type="url"
          id="url"
          name="url"
          placeholder="Insert URL here"
          value={item_url}
          onChange={(e) => setItem_Url(e.target.value)}
          className="flex-col justify-center mt-96 w-96 border-4 mb-4 h-12 mr-4 ml-96 border-purple-900 text-2xl rounded-2xl text-center" 
        />
        

        <div>
          <div className="flex-col justify-center mt- w-96 border-4 mb-4 h-12 mr-4 ml-96 border-purple-900 text-2xl rounded-2xl text-center">
            <label>Personal Care and Beauty</label>
            <input
              type="radio"
              value="Beauty"
              checked={categories === "Beauty"}
              onChange={(e) => setCategories(e.target.value)}
            />
            <label>Clothing, Shoes & Accessories</label>
            <input
              type="radio"
              value="Clothing"
              checked={categories === "Clothing"}
              onChange={(e) => setCategories(e.target.value)}
            />
            <label>Household Goods</label>
            <input
              type="radio"
              value="Household"
              checked={categories === "Household"}
              onChange={(e) => setCategories(e.target.value)}
            />
            <label>Electronics</label>
            <input
              type="radio"
              value="Electronics"
              checked={categories === "Electronics"}
              onChange={(e) => setCategories(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 place-items-center  border-purple-900 text-2xl">
          <button disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default Profile;
