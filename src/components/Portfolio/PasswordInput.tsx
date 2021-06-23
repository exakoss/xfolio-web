import React from 'react'
import {Formik, Form, Field,useField} from 'formik';
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
    errorText: {
        marginLeft: theme.distance.tiny,
        color: theme.colors.warning
    }
}

const FormikTextInput:React.FC<{name:string, placeholder:string,type:string,style:React.CSSProperties}> = ({name,placeholder,type,style}) => {
    const [field, meta, helpers] = useField(name)

    return(
        <>
            <input placeholder={placeholder} {...field} {...helpers} style={style} type={type}/>
            {meta.touched && meta.error ? (
                <div style={styles.errorText}>{meta.error}</div>
            ) : null}
        </>
    )
}

const PasswordInput:React.FC<{onSubmit: ({password}: {password:string}) => Promise<void>}> = ({onSubmit}) => {
    return(
        <Formik  onSubmit={onSubmit} initialValues={{password:'', passwordConfirmation: ''}} validationSchema={validationSchema}>
            <Form style={styles.container as React.CSSProperties}>
                <div style={{...styles.container as React.CSSProperties,marginBottom:'200px'}}>
                    {/*<Field name='password' placeholder='Input your password here...' type='password' style={{fontSize: theme.fontsize.large, marginBottom:theme.distance.normal}}/>*/}
                    {/*<Field name='passwordConfirmation' placeholder='Confirm your password...' type='password' style={{fontSize: theme.fontsize.large}}/>*/}
                    <FormikTextInput name='password' placeholder='Input your password here...' type='password' style={{fontSize: theme.fontsize.large}}/>
                    <FormikTextInput name='passwordConfirmation' placeholder='Confirm your password...' type='password' style={{fontSize: theme.fontsize.large,marginTop:theme.distance.normal}}/>
                </div>
                <Button type='submit' style={{backgroundColor:theme.colors.green, fontSize: theme.fontsize.large}}>Submit</Button>
            </Form>
        </Formik>
    )
}

export default PasswordInput
