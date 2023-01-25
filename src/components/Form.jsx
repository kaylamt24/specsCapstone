
// YOU WILL BE INSTRUCTED WHEN YOU SHOULD 
// UNCOMMENT THIS CODE

import {useState, useContext} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import AuthContext from '../store/authContext'


const Form = () => {
    const {token, userId} = useContext(AuthContext)
    const navigate = useNavigate()

    const [item_url, setItem_Url] = useState('')
    const [item_name, setItem_Name] = useState('')
    const [item_picture, setItem_Picture] = useState('')
    const [item_price, setItem_Price] = useState('')


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
                <textarea 
                    type='text'
                    placeholder='content'
                    value={item_name}
                    onChange={e => setItem_Name(e.target.value)}
                    className='form-input add-post-input textarea'
                />
                                <textarea 
                    type='text'
                    placeholder='content'
                    value={item_picture}
                    onChange={e => setItem_Picture(e.target.value)}
                    className='form-input add-post-input textarea'
                />                <textarea 
                type='text'
                placeholder='content'
                value={item_price}
                onChange={e => setItem_Price(e.target.value)}
                className='form-input add-post-input textarea'
            />
                
                <button className='form-btn'>submit</button>
            </form>
        </main>
    )
}

export default Form