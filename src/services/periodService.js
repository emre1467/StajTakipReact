import axios from "axios"

export default class PeriodService{
    getPeriods(){
        return axios.get("http://localhost:8080/api/periods/getall")
    }
}