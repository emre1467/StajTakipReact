import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Icon, List, Table } from 'semantic-ui-react';
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"


export default function CompanyDetail() {
    let { idd } = useParams();
    const [companies, setCompany] = useState([])
    const companyCollectionRef = collection(db, "companies")

    let onaylandı = "Onaylandı"
    let reddedildi = "Onaylanmadı"
    useEffect(() => {

        const getCompany = async () => {
            const q = query(companyCollectionRef, where("id", "==", idd))
            const data = await getDocs(q);
            setCompany(data.docs.map((doc) => ({ ...doc.data() })))

        }
        getCompany()

    }, [])
    function gönder(params) {
        window.location.replace(` ${params}`);
    }
    const onayla = async () => {
        // internshipService.updateConfirm(idd, onaylandı).then(result => console.log(result.data.message))
        const compDoc = doc(db, "companies", idd)
        await updateDoc(compDoc, { confirm: onaylandı })
        alert("Şirket onaylandı")
    }
    const reddet = async () => {
        // internshipService.updateConfirm(idd, onaylandı).then(result => console.log(result.data.message))
        const compDoc = doc(db, "companies", idd)
        await updateDoc(compDoc, { confirm: reddedildi })
        alert("Staj talebi reddedildi")
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
                <Table.Body >{
                    companies.map((company) => (

                        <Table.Row key={company.companyId}>
                            <Table.Cell>{company.name}</Table.Cell>
                            <Table.Cell >{company.address}</Table.Cell>

                            <Table.Cell ><a href={(company.protocolUrl)} target="_blank" ><Icon size="small" circular name='file pdf' />Protokol</a></Table.Cell>
                            <Table.Cell >{company.phoneNumber}</Table.Cell>
                            <Table.Cell >{company.confirm}</Table.Cell>

                        </Table.Row>
                    ))

                }

                </Table.Body>

            </Table>
            <Button onClick={reddet} color='red' align="center">Reddet</Button>
            <Button onClick={onayla} color='green'>Onayla</Button>



        </div>

    )
}
