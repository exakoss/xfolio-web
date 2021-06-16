import React, {useEffect, useState} from 'react'
import {Formik,Field,Form, useFormikContext} from 'formik';
import theme,{commonStyles} from '../theme';
import TokenList from './TokenList';
import {useETHPrice, useUniTokensByNameForTokenlist} from '../graphql/uniQueries';
import {useBlockNumber} from '../graphql/blockQueries';
import PopupMenu from './PopupMenu';

const Search:React.FC = () => {
    const [filter,setFilter] = useState<string>('')
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const {data: ethData , status: ethStatus} = useETHPrice()
    const {data: blockData , status: blockStatus} = useBlockNumber('ONE_DAY')
    //@ts-ignore
    const {data: tokensByNameData,status:tokensByNameStatus} = useUniTokensByNameForTokenlist(filter,blockData,ethData,(!!ethData && !!blockData))
    console.log(tokensByNameData)

    useEffect(() => {
        (tokensByNameStatus === 'loading')
            ? setIsLoading(true)
            : setIsLoading(false)
    },[tokensByNameStatus])

    useEffect(() => {
        console.log(filter)
    }, [filter])

    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>): void => {
        setFilter(e.target.value)
    }

    return(
        <Formik initialValues={{filterValue:''}} onSubmit={() => {}}>
            <Form style={{...commonStyles.flexColumn as React.CSSProperties,height: '85%', justifyContent:'start', marginTop: '15%'}}>
                <PopupMenu/>
                <Field name='filterValue' placeholder='Input ticker here...' type='text' style={{fontSize: theme.fontsize.large, marginBottom:theme.distance.normal}}
                    onKeyUp={handleChange}
                />
                {/*@ts-ignore*/}
                <TokenList tokens={tokensByNameData} placeholder={'Tokenlist is empty'} isLoading={isLoading}/>
            </Form>
        </Formik>
    )
}

export default Search
