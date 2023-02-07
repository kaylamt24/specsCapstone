import {useContext, useEffect, useState, useCallback} from 'react'
import axios from 'axios'


import AuthContext from '../store/authContext'

import Header from './Header'

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
        <main >
  
        <div className='grid grid-cols-3 ml-60 mr-60 justify-center items-center mt-8 mb-8 bg-white h-full text-center shadow-[0px_7px_25px_navy] relative mx-auto rounded-lg overflow-hidden' key={deletedItems.id}>

        <span className="grid ml-28 mt-10 mb-10">
            <img 
              src={`data:image/jpeg;base64,${deletedItems.item_picture}`}
              alt="Item"
            />
          </span>

          <li className='grid justify-center items-center w-full font-quicksand font-bold hover:text-blue-700' key={deletedItems.id}>

          <a href={deletedItems.item_url}  target="_blank" rel="noopener noreferrer">{deletedItems.item_name} </a>
        </li>

          <div className="grid justify-center items-center ml-36 font-quicksand font-bold text-xl">{deletedItems.item_price}</div>

      
        </div>
        
        
        </main>
  
    )
  }) : <h2>DELETED ITEMS LIST</h2>


  return (
    <>
    <Header /> 
    {[mappedDeletedItems]}
  
    </>
   
  )
}

export default Deleted
