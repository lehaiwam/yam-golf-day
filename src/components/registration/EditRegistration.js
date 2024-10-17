import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { db } from '../../firebase'
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import styles from './EditRegistration.module.css';


const EditRegistration = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const registration = location.state?.registration
    const { id, firstName, lastName, email, cell, yamAlumni } = registration
    const [errorMessage, setErrorMessage] = useState('')


    const handleRemoveMigs = async() => {
        console.log('Removing REGISTRATION : ', id, firstName);

        try {
            const registrationRef = doc(db, "registrations", id ); 
            await deleteDoc(registrationRef);
            navigate('/');
        } catch (error) {
            setErrorMessage('Remove REGISTRATION attempt failed!!!');
            console.log('Error on REGISTRATION updateDoc(): ', error); 
        }  
    }


    const handleSubmit = async(e) => {
        e.preventDefault()
        // Read the form data
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        const { firstName, lastName, email, cell, yamAlumni } = formJson;
        
        try {
            const registrationRef = doc(db, "registrations", id);
            await updateDoc(registrationRef, { 
                firstName,
                lastName,
                'cellphone': cell,
                email,
                'yamAlumni': yamAlumni === '1' ? true : false,
            })
        } catch (error) {
            console.log('Error on REGISTRATIONS updateDoc(): ', error); 
        }
        navigate(-1)
    }


    return (
        <>
            <h2 className={styles.header1}>YOUTH ALIVE MINISTRIES</h2>
            <h3 className={styles.header1}>Edit Registration Data</h3>      
            <form className={styles.form}  method="post" onSubmit={ handleSubmit }>
                <div className={styles.fullWidthContainer}> 
                    <div className={styles.inputWrapper}> 
                        <label htmlFor='firstName'>First Name: </label>
                        <input 
                            type='text'
                            name="firstName" 
                            defaultValue={ firstName }
                        />     
                    </div>
                    <div className={styles.inputWrapper}> 
                        <label htmlFor='lastName'>Last Name: </label>
                        <input 
                            type='text'
                            name="lastName" 
                            defaultValue={ lastName }
                        />                                
                    </div>
                </div>

                <div className={styles.fullWidthContainer}> 
                    <div className={styles.inputWrapper}> 
                        <label htmlFor='cell'>Cellphone: </label>  
                        <input 
                            type='text'
                            name="cell" 
                            defaultValue={ cell }
                        />     
                    </div>
                    <div className={styles.inputWrapper}>
                        <label>Email: </label>
                        <input 
                            className={styles.email}
                            type='text'
                            id='email'
                            name="email" 
                            defaultValue={ email }
                        />
                    </div>                             
                </div>

                <div className={styles.fullWidthContainer}> 

                    <div className={styles.inputWrapper}>  
                        <label htmlFor='yamAlumni'>YamAlumni: </label>
                        <select 
                            name="yamAlumni" 
                            defaultValue={ yamAlumni ? '1'  : '0' }
                        >
                            <option value={'0'}>No</option>
                            <option value={'1'}>Yes</option>
                        </select>   
                    </div>


                    <div className={styles.inputWrapper}>
                          {/** Dummy wrapper to force yamAlumni to be on the left side of the page */}               
                    </div>
                </div>

                <div className={styles.actionButtons}>   
                    <div>
                        <button type='submit'>
                            Save Changes
                        </button>
                    </div>
                    <div>
                        <button type='button' onClick={ handleRemoveMigs }>
                            Remove
                        </button>
                    </div>
                    <div>
                        <button type='button' onClick={() => navigate(-1)}>
                            Back
                        </button>
                    </div>
                </div>
            </form>     
      </>
    )
}

export default EditRegistration