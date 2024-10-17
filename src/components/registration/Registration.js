import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './Registration.module.css'; 

import { db } from '../../firebase'
import { collection, addDoc, Timestamp } from "firebase/firestore";

const Registration = () => {
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm();
    

    const handleSubmitForm = async ( data ) => {
        //console.log('Data: ', data)
        const { firstName, lastName, cell, email, yamAlumni } = data;
        // store data on the backend
        try {
            await addDoc(collection(db, "registrations"), {
                firstName,
                lastName,
                'cellphone': cell,
                email,
                'yamAlumni': yamAlumni === '1' ? true : false,
                'date': Timestamp.now(),
            })
        } catch (error) {
            console.log('Error in YAM GOLFER REGISTRATION addDoc(): ', error) 
        }
        navigate('/');
    }



    return (
        <>
            <h2 className={styles.header1}>YOUTH ALIVE MINISTRIES</h2>
            <h3 className={styles.header1}>Golf Day Registration</h3>
            <form className={styles.form}  onSubmit={handleSubmit ( handleSubmitForm )}>
                <div className={styles.inputWrapper}>
                    <label htmlFor="firstName">First Name: </label>
                    <input 
                        { ...register( 'firstName', {required:true, minLength:3, maxLength:25} ) }
                        id='firstName' 
                        type="text" 
                    />
                </div>
                { errors.firstName?.type === 'required' && <p className={styles.alertText}>First name is a mandatory field</p> }
                { (errors.firstName?.type === 'minLength'|| errors.firstName?.type === 'maxLength') && <p  className={styles.alertText}>First name must have min 3 and max of 25 chars</p> }

                <div className={styles.inputWrapper}>
                    <label htmlFor="lastName">Last Name: </label>
                    <input 
                        { ...register('lastName', {required:true, minLength:3, maxLength:25}) }
                        id='lastName' 
                        type="text" 
                    />
                </div>
                { errors.lastName?.type === 'required' && <p className={styles.alertText}>Last name is a mandatory field</p> }
                { (errors.lastName?.type === 'minLength' || errors.lastName?.type === 'maxLength') && <p className={styles.alertText}>Last name must have min 3 and max of 25 chars</p> }

                <div className={styles.inputWrapper}>
                    <label htmlFor="cell" className="form-label">Cellphone: </label>
                    <input 
                        { ...register('cell', {required:true, minLength:10, maxLength:10}) }
                        id='cell' 
                        type="text"  
                    />
                </div>
                { errors.cell?.type === 'required' && <p className={styles.alertText} >Cellphone is a mandatory field</p> }
                { (errors.cell?.type === 'minLength' || errors.cell?.type === 'maxLength') && <p className={styles.alertText}>Cell phone must be  exactly 10 digits long</p> }

                <div className={`${styles.inputWrapper}`}>
                    <label htmlFor="email">Email: </label>
                    <input 
                        className={styles.email}
                        { ...register('email') }
                        id='email' 
                        type="email" 
                    />
                </div>

                <div className={`${styles.inputWrapper}`}>

                    <label htmlFor="yamAlumni">YAM Alumni: </label>
                    <select
                        { ...register('yamAlumni', { required:true }) }
                        name="yamAlumni" 
                        id='yamAlumni'
                        defaultValue={ '0' }
                    >
                        <option value={'0'}>No</option>
                        <option value={'1'}>Yes</option>
                    </select>
                </div>
                
                <div className={styles.actionButtons}> 
                    <button type="submit"> Submit</button>               
                    <button type='button' onClick={() => navigate('/')}>
                        Home
                    </button>
                </div>      
            </form>
        </>
    )
}

export default Registration