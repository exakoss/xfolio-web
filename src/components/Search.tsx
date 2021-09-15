import React, {useState} from 'react'
import {Formik,Field,Form} from 'formik';
import theme,{commonStyles} from '../theme';
import TokenList from './TokenList';
import {useUniTokensByNameForTokenlist} from '../graphql/uniQueries';
import {TokenListEntry} from '../types';



const Search:React.FC = () => {
    const [filter,setFilter] = useState<string>('')
    const {data: tokensByNameData, isFetching} = useUniTokensByNameForTokenlist(filter,'ONE_DAY')

    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>): void => {
        setFilter(e.target.value)
    }
// style={{fontFamily: theme.fontLink.fontFamilyLabel, fontSize: theme.fontSize.large}}
    return(
        <Formik initialValues={{filterValue:''}} onSubmit={() => {}}>
            <Form style={{...commonStyles.innerContainer as React.CSSProperties, justifyContent:'start', width:'400px'}}>
                <Field name='filterValue' placeholder='Input ticker here...' type='text' style={{...commonStyles.textBox as React.CSSProperties, 
                width:'300px', marginBotton: '0px', marginTop: '10px', position:'absolute'}}
                    onKeyUp={handleChange}
                />
                <TokenList tokens={tokensByNameData as TokenListEntry[]} placeholder={'Token list is empty'} 
                 isLoading={isFetching}
                />
            </Form>
        </Formik>
    )
}

export default Search
