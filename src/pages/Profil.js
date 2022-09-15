import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import StudentService from '../services/studentService'
import { Button, Card, Form, Grid } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"
import { db } from "./firebase-config"
export default function Profil() {
    let { id } = useParams();
    const [s, setS] = useState([])
    let studentService = new StudentService();
    const studentCollectionRef = collection(db, "students")

    useEffect(function () {
        // studentService.getById(id).then(result => setS(result.data.data[0]))


        const q = query(studentCollectionRef, where("id", "==", id))
        const getStudents = async () => {
            let data = await getDocs(q);
            setS(data.docs.map((doc) => ({ ...doc.data() })))
            console.log(data.docs.map((doc) => ({ ...doc.data() })))
            //console.log(studentCollectionRef)

        }
        //students.map((stu) => setId(stu.id))
        getStudents().then(() => console.log(s))
        const çal = async () => {
            const q = query(studentCollectionRef, where("id", "==", id))

            let data = await getDocs(q);
            setS(data.docs.map((doc) => ({ ...doc.data() })))

            values.password = data.docs.map((doc) => ({ ...doc.data() }))[0].password
            values.email = data.docs.map((doc) => ({ ...doc.data() }))[0].email
            values.name = data.docs.map((doc) => ({ ...doc.data() }))[0].name
            values.surname = data.docs.map((doc) => ({ ...doc.data() }))[0].surname
            values.department = data.docs.map((doc) => ({ ...doc.data() }))[0].department
            values.studentNo = data.docs.map((doc) => ({ ...doc.data() }))[0].studentNo
        }
        çal()

    }, [])


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
            department: "",//Güncellemek için içine değer yaz
            email: "",
            name: "",
            password: "",
            studentId: "0",
            studentNo: "",
            surname: "",
        },
        validationSchema: Yup.object({
            department: Yup.string().required("bölüm giriniz"),
            email: Yup.string().email("email olacak").required("email giriniz"),
            name: Yup.string().required("İsim giriniz"),
            password: Yup.string().required("Şifre giriniz"),
            studentNo: Yup.string().required("Numaranızı giriniz"),
            surname: Yup.string().required("Soyadınızı giriniz"),
        }),
        onSubmit: (values) => {
            //values.studentId = id;
            // console.log(values);
            //studentService.updateStudent(values).then(result => console.log(result))
            //alert("Bilgileriniz güncellendi")

            const güncelle = async () => {

                const q = query(studentCollectionRef, where("id", "==", id))
                let data = await getDocs(q);
                setS(data.docs.map((doc) => ({ ...doc.data() })))
                const stuDoc = doc(db, "students", id)
                await updateDoc(stuDoc, { name: values.name, surname: values.surname,department:values.department,password:values.password,email:values.email,studentNo:values.studentNo })
                alert("Bilgiler güncellendi")
            }
            if (values.name == "" || values.surname == "" || values.password == "" || values.studentNo == "" || values.department == "" || values.email == "") {
                alert("Alanları Boş bırakmayınız")
                console.log("boş")

            } else {
                güncelle()

            }
            
        },
    });

    return (

        <div className="form" align="center" style={{ marginTop: "80px" }}>
            <Card   >
                <Card.Content header="BİLGİLERİM"></Card.Content>
                <Card.Content>
                    <Form onSubmit={handleSubmit} size="small">


                        <Form.Group widths="equal">
                            <Form.Input
                                id="name"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}

                                error={
                                    errors.name && touched.name && errors.name}
                                label="İsim"
                                placaholder="İsim giriniz"
                            ></Form.Input>
                        </Form.Group>

                        <Form.Group widths="equal">

                            <Form.Input
                                id="surname"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.surname}
                                label="Soyisim"
                                placaholder="Soyisim giriniz"
                                error={
                                    errors.surname && touched.surname && errors.surname
                                }
                            ></Form.Input>
                        </Form.Group>
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
                        </Form.Group><Form.Group widths="equal">
                            <Form.Input
                                id="department"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.department}

                                label="Bölüm"
                                placaholder="Bölüm giriniz"
                            ></Form.Input>
                        </Form.Group>

                        <Form.Group widths="equal">
                            <Form.Input
                                id="password"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}

                                label="Şifre"
                            //placaholder="Şifre girinizz"
                            ></Form.Input>
                        </Form.Group>

                        <Form.Group widths="equal">
                            <Form.Input
                                id="studentNo"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.studentNo}

                                label="Okul Numara"
                                placaholder="Okul numaranızı giriniz"
                            ></Form.Input>
                        </Form.Group>

                        <Button type="submit" primary> GÜNCELLE</Button>
                    </Form>
                </Card.Content>
            </Card>

        </div>



    );
}   