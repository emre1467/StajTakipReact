import axios from "axios"

export default class StudentService {
 getStudents(){
     return axios.get("http://localhost:8080/api/students/getall")
 }
 addStudent(values){
    return axios.post("http://localhost:8080/api/students/add",values)
 }
 getStudentsByEmailandPassword(email ,password){
    return axios.get("http://localhost:8080/api/students/getByEmailandPassword?email="+email+"&password="+password)
 }
 getById(id){
   return axios.get("http://localhost:8080/api/students/getById?id="+id)
 }
 updateStudent(values){
   return axios.put("http://localhost:8080/api/students/Update",values)
 }
}