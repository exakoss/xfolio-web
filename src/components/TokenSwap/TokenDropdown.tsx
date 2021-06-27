import React, {useState} from 'react'
import SimpleTokenList, {SimpleTokenListTile} from './SimpleTokenList'
import {Formik,Field,Form} from 'formik'
import {TokenListEntry} from '../../types'
import {Dropdown} from 'react-bootstrap'
import theme, {commonStyles} from '../../theme'
import {useUniTokensByNameForTokenlist} from '../../graphql/uniQueries'

const mockGRT:TokenListEntry = {
    address: '0xc944e90c64b2c07662a292be6244bdf05cda44a7',
    description: 'Graph Token',
    dataSource: 'UNI',
    name: 'GRT',
    asset: 'GRT',
    formattedRate: 10,
    formattedRateDaily: 8,
    category: 'crypto',
    sign:''
}

const SimpleTokenSearch = React.forwardRef<HTMLDivElement>((props,ref) => {
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
                    <SimpleTokenList tokens={tokensByNameData as TokenListEntry[]} placeholder={'Token list is empty'} isLoading={isFetching}/>
                </Form>
            </Formik>
        </div>
    )
})

const TokenDropdown:React.FC = () => {
    return(
        <Dropdown>
            <style type="text/css">
                {`
                .dropdown-menu {
                  padding: 0;
                }
                `}
            </style>
            <Dropdown.Toggle>
                <SimpleTokenListTile token={mockGRT}/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <SimpleTokenSearch/>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default TokenDropdown
