import React, {useEffect, useState} from 'react'
import {Formik,Field,Form} from 'formik';
import theme,{commonStyles} from '../theme';
import TokenList from './TokenList';
import {useUniTokensByNameForTokenlist} from '../graphql/uniQueries';
import PopupMenu from './PopupMenu';
import {TokenListEntry} from '../types';



const Search:React.FC = () => {
    const [filter,setFilter] = useState<string>('')
    const {data: tokensByNameData, status:tokensByNameStatus} = useUniTokensByNameForTokenlist(filter,'ONE_DAY')
    console.log(tokensByNameData)

    useEffect(() => {
        console.log(filter)
    }, [filter])

    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>): void => {
        setFilter(e.target.value)
    }
// style={{fontFamily: theme.fontLink.fontFamilyLabel, fontSize: theme.fontSize.large}}
    return(
        <Formik initialValues={{filterValue:''}} onSubmit={() => {}}>
            <Form style={{...commonStyles.flexColumn as React.CSSProperties,height: '85%', justifyContent:'start', marginTop: '15%', width:'380px'}}>
                <PopupMenu/>
                <Field name='filterValue' placeholder='Input ticker here...' type='text' style={{...commonStyles.textBox as React.CSSProperties, marginBottom:theme.distance.normal}}
                    onKeyUp={handleChange}
                />
                <TokenList tokens={tokensByNameData as TokenListEntry[]} placeholder={'Token list is empty'} 
                  isLoading={(tokensByNameStatus === 'loading')}
                />
            </Form>
        </Formik>
    )
}

export default Search
