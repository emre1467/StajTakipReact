import axios from "axios"

export default class AdminService{
    getAdminsByEmailandPassword(email,password){
        return axios.get("http://localhost:8080/api/admins/getByEmailandPassword?email="+email+"&password="+password)
    }
    getById(id){
        return axios.get("http://localhost:8080/api/admins/getById?id="+id)
    }
}