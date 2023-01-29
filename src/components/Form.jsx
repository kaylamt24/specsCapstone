import {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { run } from '../../server/controllers/scraperThree'

import AuthContext from '../store/authContext'




const Form = () => {
    const {userId, token} = useContext(AuthContext)
    const navigate = useNavigate()

    const [item_url, setItem_Url] = useState('')
    const [item_name, setItem_Name] = useState('')
    const [item_picture, setItem_Picture] = useState('')
    const [item_price, setItem_Price] = useState('')


    useEffect(() => {
        if(item_url){
            const scrapeData = async () => {
                const data = await run(item_url)
                setItem_Name(data.title)
                setItem_Picture(data.picture)
                setItem_Price(data.imageElement)
            } 
            scrapeData()
        }
    }, [item_url])
    axios.get('/server/controllers/scraperThree.js')

    const handleSubmit = e => {
        e.preventDefault()

  

        axios.post('/saveditems', {item_url, item_name, item_picture, item_price, userId}, {
            headers: {
                authorization: token
            }
        })
            .then(() => {
                navigate('/profile')
            })
            .catch(err => console.log(err))
    }

    return (
        <main>
            <form className='form add-post-form' onSubmit={handleSubmit}>
                <input 
                    type='url' id='url' name='url'
                    placeholder='Insert URL here'
                    value={item_url}
                    onChange={e => setItem_Url(e.target.value)}
                    className='form-input add-post-input'
                />
                <div className='scraped-data'>
                    <h1>{item_name}</h1>
                    <img src={item_picture}/>
                    <p>{item_price}</p>
                </div>
               
                
                <button className='form-btn'>submit</button>
            </form>
        </main>
    )
}

export default Form