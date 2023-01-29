import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { run } from "../../server/controllers/scraperThree";

import AuthContext from "../store/authContext";

const Form = () => {
  const { userId, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [item_url, setItem_Url] = useState("");
  const [item_name, setItem_Name] = useState("");
  const [item_picture, setItem_Picture] = useState("");
  const [item_price, setItem_Price] = useState('');
  const [scrapeData, setScrapeData] = useState('');
  const [loading, setLoading] = useState(false)



    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
        const response = await axios.get('/scraperThree', {
            params: {
                url: item_url
            }
        })
    
    // setScrapeData(response.data)

    if(response.data) {
        setScrapeData(response.data)
        setItem_Name(scrapeData.item_name);
        setItem_Picture(scrapeData.item_picture);
        setItem_Price(scrapeData.item_price);
    }

     await axios
        .post(
        "/saveditems",
        { item_url, 
            item_name: scrapeData.item_name, 
            item_picture: scrapeData.item_picture, 
            item_price: scrapeData.item_price, 
            userId },
        {
            headers: {
            authorization: token,
            },
        }
        )
        .then(() => {
        // navigate("/profile");
        })
        .catch((err) => console.log(err));
    } finally {
        setLoading(false)
    }
    };


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

        <div className='scraped-data'>
                    {<h1>{scrapeData.item_name}</h1>}
                    {<img src={`data:image/png;base64,${scrapeData.item_picture}`} alt='idk whatever you put in'/>}
                    {<p>{scrapeData.item_price}</p>}
                    {/* <h1>{scrapeData.title}</h1> */}
                    {/* scrapeData &&  */}
                </div>
        <button className="form-btn" disabled={loading}>{loading ? "Loading..." : "Submit"}</button>
      </form>
    </main>
  );
};

export default Form;

// const scrapeData = async () => {
//     const data = await run(item_url)
//     setItem_Name(data.title)
//     setItem_Picture(data.picture)
//     setItem_Price(data.imageElement)
// }
// scrapeData()

//   useEffect(() => {
//     if (item_url) {
//       axios
//         .get("/scraperThree", {
//           params: {
//             url: item_url,
//           },
//         })
//         .then((response) => {
//           setScrapeData(response.data);
//           console.log(response.data)
//         });
//     }
//     console.log(item_url, 'useEffect')
//   }, [item_url]);