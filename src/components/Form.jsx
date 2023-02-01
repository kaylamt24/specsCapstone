import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AuthContext from "../store/authContext";

const Form = () => {
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
            : categories === 'Clothing'
            ? navigate('/clothing')
            : categories === 'Household'
            ? navigate('/household')
            : navigate("/profile")
          //   navigate("/beauty");
          //   if (category === "Beauty") {
          //     navigate("/beauty");
          //   } else if (category === "Electronics") {
          //     navigate("/electronics");
          //   } else {
          //     navigate("/profile");
          //   }
        })
        .catch((err) => console.log(err, "error at useEffect"));
    }
    console.log(scrapeData, "useEffect");
  }, [scrapeData, categories]);

  return (
    <main>
      <form className="form add-post-form" onSubmit={handleSubmit}>
        <input
          type="url"
          id="url"
          name="url"
          placeholder="Insert URL here"
          value={item_url}
          onChange={(e) => setItem_Url(e.target.value)}
          className="form-input add-post-input"
        />

        <div className="flex-row status-container">
          <div className="radio-btn">
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
        <button className="form-btn" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </main>
  );
};

export default Form;

{
  /* {scrapeData && scrapeData.title}
        {scrapeData && (
          <img
            src={`data:image/png;base64,${scrapeData.screenshotBase64}`}
            alt="idk whatever you put in"
          />
        )}
        {scrapeData && scrapeData.price} */
}

//   navigate("/beauty");
// if(category === 'Beauty'){
//     navigate('/beauty')
// } else if (category === 'Electronics'){
//     navigate('/electronics')
// } else {
//     navigate('profile')
// }

//         import { useState, useContext, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import AuthContext from "../store/authContext";

// const Form = () => {
//   const { userId, token } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [item_url, setItem_Url] = useState("");
//   const [item_name, setItem_Name] = useState("");
//   const [item_picture, setItem_Picture] = useState("");
//   const [item_price, setItem_Price] = useState("");
//   const [scrapeData, setScrapeData] = useState("");
//   const [loading, setLoading] = useState(false);

//   const category = ('Electronics', 'Beauty');
//   const [categories, setCategories] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await axios.get("/scraperThree", {
//         params: {
//           url: item_url,
//         },
//       });

//       if (response.data && categories) {
//         console.log(response.data, "resp data");
//         setScrapeData(response.data);
//         setItem_Name(scrapeData.title);
//         setItem_Picture(scrapeData.screenshotBase64);
//         setItem_Price(scrapeData.price);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (scrapeData && categories) {
//       axios
//         .post(
//           "/savedItems",
//           {
//             item_url,
//             item_name: scrapeData.title,
//             item_picture: scrapeData.screenshotBase64,
//             item_price: scrapeData.price,
//             category: categories,
//             userId,
//           },
//           {
//             headers: {
//               authorization: token,
//             },
//           }
//         )
//         .then((response) => {
//           console.log(response);
//           setScrapeData(response.data);
//           console.log(response.data, "resp data ");
//           if (
//             categories === "Electronics"
//               ? navigate("/electronics")
//               : categories === "Beauty"
//               ? navigate("/beauty")
//               : navigate("/profile")
//           );
//         })
//         .catch((err) => console.log(err, "error at useEffect"));
//     }
//     console.log(scrapeData, "useEffect");
//   }, [scrapeData, categories]);

//   return (
//     <main>
//       <form className="form add-post-form" onSubmit={handleSubmit}>
//         <input
//           type="url"
//           id="url"
//           name="url"
//           placeholder="Insert URL here"
//           value={item_url}
//           onChange={(e) => setItem_Url(e.target.value)}
//           className="form-input add-post-input"
//         />

//         <div className="flex-row status-container">
//           <div className="radio-btn">
//             <label htmlFor="private-status">Beauty</label>
//             <input
//               type="radio"
//               value="Electronics"
//               checked={categories === "Electronics"}
//               onChange={(e) => setCategories(e.target.value)}
//             />
//              <label htmlFor="private-status">Electronics</label>
//             <input
//               type="radio"
//               value="Beauty"
//               checked={categories === "Beauty"}
//               onChange={(e) => setCategories(e.target.value)}
//             />
//           </div>
//         </div>
