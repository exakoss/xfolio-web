import React, {Dispatch, SetStateAction, useState} from 'react'
import SimpleTokenList, {SimpleTokenListTile} from './SimpleTokenList'
import {Formik,Field,Form} from 'formik'
import {TokenListEntry} from '../../types'
import {Accordion, Button, Card, Dropdown} from 'react-bootstrap'
import theme, {commonStyles} from '../../theme'
import {useUniTokensByNameForTokenlist} from '../../graphql/uniQueries'
import {Search} from 'react-bootstrap-icons'

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
                <Form style={{...commonStyles.flexColumn as React.CSSProperties, alignItems:'center', width:'auto'}}>
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
    const [fromQuantity,setFromQuantity] = useState<number>(1)
    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>): void => {
        setFromQuantity(Number(e.target.value))
    }
    
    return(
        
            <Accordion>
                <Card style={{ width:'280px', borderRadius:'15px'}}>
                    <Card.Header style={{display: 'flex', flexDirection: 'row', paddingLeft: '5px', paddingRight: '5px', 
                    background:theme.colors.white, justifyContent: 'space-between',alignItems:'center',height:'50px'}}>
                        <SimpleTokenListTile token={token}/>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                          <Search/>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body style={{padding:'5px', height: 'auto'}}>
                        <SimpleTokenSearch setToken={setToken}/>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
    )
}

export default TokenDropdown
