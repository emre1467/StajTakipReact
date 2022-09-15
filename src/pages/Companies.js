import React, { useEffect, useState } from 'react'
import { Header, Icon, Table } from 'semantic-ui-react'
import CompanyService from '../services/companyService'
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"

export default function Companies() {
  const companyCollectionRef=collection(db,"companies")
    const [companies,setCompany]=useState([])
    useEffect(() => {
      const getCompany = async () => {
        let data = await getDocs(companyCollectionRef);
        setCompany(data.docs.map((doc) => ({ ...doc.data() })))
      
    }
    getCompany()
   
    }, [])
    
  return (
    <div style={{marginTop:"30px"}}>
         <Header as="h2">
                <Icon name="list alternate outline" />
                <Header.Content>Şirketler</Header.Content>

            </Header>
            <Table>
            <Table.Header>
                    <Table.Row>
                        
                        <Table.HeaderCell>Ad</Table.HeaderCell>
                        <Table.HeaderCell>Adres</Table.HeaderCell>
                        <Table.HeaderCell>Telefon Numarası</Table.HeaderCell>
                        <Table.HeaderCell>Onay Durumu </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>{
                    companies.map((company) => (


                        <Table.Row key={company.companyId}>
                            <Table.Cell>{company.name}</Table.Cell>
                            <Table.Cell>{company.address}</Table.Cell>
                            <Table.Cell>{company.phoneNumber}</Table.Cell>
                            <Table.Cell>{company.confirm}</Table.Cell>
                        </Table.Row>

                    ))
                }

                </Table.Body>
            </Table>
    </div>
  )
}
