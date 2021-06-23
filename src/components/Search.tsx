import React, {useEffect, useState} from 'react'
import {Formik,Field,Form} from 'formik';
import theme,{commonStyles} from '../theme';
import TokenList from './TokenList';
import {useUniTokensByNameForTokenlist} from '../graphql/uniQueries';
import PopupMenu from './PopupMenu';
import {TokenListEntry} from '../types';

const Search:React.FC = () => {
    const [filter,setFilter] = useState<string>('')
    const {data: tokensByNameData, isFetching} = useUniTokensByNameForTokenlist(filter,'ONE_DAY')

    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>): void => {
        setFilter(e.target.value)
    }

    return(
        <Formik initialValues={{filterValue:''}} onSubmit={() => {}}>
            <Form style={{...commonStyles.flexColumn as React.CSSProperties,height: '85%', justifyContent:'start', marginTop: '15%', width:'380px'}}>
                <PopupMenu/>
                <Field name='filterValue' placeholder='Input ticker here...'
                       type='text' style={{fontSize: theme.fontsize.large, marginBottom:theme.distance.normal}}
                    onKeyUp={handleChange}
                />
                <TokenList tokens={tokensByNameData as TokenListEntry[]} placeholder={'Token list is empty'} isLoading={isFetching}/>
            </Form>
        </Formik>
    )
}

export default Search
