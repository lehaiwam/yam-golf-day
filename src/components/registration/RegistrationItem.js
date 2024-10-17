import React from 'react';
import {Link} from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";
import styles from './RegistrationItem.module.css';

const RegistrationItem = ({registration}) => {

    // console.log("RegistrationItem : ", registration);

    const { id, firstName, lastName, cell, email, yamAlumni } = registration;

    return (
        <div className={styles.registrationItem}>       
            <div className={styles.registrationInfo}>
                <span>{ firstName }</span>
                <span>{ lastName }</span>
                <span>{ cell }</span>
                <span>{ email ? email : 'no email address'}</span>
                <span>{ yamAlumni ? true : false }</span>
            </div>

            <div className='linkToEditRegistration'>
                <Link to='/edit-registration' state={ {registration: registration}} >                 
                    <i className={styles.faEditUser}> <FaUserEdit /> </i>
                </Link>
            </div>
        </div>
    )

}

export default RegistrationItem