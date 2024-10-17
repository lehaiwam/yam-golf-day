import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import DumbFounded from '../../images/crooked-smile.jpg'

const PageNotFound = () => {
    const navigate = useNavigate()

    //const { currentUser } = useContext( AuthContext )
    const [ errorMessage, setErrorMessage ] = useState('Invalid URL path, Error 404 - Page Not Found!!!')

    return (
        <div className='formContainer'>   
            <div className='notFound404'>
                <p>{errorMessage}</p>
                <img src={DumbFounded} alt='' />

                <div className='modalActions'>
                    <button className='okay' onClick={ () => navigate('/') }>Back</button>
                </div>
            </div>

        </div>
    )
}

export default PageNotFound