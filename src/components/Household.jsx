import { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

import AuthContext from "../store/authContext";

const Household = () => {
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
    getAllSavedItems.filter(savedItems => savedItems.category === 'Household').map((savedItems) => {
        console.log(getSavedItems, "get Saved items");
      
      return (
        <div key={savedItems.id} className="post-card">
            <h3>{savedItems.category === 'Household' ? "Household" : 'Uncategorized'}</h3>
          <li key={savedItems.id}>

          <a href={savedItems.item_url} target="_blank" rel="noopener noreferrer">{savedItems.item_name}</a>
        </li>
          <h2>
            PICTURE:
            <img
              src={`data:image/jpeg;base64,${savedItems.item_picture}`}
              alt="Item"
            />
          </h2>
          <h2>{savedItems.item_price}</h2>
          <button onClick={() => moveToDeleted(savedItems.id)}>
            Delete Items
          </button>
        </div>
      );
    })
  ) : (
    <h2>You have no saved wishlist items</h2>
  );

  return <>{[mappedSavedItems]}</>;
};

export default Household;