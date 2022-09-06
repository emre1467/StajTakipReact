import axios from "axios"

export default class  InternshipRequestService{
 getInternshipRequest(){
     return axios.get("http://localhost:8080/api/ınternShipRequest/getall")
 }
getInternshipRequestByStudentId(id){
    return axios.get("http://localhost:8080/api/ınternShipRequest/getByStudentId?studentId="+id)
}
getInternshipRequestById(id){
    return axios.get("http://localhost:8080/api/ınternShipRequest/getById?id="+id)
}
addInternshipRequest(values){
    return axios.post("http://localhost:8080/api/ınternShipRequest/add",values)
 }
 getConfirmInternshipRequest(confirm){
    return axios.get("http://localhost:8080/api/ınternShipRequest/getByConfirm?confirm="+confirm)
 }
 updateConfirm(id,confirm){
    return axios.put("http://localhost:8080/api/ınternShipRequest/Update?confirm="+confirm+"&id="+id)
 }
}