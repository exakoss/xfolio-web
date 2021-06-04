import React from 'react'
import {Formik, Form, Field} from 'formik';
import theme from '../../theme';
import * as yup from 'yup'
import {Button} from 'react-bootstrap';

const validationSchema = yup.object().shape({
    password: yup
        .string()
        .min(6, 'Password should be at least 6 characters long')
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null],'Passwords must match')
})

const styles = {
    container: {
        display: 'flex',
        flexDirection:'column',
        justifyContent:'space-around',
    },
}

const PasswordInput:React.FC<{onSubmit: ({password}: {password:string}) => Promise<void>}> = ({onSubmit}) => {
    return(
        <Formik  onSubmit={onSubmit} initialValues={{password:'', passwordConfirmation: ''}} validationSchema={validationSchema}>
            <Form style={styles.container as React.CSSProperties}>
                <div style={{...styles.container as React.CSSProperties,marginBottom:'200px'}}>
                    <Field name='password' placeholder='Input your password here...' type='password' style={{fontSize: theme.fontsize.large, marginBottom:theme.distance.normal}}/>
                    <Field name='passwordConfirmation' placeholder='Confirm your password...' type='password' style={{fontSize: theme.fontsize.large}}/>
                </div>
                <Button type='submit' style={{backgroundColor:theme.colors.green, fontSize: theme.fontsize.large}}>Submit</Button>
            </Form>
        </Formik>
    )
}

export default PasswordInput
