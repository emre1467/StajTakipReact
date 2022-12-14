import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button, Card, Form, Grid, Icon, Image } from 'semantic-ui-react';
import * as Yup from "yup";
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"


export default function Login() {

    const studentCollectionRef = collection(db, "students")
    const [students, setStudents] = useState([])
    const [id, setId] = useState()
const history=useHistory()

    useEffect(() => {
        window.localStorage.clear()
        sessionStorage.clear()
        localStorage.clear()
        sessionStorage.clear()
        window.history.replaceState(null, null, "/");

        //localStorage.clear()
        //history.index=0;
        //history.go(-(history.length - 1))
    
      history.replace("/");
      //history.replace("/", "urlhistory");
    }, [])

    const [e, setE] = useState()
    const {
        values,
        errors,
        touched,
        handleSubmit,
        handlereset,
        handleChange,
        handleBlur,
        dirty,

    } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("mail olarak girin").required("email giriniz"),
            password: Yup.string().required("email giriniz"),
        }),

        onSubmit: (values) => {
            /*
                        studentService.getStudentsByEmailandPassword(values.email, values.password)
                            .then(result => (setE(result)
                            ))
                        if (e.data.success == true) {
                            console.log(e.data.success)
                            window.location.assign(`http://localhost:3000/myPage/${e.data.data[0].studentId}/profil`)
            
                        }
                        else if (e.data.success == false) {
                            console.log(e.data.success)
                            alert("Yanl???? kullan??c?? ad?? veya ??ifre")
            
                        }*/

            const q = query(studentCollectionRef, where("email", "==", values.email), where("password", "==", values.password))
            const getStudents = async () => {
                let data = await getDocs(q);
                setStudents(data.docs.map((doc) => ({ ...doc.data() })))
                if (data.docs.map((doc) => ({ ...doc.data() })).length == 0) {
                    alert("Hatal?? giri??!")
                }
                else {
                    window.location.assign(`/myPage/${data.docs.map((doc) => ({ ...doc.data() }))[0].id}/profil`)

                }
                //console.log(studentCollectionRef)
                console.log(students)


            }
            //students.map((stu) => setId(stu.id))
            getStudents()




        },

    });
    function kontrol() {
        if (students.length == 0) {
            console.log("bo??")
            alert("hatal?? giri?? ")
        }
        else {
            window.location.assign(`http://localhost:3000/myPage/${students[0].id}/profil`)

        }
    }
    let img = 'Images/resim.jpg'
    document.body.style.backgroundImage = "url('https:/dijital.ninja/wp-content/uploads/2021/01/purple-background-1920x1080_c.jpg')";
    return (


        <div align="center" style={{ marginTop: '150px', fontFamily: 'Josefin Sans' }}>
            <Card widths="equal" image='/resim.png' style={{ borderRadius: "15px 15px 15px 15px" }} >

                <Card.Content header="Giri?? Yap">

                    <Image
                        floated='left'
                        size='tiny'
                        src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Aibu.jpg"
                    />
                    <Card.Header style={{ color: "#00ADB5", marginTop: "8px", marginRight: "45px" }}><h1 style={{ fontFamily: 'Josefin Sans' }}>BAIBU</h1><h5 style={{ marginLeft: "45px", marginTop: "-15px", fontFamily: 'Josefin Sans' }}>Staj Takip Y??netim Sistemi</h5></Card.Header>
                </Card.Content>

                <Card.Content >
                    <Form onSubmit={handleSubmit} >
                        <Form.Group widths="equal">
                            <Form.Input
                                id="email"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                error={
                                    errors.email && touched.email}
                                label="Email"
                                placaholder="Email giriniz"
                            ></Form.Input>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input
                                id="password"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                error={
                                    errors.password && touched.password}
                                label="??ifre"
                                placaholder="??ifre giriniz"
                            ></Form.Input>
                        </Form.Group>
                        <Button.Group style={{ marginTop: "30px" }}>
                            <Button /*handlereset={handlereset} */ color='green' disabled={!dirty} type="submitt" >Giri?? Yap </Button>

                            <Button.Or />
                            <Button basic color='blue   '  ><Link color='green' to={`/addStudent`} >Kay??t Ol</Link></Button>

                        </Button.Group>
                        <Button style={{ marginTop: "10px" }} floated='right' size='mini'><Link to={`/adminLogin`}>Y??netici </Link></Button>
                    </Form>
                </Card.Content>
            </Card>
        </div>


    )
}
