import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { db } from '../../firebase';
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { FaUserPlus } from "react-icons/fa";

import RegistrationItem from './RegistrationItem';
import styles from './ShowAll.module.css';


const ShowAll = () => {    
    const [errorMessage, setErrorMessage] = useState('');
    const [ registrations, setRegistrations ] = useState([]);

    useEffect(() => {  

        const getAllRegistrations = async() => {
            let reloadRegistrationsData = true; 
            let tmpArrayRegistrations = [];
            if (reloadRegistrationsData) {
                setErrorMessage('');
                const q = query(collection(db, "registrations"), orderBy("firstName") );
                try {
                    const querySnapshot = await getDocs(q)
                    if (querySnapshot.empty) {
                        console.log('Empty REGISTRATIONS table? Impossible!!!')
                        setErrorMessage('Empty REGISTRATIONS table? Impossible!!!')
                    } else {
                        querySnapshot.forEach((doc) => {
                            // console.log( doc.id, " => ", doc.data() )
                            tmpArrayRegistrations.push({
                                id: doc.id, 
                                firstName: doc.data().firstName,
                                lastName: doc.data().lastName,
                                email: doc.data().email,
                                cell: doc.data().cellphone,
                                yamAlumni: doc.data().yamAlumni
                            })
                            
                        })
                        // console.log('Length of the array: ', tmpArrayRegistrations.length);
                    }
                } catch (error) {
                    console.log('Error in useEffect: getAllRegistrations()', error.message)
                }
            } 

            if (tmpArrayRegistrations.length > 0) {
                setRegistrations(tmpArrayRegistrations);
            }
        }

        getAllRegistrations();

    },[])
  
    
    return (
        <div className={styles.showAllRegistrations}>      
            <span className={`${styles.header} ${styles.header1}`}>YOUTH ALIVE MINISTRIES</span>
            <span className={`${styles.header} ${styles.header2}`}>Golf Day Registrations</span>
            { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }

            <div className={ styles.linkToAddNewRegistration }>
                <span>Add New Registration</span>
                <Link to='/add-new-registration'>          
                    <i className={styles.faUserPlus}> <FaUserPlus /> </i>
                </Link>
            </div>

            { registrations?.length > 0 ?
            (
                <div className={styles.allRegistrations}>
                { registrations.map( (reg) => 
                    <RegistrationItem key={reg.id} registration={ reg }/>
                )}          
                </div>
            ) :
            (
                <div className={styles.allRegistrationEmpty}>
                <p className={styles.emptyText}> 
                    Please be patient! Fetching data ....
                </p>        
                </div>
            )
            }
        </div>
    )
}
  
export default ShowAll