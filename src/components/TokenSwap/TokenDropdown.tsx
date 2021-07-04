import React, {Dispatch, SetStateAction, useState} from 'react'
import SimpleTokenList, {SimpleTokenListTile} from './SimpleTokenList'
import {Formik,Field,Form} from 'formik'
import {TokenListEntry} from '../../types'
import {Dropdown} from 'react-bootstrap'
import theme, {commonStyles} from '../../theme'
import {useUniTokensByNameForTokenlist} from '../../graphql/uniQueries'

interface SimpleTokenSearchProps extends React.ComponentPropsWithoutRef<'div'> {
    setToken: Dispatch<SetStateAction<TokenListEntry>>
}

const SimpleTokenSearch = React.forwardRef<HTMLDivElement, SimpleTokenSearchProps>(({setToken},ref) => {
    const [filter,setFilter] = useState<string>('')
    const {data: tokensByNameData, isFetching} = useUniTokensByNameForTokenlist(filter,'ONE_DAY')

    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>): void => {
        setFilter(e.target.value)
    }

    return(
        <div ref={ref} style={{backgroundColor: theme.colors.background}}>
            <Formik initialValues={{filterValue:''}} onSubmit={() => {}}>
                <Form style={{...commonStyles.flexColumn as React.CSSProperties, alignItems:'center', width:'220px'}}>
                    <Field name='filterValue' placeholder='Input ticker here...'
                           type='text' style={{fontSize: theme.fontsize.small, marginBottom:theme.distance.tiny}}
                           onKeyUp={handleChange}
                    />
                    <SimpleTokenList tokens={tokensByNameData as TokenListEntry[]} placeholder={'Token list is empty'} isLoading={isFetching} setToken={setToken}/>
                </Form>
            </Formik>
        </div>
    )
})

const TokenDropdown:React.FC<{token:TokenListEntry,setToken: Dispatch<SetStateAction<TokenListEntry>>}> = ({token,setToken}) => {
    return(
        <div style={{marginBottom:theme.distance.tiny}}>
            <Dropdown>
                <style type="text/css">
                    {`
                    .dropdown-menu {
                        padding: 0;
                    }
                    .btn-primary {
                        border-color: #000;
                        background-color: #333;  
                    }
                    .btn-primary.focus,
                    .btn-primary:focus,
                    .btn-primary:hover,
                    .btn-primary:active,
                    .btn-primary:not(:disabled):not(.disabled).active,
                    .btn-primary:not(:disabled):not(.disabled):active,
                    .show>.btn-primary.dropdown-toggle {
                        background-color: #333;
                     }
                    `}
                </style>
                <Dropdown.Toggle>
                    <SimpleTokenListTile token={token}/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <SimpleTokenSearch setToken={setToken}/>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default TokenDropdown
