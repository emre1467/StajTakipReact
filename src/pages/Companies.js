import React, { useEffect, useState } from 'react'
import { Header, Icon, Table } from 'semantic-ui-react'
import CompanyService from '../services/companyService'

export default function Companies() {
    const [companies,setCompany]=useState([])
    useEffect(() => {
      let companyService=new CompanyService()
      companyService.getCompanies().then(result=>setCompany(result.data.data))
    }, [])
    
  return (
    <div>
         <Header as="h2">
                <Icon name="list alternate outline" />
                <Header.Content>Şirketler</Header.Content>

            </Header>
            <Table>
            <Table.Header>
                    <Table.Row>
                        
                        <Table.HeaderCell>Ad</Table.HeaderCell>
                        <Table.HeaderCell>Onay Durumu </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>{
                    companies.map((company) => (


                        <Table.Row key={company.companyId}>
                            <Table.Cell>{company.name}</Table.Cell>
                            <Table.Cell>{company.confirm}</Table.Cell>
                        </Table.Row>

                    ))
                }

                </Table.Body>
            </Table>
    </div>
  )
}
