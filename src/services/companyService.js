import axios from "axios"

export default class CompanyService {

    getCompanies(){
        return axios.get("http://localhost:8080/api/companies/getall")
    }
    getById(id){
        return axios.get("http://localhost:8080/api/companies/getById?id="+id)
    }
    addCompany(values){
        return axios.post("http://localhost:8080/api/companies/add",values)
    }
    getByConfirmCompanies(confirm){
        return axios.get("http://localhost:8080/api/companies/getByConfirm?confirm="+confirm)
    }
    
    updateConfirm(id,confirm){
        return axios.put("http://localhost:8080/api/companies/Update?confirm="+confirm+"&id="+id)
    }
}