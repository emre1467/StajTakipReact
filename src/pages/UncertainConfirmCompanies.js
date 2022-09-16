import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header, Icon, Table } from 'semantic-ui-react'
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"

export default function UncertainConfirmCompanies() {
    let { id} = useParams();

    const [companies,setCompany]=useState([])
    const companyCollectionRef = collection(db, "companies")

      useEffect(() => {
        //companyService.getByConfirmCompanies(confirm).then(result=>setCompany(result.data.data))
      const getCompany = async () => {
        const q = query(companyCollectionRef, where("confirm", "==", "Onaylanmayı bekliyor"))
        const data = await getDocs(q);
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
                          <Table.HeaderCell>Onay Durumu </Table.HeaderCell>
                      </Table.Row>
                  </Table.Header>
  
                  <Table.Body>{
                      companies.map((company) => (
  
  
                          <Table.Row key={company.companyId}>
                              <Table.Cell>{company.name}</Table.Cell>
                              <Table.Cell>{company.confirm}</Table.Cell>
                              <Table.Cell><Link to={`/adminPage/${id}/UncertainConfirmCompanies/${company.id}`}> Görüntüle</Link></Table.Cell>
                          
                          </Table.Row>
  
                      ))
                  }
  
                  </Table.Body>
              </Table>
      </div>
    )
}
