import { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

import AuthContext from "../store/authContext";

const Profile = () => {
  const { userId, token } = useContext(AuthContext);
  const [getAllSavedItems, setGetAllSavedItems] = useState([]);

  const moveToDeleted = (itemId) => {
    console.log(userId)
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
          console.log(res);
          setGetAllSavedItems(res.data);
        })
        .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    getSavedItems();
  }, [userId, getSavedItems]);
  console.log(getAllSavedItems);




  const mappedSavedItems = getAllSavedItems.length ? (
    getAllSavedItems.map((savedItems) => {
      console.log(getSavedItems);
      return (
        <div key={savedItems.id} className="post-card">
          <h2>{savedItems.item_url}</h2>
          <h2>{savedItems.item_name}</h2>
          <h2>{savedItems.item_picture}</h2>
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

export default Profile;
