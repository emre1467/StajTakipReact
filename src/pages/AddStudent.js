import React from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import StudentService from '../services/studentService'
import { Button, Card, Form, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"

const studentCollectionRef = collection(db, "students")

export default function AddStudent() {
    const createStudent = async () => {

        const docref = await addDoc(studentCollectionRef, { name: values.name, surname: values.surname, studentNo: values.studentNo, password: values.password, email: values.email, department: values.department, id: 10 })
        const stuDoc = doc(db, "students", docref.id)
        await updateDoc(stuDoc, { id: docref.id })
        alert("Öğrenci eklendi")

    }


    let studentService = new StudentService();

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
            id: "0",
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
            if (values.name == "" || values.surname == "" || values.password == "" || values.studentNo == "" || values.department == "" || values.email == "") {
                alert("Alanları Boş bırakmayınız")
                console.log("boş")

            } else {
                createStudent()

            }
        },
    });

    return (

        <div align="center" className="form" style={{ marginTop: '50px', marginLeft: '130px' }}>
            <Card    >
                <Card.Content header="KAYIT OL"></Card.Content>
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
                                error={
                                    errors.department && touched.department}
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
                                error={
                                    errors.password && touched.password}
                               
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
                                error={
                                    errors.studentNo && touched.studentNo}
                               
                                label="Okul Numara"
                                placaholder="Okul numaranızı giriniz"
                            ></Form.Input>
                        </Form.Group>
                        <a href='/' style={{ marginRight: "20px" }}>Giriş Sayfası</a>

                        <Button handlereset={handlereset} type="submit" disabled={!dirty} primary> Kayıt Ol</Button>

                    </Form>
                </Card.Content>
            </Card>

        </div>



    );
}   