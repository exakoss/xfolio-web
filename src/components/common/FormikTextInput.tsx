import React from 'react'
import {useField} from 'formik'
import theme from '../../theme'

const styles = {
    errorText: {
        marginLeft: theme.distance.tiny,
        color: theme.colors.warning
    }
}

const FormikTextInput:React.FC<{name:string, placeholder:string,type:string,style:React.CSSProperties}> = ({name,placeholder,type,style}) => {
    const [field, meta, helpers] = useField(name)

    return(
        <>
            <input placeholder={placeholder}
                   onChange={(event) => {
                        helpers.setValue(event.target.value)
                   }}
                   onBlur={() => {helpers.setTouched(true)}}
                   value={field.value}
                   style={style}
                   type={type}
            />
            {meta.touched && meta.error ? (
                <div style={styles.errorText}>{meta.error}</div>
            ) : null}
        </>
    )
}

export default FormikTextInput
