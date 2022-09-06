import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, List, Table } from 'semantic-ui-react';
import CompanyService from '../services/companyService';


export default function CompanyDetail() {
    let { idd } = useParams();
    const [companies, setCompany] = useState([])
    let companyService = new CompanyService()

    let onaylandı="Onaylandı"
    let reddedildi="Onaylanmadı"
    useEffect(() => {
        companyService.getById(idd).then(result => setCompany(result.data.data))
       
    }, [])
    function gönder(params) {
        window.location.replace(` ${params}`);
    }
function Onayla(){
    companyService.updateConfirm(idd,onaylandı).then(result=>console.log(result.data.message))
    alert("Şirket onaylandı")
}
function Reddet(){
    companyService.updateConfirm(idd,reddedildi).then(result=>console.log(result.data.message))
    alert("Şirket Reddedildi")
}
    return (
        <div style={{ marginTop: "50px" }}>
            <Table color='green' celled>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                        <Table.HeaderCell>Adresi</Table.HeaderCell>
                        <Table.HeaderCell>Protokol</Table.HeaderCell>
                        <Table.HeaderCell>Telefon Numarası</Table.HeaderCell>
                        <Table.HeaderCell>Onay Durumu</Table.HeaderCell>

 
                    </Table.Row>

                </Table.Header>
                <Table.Body>{
                    companies.map((company) => (

                        <Table.Row key={company.companyId}>
                            <Table.Cell>{company.name}</Table.Cell>
                            <Table.Cell >{company.address}</Table.Cell>
                            <Table.Cell >{company.protocolUrl}</Table.Cell>
                            <Table.Cell >{company.phoneNumber}</Table.Cell>
                            <Table.Cell >{company.confirm}</Table.Cell>

                        </Table.Row>
                    ))
                    
                }

                </Table.Body>

            </Table>
            <Button onClick={Reddet} color='red' align="center">Reddet</Button>
            <Button onClick={Onayla} color='green'>Onayla</Button>



        </div>

    )
}
