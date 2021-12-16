import React , {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import axios from 'axios';
import { baseUrl, baseUrl3 } from '../../../config/config';
const ConsaltSearch = ({setData}) => {
    const [data2, setData2] = useState([]);
    const [teamleader44, setTeamleader44] = useState("")
    const [date, setDate] = useState({
        fromDate : "",
        toDate : ""
    })
    const userid = window.localStorage.getItem("adminkey")
    var pp = []
    const today = new Date().getFullYear() + "-" + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
    const { handleSubmit, register, errors, reset } = useForm()
 
  const getTeamLeader = () => {
    axios.get(`${baseUrl}/tl/getTeamLeader`).then((res) => {
    
      var dd = []
      if (res.data.code === 1) {
          console.log("res", res.data.result)
        pp.push(res.data.result)
        setData2((res.data.result));
       
      }
    });
  };
  useEffect(() => {
      getTeamLeader()
  }, [])
    const options3 = data2.map(d => (
        {
          "value": d.post_name,
          "label": d.name
        }))
        const teamLeader = (a) => {
            let tk = []
               a.map((i) => {
               
              
                tk.push(i.value)
               })
               setTeamleader44(tk)
             
             }
    const onSubmit = (value) => {
       let formData = new FormData();
       formData.append("to_date", value.to_date);
       formData.append("form_date", value.from_date);
       formData.append("tl_post", teamleader44)
       formData.append("uid", userid);
       axios({
           method : "POST",
           url : `${baseUrl}/report/paymentReport`,
           data : formData
       })
       .then((res) => {
           console.log("res", res)
           if(res.data.code === 1){
               setData(res.data.result)
           }
       })
    }
    const downloadReport = () => {
        let formData = new FormData();
        formData.append("to_date", date.toDate);
        formData.append("form_date", date.fromDate);
        formData.append("tl_post", teamleader44 )
        formData.append("uid", userid);
        axios({
            method : "POST",
            url : `${baseUrl}/report/downloadpaymentReport`,
            data : formData
        })
        .then(function (response) {
            window.open(`${baseUrl3}/${response.data.result}`)
          // window.location.assign(`${baseUrl}/report/generateReport`)
          })
    }
    const fromDate = (e) => {
        setDate({
            fromDate : e.target.value
        })
    }
    const toDate = (e) => {
        setDate({
            toDate  : e.target.value
        })
    }
    const refrehData = () => {
     
     axios.get(`${baseUrl}/tl/mobilpayTodayCall`)
     .then((res) => {
         if(res.data.code === 1) {
             setData(res.data.result)
         }
     })   
    }
    return (
      <form onSubmit = {handleSubmit(onSubmit)}>
         <div className="row">
             <div className="col-md-4">
                 <label>From Date </label>
             <input
          type="date"
          name="from_date" 
          ref = {register}
          onChange= {(e) => toDate(e)}
          defaultValue={today}
          className="form-control"/>
                 </div>
                 <div className="col-md-4">
                     <label>To Date </label>
             <input
          type="date"
          ref = {register}
          onChange= {(e) => fromDate(e)}
          defaultValue={today}
          name="to_date"
          className="form-control" />
                 </div>
                 <div className="col-md-4" style={{zIndex : "10000"}}>
<label className="form-label">Teamleader</label>
<Select  isMulti={true}
options={options3}

onChange= {(e) =>teamLeader(e)}/>
</div>
               
         </div>
         <div className="row">
           <div className="col-md-6">
           <button className="btn btn-primary">Search</button>
             <button type="button" onClick={() => downloadReport()} className="btn btn-success mx-2">Download</button>
             <button type="button" onClick={() => refrehData()} className="btn btn-secondary mx-2">latest pull data</button>
             </div>
         </div>
      </form>
    )
}
export default ConsaltSearch;