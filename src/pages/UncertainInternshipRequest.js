import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header, Icon, Table } from 'semantic-ui-react';
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"

export default function UncertainInternshipRequest() {
  let { id } = useParams();
  const [internships, setInternship] = useState([])
  const [company, setCompany] = useState([])
  const [student, setStudent] = useState([])
  const [student2, setStudent2] = useState([])

  const internshipCollectionRef = collection(db, "internshipRequests")
  const companyCollectionRef = collection(db, "companies")
  const studentCollectionRef = collection(db, "students")
  useEffect(() => {
    // let confirm="Onaylanmadı"
    //let internshipRequestService=new InternshipRequestService()
    //internshipRequestService.getConfirmInternshipRequest(confirm).then(result=>setInternships(result.data.data) )
    //console.log(internships)

    const getInternship = async () => {
      const q = query(internshipCollectionRef, where("confirm", "==", "Onaylanmayı bekliyor"))
      const data = await getDocs(q);
      setInternship(data.docs.map((doc) => ({ ...doc.data() })))
      //setC(data.docs.map((doc) => ({ ...doc.data() }))[0].company)
      //setP(data.docs.map((doc) => ({ ...doc.data() }))[0].period)
      /*console.log(internships)
      const qcompany = query(companyCollectionRef, where("id", "==", data.docs.map((doc) => ({ ...doc.data() }))[0].company))
      const data1 = await getDocs(qcompany);
      setCompany(data1.docs.map((doc) => ({ ...doc.data() }))[0].name)
      console.log(company)

      const qstudent = query(studentCollectionRef, where("id", "==", data.docs.map((doc) => ({ ...doc.data() }))[0].stuId))
      const data2 = await getDocs(qstudent);
      setStudent(data2.docs.map((doc) => ({ ...doc.data() }))[0].name)
      setStudent2(data2.docs.map((doc) => ({ ...doc.data() }))[0].surname)

      console.log(student)
*/
    }

    getInternship()

  }, [])



  return (
    <div style={{ marginTop: "30px" }}>
      <Header as="h2">
        <Icon name="list alternate outline" />
        <Header.Content>Staj Talepleri</Header.Content>

      </Header>
      <Table>
        <Table.Header>
          <Table.Row>

          <Table.HeaderCell>Onay Durumu </Table.HeaderCell>
            <Table.HeaderCell>Başlangıç Tarihi </Table.HeaderCell>
            <Table.HeaderCell>Bitiş Tarihi </Table.HeaderCell>
            <Table.HeaderCell>Görüntüle </Table.HeaderCell>

          </Table.Row>
        </Table.Header>

        <Table.Body>{
          internships.map((intern) => (
            <Table.Row key={intern.id}>

              <Table.Cell>{intern.confirm}</Table.Cell>
              <Table.Cell>{intern.startDate}</Table.Cell>
              <Table.Cell>{intern.endDate}</Table.Cell>

              <Table.Cell><Link to={`/adminPage/${id}/UncertainInternshipRequest/${intern.id}`}> Görüntüle</Link></Table.Cell>
            </Table.Row>
          ))
        }
        </Table.Body>
      </Table>
    </div>
  )
}
