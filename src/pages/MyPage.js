//import React, { useState } from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import StudentService from '../services/studentService'
import { Button, Card, Icon, Container, Form, Grid, GridColumn, Image, List, Menu, Dropdown, DropdownItem, } from 'semantic-ui-react';
//import { useState } from "react";
import { Link, Route, useParams ,useHistory} from "react-router-dom";
import MyInternshiprequest from "./MyInternshiprequest";
import Dashboard from "../layouts/Dashboard";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"
import { db } from "./firebase-config"


//import { useParams } from 'react-router-dom';

export default function MyPage() {
  let { id } = useParams();
  const studentCollectionRef = collection(db, "students")

  //const[student,setStudent]=useState([]);
  const [students, setStudent] = useState([])
  useEffect(() => {
   
   
    //let studentService = new StudentService()
    //studentService.getById(id).then(result => setStudent(result.data.data))
 
    const q = query(studentCollectionRef, where("id", "==", id))
    const getStudents = async () => {
        let data = await getDocs(q);
        setStudent(data.docs.map((doc) => ({ ...doc.data() })))
        //console.log(studentCollectionRef)
   
       
    }
    //students.map((stu) => setId(stu.id))
    getStudents().then(()=>console.log(students ))
  
 
 
  }, [])
const history=useHistory()
function logOut(){
  localStorage.clear();
  //history.push('/')
  //window.location.assign(`http://localhost:3000/`)
}

  return (
    <div >
      <Container style={{ marginBottom: "50px", backgroundColor: "lightgreen" }}>
        <List size="big" style={{ backgroundColor: "lightgreen" }}>
          <List.Item>
            <List.Content >
              <List.Header> {students.map((s) => <h1>{s.name} {s.surname}</h1>)} </List.Header>
              {students.map((s) => (s.email))}
            </List.Content>
          </List.Item></List >

      </Container>

      <List verticalAlign='big' >


        <List.Content style={{ align:"left" }}>
          <Icon size="small" circular name='user' />
          <Link style={{ color: "black" }} to={`/myPage/${id}/Profil`} /*onClick={() => alert("boo")}*/>Profil    </Link>
        </List.Content>

        <List.Item>

          <List.Content style={{ Color: "red" }}>
            <Icon size="small" circular name='book' />
            <Link style={{ color: "black" }} to={`/myPage/${id}/MyInternshipRequest`} /*onClick={() => alert("boo")}*/>Staj Taleplerim    </Link>
          </List.Content>

        </List.Item>

        <List.Item>

          <List.Content >
            <Icon size="small" circular name='book' />
            <Link style={{ color: "black" }} to={`/myPage/${id}/AddCompany`}>Şirket Talebi</Link>


          </List.Content>

        </List.Item>

        <List.Item>

          <List.Content >
            <Icon size="small" circular name='factory' />
            <Link style={{ color: "black" }} to={`/myPage/${id}/Companies`} /*onClick={() => alert("boo")}*/>Şirketler    </Link>
          </List.Content>

        </List.Item>

        <List.Content style={{ align:"left" }}>
          <Icon size="small" circular name='user' />
          <Link style={{ color: "black" }} to={`/`} /*onClick={() => alert("boo")}*/>Profil    </Link>
        </List.Content>
      </List>


  
    </div>

  );
}
