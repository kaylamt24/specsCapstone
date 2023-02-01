import {useContext, useEffect, useState, useCallback} from 'react'
import axios from 'axios'


import AuthContext from '../store/authContext'

const Deleted = () => {

  const {userId, token} = useContext(AuthContext)
  
  const [getAllDeletedItems, setGetAllDeletedItems] = useState('')


  const getDeletedItems = useCallback(() => {
    console.log(userId)
    axios.get(`/deletedItems/${userId}`, {
      headers: {
          authorization: token
      }
  })
    .then(res => {
      console.log(res)
      setGetAllDeletedItems(res.data)
    })
    .catch(err => console.log(err))
  }, [userId])

  useEffect(() => {
    getDeletedItems()
    
  }, [userId, getDeletedItems])
  console.log(getAllDeletedItems)

  const mappedDeletedItems = getAllDeletedItems.length ? getAllDeletedItems.map(deletedItems => {
    console.log(getAllDeletedItems)
    return (
      <div key={deletedItems.id} className='post-card'>
          <li key={deletedItems.id}>
          <a href={deletedItems.item_url} target="_blank" rel="noopener noreferrer">{deletedItems.item_name}</a>
        </li>
        <h2>
            PICTURE:
            <img
              src={`data:image/jpeg;base64,${deletedItems.item_picture}`}
              alt="Item"
            />
          </h2>
        <h2>{deletedItems.item_price}</h2>
    
      </div>
  
    )
  }) : <h2>DELETED ITEMS LIST</h2>


  return (
    <>
    {[mappedDeletedItems]}
  
    </>
   
  )
}

export default Deleted
