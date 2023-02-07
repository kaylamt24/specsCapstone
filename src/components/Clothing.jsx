import { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

import AuthContext from "../store/authContext";

import Header from "./Header";

const Clothing = () => {
  const { userId, token } = useContext(AuthContext);
  const [getAllSavedItems, setGetAllSavedItems] = useState([]);

  const moveToDeleted = (itemId) => {
    console.log(userId);
    axios
      .delete(`savedItems/${userId}/${itemId}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        console.log(res, "MOVE TO DELETED");

        setGetAllSavedItems(
          getAllSavedItems.filter((item) => item.id !== itemId)
        );
      });
  };

  const getSavedItems = useCallback(() => {
    if (userId)
      axios
        .get(`/savedItems/${userId}`, {
          headers: {
            authorization: token,
          },
        })
        .then((res) => {
          console.log(res, "response at getSavedItems in profile");
          setGetAllSavedItems(res.data);
        })
        .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    getSavedItems();
  }, [userId, getSavedItems]);
  console.log(getAllSavedItems);

  const mappedSavedItems = getAllSavedItems.length ? (
    getAllSavedItems.filter(savedItems => savedItems.category === 'Clothing').map((savedItems) => {
        console.log(getSavedItems, "get Saved items");
      




      return (
        <main >
  
        <div className='grid grid-cols-4 ml-16 mr-16  mt-8 mb-8 bg-white h-full text-center shadow-[0px_7px_25px_navy] relative mx-auto rounded-lg overflow-hidden' key={savedItems.id}>

        <span className="grid ml-28 mt-10 mb-10">
            <img 
              src={`data:image/jpeg;base64,${savedItems.item_picture}`}
              alt="Item"
            />
          </span>

          <li className='grid justify-center items-center w-full font-quicksand font-bold hover:text-blue-700' key={savedItems.id}>

          <a href={savedItems.item_url}  target="_blank" rel="noopener noreferrer">{savedItems.item_name} </a>
        </li>

          <div className="grid justify-center items-center ml-36 font-quicksand font-bold text-xl">{savedItems.item_price}</div>

          

          <button className='grid h-10 w-36 mt-20 ml-20 justify-center text-navy  shadow-[0px_7px_25px_navy] text-l rounded-l bg-transparent text-center items-center font-quicksand font-bold text-l' onClick={() => moveToDeleted(savedItems.id)}>
            Delete Items
          </button>
        </div>
        
        
        </main>
      );
    })
  ) : (
    <span className='mt-24 ml-96 text-2xl'> </span>
  );

  return <> <Header /> {[mappedSavedItems]}</>;
};

export default Clothing;