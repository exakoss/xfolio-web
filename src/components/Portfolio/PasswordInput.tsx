import React from 'react'
import {Formik, Form, Field,useField} from 'formik';
import theme, {commonStyles} from '../../theme';
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
    passwordContainer: {
        display: 'flex',
        flexDirection:'column',
        width: '300px', 
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
            <Form style={{...commonStyles.outerContainer as React.CSSProperties, width:'300px', height:'500px'}}>
                <div>
                    <FormikTextInput name='password' placeholder='Input your password here...' type='password' 
                        style={{...commonStyles.textBox as React.CSSProperties, width:'300px'}}
                    />
                    <FormikTextInput name='passwordConfirmation' placeholder='Confirm your password...' type='password' 
                        style={{...commonStyles.textBox as React.CSSProperties, width:'300px'}}
                    />
                </div>
                <Button type='submit' style={commonStyles.largeButton}>Submit</Button>
            </Form>
        </Formik>
    )
}

export default PasswordInput
