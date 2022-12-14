import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Header, Icon, List, Tab, Table } from 'semantic-ui-react';
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"


export default function InternshipRequestDetail() {
    let { idd } = useParams();
    const [internships, setInternship] = useState([])
    const [company, setCompany] = useState([])
    const [student, setStudent] = useState([])
    const periodCollectionRef = collection(db, "periods")
    const [period, setPeriod] = useState([])
    const internshipCollectionRef = collection(db, "internshipRequests")
    const companyCollectionRef = collection(db, "companies")
    const studentCollectionRef = collection(db, "students")
    
    let onaylandÄ± = "OnaylandÄ±"
    let reddedildi = "OnaylanmadÄ±"
    useEffect(() => {
        //internshipService.getInternshipRequestById(idd).then(result => setInternships(result.data.data))
        const getInternship = async () => {
            const q = query(internshipCollectionRef, where("id", "==", idd))
            const data = await getDocs(q);
            setInternship(data.docs.map((doc) => ({ ...doc.data() })))
            //setC(data.docs.map((doc) => ({ ...doc.data() }))[0].company)
            //setP(data.docs.map((doc) => ({ ...doc.data() }))[0].period)
            console.log(internships)
            const qcompany = query(companyCollectionRef, where("id", "==", data.docs.map((doc) => ({ ...doc.data() }))[0].company))
            const data1 = await getDocs(qcompany);
            setCompany(data1.docs.map((doc) => ({ ...doc.data() })))
            console.log(company)
      
            const qstudent = query(studentCollectionRef, where("id", "==", data.docs.map((doc) => ({ ...doc.data() }))[0].stuId))
            const data2 = await getDocs(qstudent);
            setStudent(data2.docs.map((doc) => ({ ...doc.data() })))
            console.log(student)

            const qperiod = query(periodCollectionRef, where("id", "==", data.docs.map((doc) => ({ ...doc.data() }))[0].period))
            const data3 = await getDocs(qperiod);
            setPeriod(data3.docs.map((doc) => ({ ...doc.data() }))[0].name)
 
      
          }
      
          getInternship()



    }, [])

    const onayla= async() =>{
       // internshipService.updateConfirm(idd, onaylandÄ±).then(result => console.log(result.data.message))
       const stajDoc=doc(db,"internshipRequests",idd) 
       await updateDoc(stajDoc,{confirm:onaylandÄ±})
       alert("Staj talebi onaylandÄ±")
    }
    const reddet= async() =>{
        // internshipService.updateConfirm(idd, onaylandÄ±).then(result => console.log(result.data.message))
        const stajDoc=doc(db,"internshipRequests",idd) 
        await updateDoc(stajDoc,{confirm:reddedildi})
        alert("Staj talebi reddedildi")
     }


    return (
        <div style={{ marginTop: "50px" }}>
           
            <Header as="h3">
                <Icon name="list alternate outline" />
                <Header.Content>ÃÄrenci Bilgileri </Header.Content>

            </Header>
            <Table color='green' celled>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell> AdÄ±</Table.HeaderCell>
                        <Table.HeaderCell>SoyadÄ±</Table.HeaderCell>
                        <Table.HeaderCell>ÃÄrenci NumarasÄ±</Table.HeaderCell>
                        <Table.HeaderCell>E-posta</Table.HeaderCell>
                        <Table.HeaderCell>BÃ¶lÃ¼m</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{
                    student.map((stu) => (
                        <Table.Row key={stu.id}>
                            <Table.Cell>{stu.name}</Table.Cell>
                            <Table.Cell >{stu.surname}</Table.Cell>
                            <Table.Cell >{stu.studentNo}</Table.Cell>
                            <Table.Cell >{stu.email}</Table.Cell>
                            <Table.Cell >{stu.department}</Table.Cell>
                        </Table.Row>
                    ))
                }
                </Table.Body>
            </Table>
            <Header as="h3">
                <Icon name="list alternate outline" />
                <Header.Content>Åirket Bilgileri </Header.Content>

            </Header>

            <Table color='blue' celled>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell>Åirket AdÄ±</Table.HeaderCell>
                        <Table.HeaderCell>Adresi</Table.HeaderCell>
                        <Table.HeaderCell>Protokol</Table.HeaderCell>
                        <Table.HeaderCell>Telefon NumarasÄ±</Table.HeaderCell>
                        <Table.HeaderCell>Onay Durumu</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{
                    company.map((company) => (
                        <Table.Row key={company.id}>
                           <Table.Cell>{company.name}</Table.Cell>
                            <Table.Cell >{company.address}</Table.Cell>
                            <Table.Cell><a href={(company.protocolUrl)} target="_blank"><Icon size="small" circular name='file pdf' />Protokol</a></Table.Cell>
                            <Table.Cell >{company.phoneNumber}</Table.Cell>
                            <Table.Cell >{company.confirm}</Table.Cell>
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

                        <Table.HeaderCell>Staj DÃ¶nemi</Table.HeaderCell>
                        <Table.HeaderCell>Onay Durumu</Table.HeaderCell>
                        <Table.HeaderCell>Ä°sg Belgesi</Table.HeaderCell>
                        <Table.HeaderCell>MÃ¼stehaklÄ±k Belgesi</Table.HeaderCell>
                        <Table.HeaderCell>BaÅvuru Formu</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>{
                    internships.map((intern) => (
                        <Table.Row key={intern.id}>
                            <Table.Cell >{period}</Table.Cell>
                            <Table.Cell >{intern.confirm}</Table.Cell>
                            <Table.Cell><a href={(intern.isgUrl)} target="_blank"><Icon size="small" circular name='file pdf' />Ä°sg Belgesi</a></Table.Cell>
                            <Table.Cell><a href={(intern.mÃ¼stehaklÄ±kUrl)} target="_blank"><Icon size="small" circular name='file pdf' />MÃ¼stehaklÄ±k Belgesi</a></Table.Cell>
                            <Table.Cell> <a href={(intern.internshipformUrl)} target="_blank"><Icon size="small" circular name='file pdf' />BaÅvuru formu</a></Table.Cell>

                        </Table.Row>
                    ))

                }
                </Table.Body>

            </Table>

            <Table  celled>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell>BaÅlangÄ±Ã§ Tarihi</Table.HeaderCell>
                        <Table.HeaderCell>BitiÅ Tarihi</Table.HeaderCell>
                        <Table.HeaderCell> Ä°Å gÃ¼nÃ¼</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>{
                    internships.map((intern) => (
                        <Table.Row key={intern.id}>
                            <Table.Cell >{intern.startDate}</Table.Cell>
                            <Table.Cell >{intern.endDate}</Table.Cell>
                            <Table.Cell>{intern.workDay}</Table.Cell>

                        </Table.Row>
                    ))

                }
                </Table.Body>

            </Table>

            <Button onClick={reddet} color='red' align="center">Reddet</Button>
            <Button onClick={onayla} color='green'>Onayla</Button>



        </div >

    )
}
//<Button onClick={TÄ±kla(intern.isgUrl)}>tÄ±kla</Button>
