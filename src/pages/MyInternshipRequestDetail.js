import { getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Header, Icon, List, Table } from 'semantic-ui-react';
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"


export default function MyInternshipRequestDetail() {
    let { idd } = useParams();
    let { id } = useParams();
    const internshipCollectionRef = collection(db, "internshipRequests")
    const companyCollectionRef = collection(db, "companies")
    const periodCollectionRef = collection(db, "periods")
    const [internship, setInternship] = useState([])
    const [company, setCompany] = useState([])
    const [period, setPeriod] = useState([])
    const [c,setC] = useState([])
    const [p,setP] = useState([])


    useEffect(() => {
        //let internshipService = new InternshipRequestService()
        // internshipService.getInternshipRequestById(idd).then(result => setInternship(result.data.data))
        
        const getInternship = async () => {
            const q = query(internshipCollectionRef, where("id", "==", idd))
            const data = await getDocs(q);
            setInternship(data.docs.map((doc) => ({ ...doc.data() })))
            //setC(data.docs.map((doc) => ({ ...doc.data() }))[0].company)
            //setP(data.docs.map((doc) => ({ ...doc.data() }))[0].period)
            
            const qcompany = query(companyCollectionRef, where("id", "==", data.docs.map((doc) => ({ ...doc.data() }))[0].company))
            const data1 = await getDocs(qcompany);
            setCompany(data1.docs.map((doc) => ({ ...doc.data() })))
            console.log(company)
            
            const qperiod = query(periodCollectionRef, where("id", "==", data.docs.map((doc) => ({ ...doc.data() }))[0].period))
            const data2 = await getDocs(qperiod);
            setPeriod(data2.docs.map((doc) => ({ ...doc.data() }))[0].name)
            console.log(data.docs.map((doc) => ({ ...doc.data() }))[0].company)
 
        }
       
      getInternship()
    }, [])
    

    return (
        <div style={{ marginTop: "50px" }}>


            <Header as="h3">
                <Icon name="list alternate outline" />
                <Header.Content>??irket Bilgileri </Header.Content>

            </Header>

            <Table color='blue' celled>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell>??irket Ad??</Table.HeaderCell>
                        <Table.HeaderCell>Adresi</Table.HeaderCell>
                        <Table.HeaderCell>Protokol</Table.HeaderCell>
                        <Table.HeaderCell>Telefon Numaras??</Table.HeaderCell>
                        <Table.HeaderCell>Onay Durumu</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{
                    company.map((comp) => (
                        <Table.Row key={comp.id}>
                            <Table.Cell>{comp.name}</Table.Cell>
                            <Table.Cell >{comp.address}</Table.Cell>
                            <Table.Cell><a href={(comp.protocolUrl)} target="_blank">Protokol</a></Table.Cell>
                            <Table.Cell >{comp.phoneNumber}</Table.Cell>
                            <Table.Cell >{comp.confirm}</Table.Cell>
                        </Table.Row>
                    ))
                }
                </Table.Body>
            </Table>
            <Header as="h3">
                <Icon name="list alternate outline" />
                <Header.Content>Staj Talebi Bilgileri</Header.Content>

            </Header>
            <Table color='red' celled>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell>Staj D??nemi</Table.HeaderCell>
                        <Table.HeaderCell>Onay Durumu</Table.HeaderCell>
                        <Table.HeaderCell>??sg Belgesi</Table.HeaderCell>
                        <Table.HeaderCell>M??stehakl??k Belgesi</Table.HeaderCell>
                        <Table.HeaderCell>Ba??vuru Formu</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>{
                    internship.map((intern) => (
                        <Table.Row key={intern.id}>
                            <Table.Cell >{period}</Table.Cell>
                            <Table.Cell >{intern.confirm}</Table.Cell>
                            <Table.Cell><a href={(intern.isgUrl)} target="_blank">??sg Belgesi</a></Table.Cell>
                            <Table.Cell><a href={(intern.m??stehakl??kUrl)} target="_blank">M??stehakl??k Belgesi</a></Table.Cell>
                            <Table.Cell> <a href={(intern.internshipformUrl)} target="_blank">Ba??vuru formu</a></Table.Cell>

                        </Table.Row>
                    ))

                }
                </Table.Body>

            </Table>

            <Table celled>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell>Ba??lang???? Tarihi</Table.HeaderCell>
                        <Table.HeaderCell>Biti?? Tarihi</Table.HeaderCell>
                        <Table.HeaderCell> ???? g??n??</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>{
                    internship.map((intern) => (
                        <Table.Row key={intern.id}>
                            <Table.Cell >{intern.startDate}</Table.Cell>
                            <Table.Cell >{intern.endDate}</Table.Cell>
                            <Table.Cell>{intern.workDay}</Table.Cell>

                        </Table.Row>
                    ))

                }
                </Table.Body>

            </Table>

        </div>

    )
}
