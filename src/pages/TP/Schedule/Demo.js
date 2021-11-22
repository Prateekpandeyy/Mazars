import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { baseUrl } from "../../../config/config";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Resources,
  MonthView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  DragDropProvider,
  WeekView,
  DayView,
  DateNavigator,
  ViewSwitcher,
  TodayButton,
  Toolbar,
} from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles } from "@material-ui/core/styles";
import * as Cookies from "js-cookie";
import Swal from "sweetalert2";
import Alerts from "../../../common/Alerts";
import Loader from "../../../components/Loader/Loader";



function Demo() {
  const userId = window.localStorage.getItem("tpkey");
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [assignmentdata, setAssignmentData] = useState([]);
  const [owner, setOwner] = useState([]);
  const [read, setRead] = useState(false);

  const [baseMode, SetbaseMode] = useState("avc");
  const [transcode, SetTranscode] = useState("interop");
  const [attendeeMode, SetAttendeeMode] = useState("video");
  const [videoProfile, SetVideoProfile] = useState("480p_4");
  var date = new Date();

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  const [currentDate, setCurrentDate] = useState(convert(date));

  useEffect(() => {
    getData();
    getAssignmentNo();
    getUsers();
  }, []);

  const getData = () => {
    axios
      .get(`${baseUrl}/tl/videoScheduler?tl_id=${JSON.parse(userId)}`)
      .then((res) => {

        var a = res.data.result.items;
        if (a) {
          setData(a.map(mapAppointmentData));
        }
      });
  };

  const mapAppointmentData = (appointment) => ({
    id: appointment.id,
    startDate: appointment.start,
    endDate: appointment.end,
    title: appointment.title,
    notes: appointment.summary,
    question_id: appointment.question_id,
    vstart: appointment.vstart,
    vend: appointment.vend,
    user: appointment.user.split(','),
    owner: appointment.owner,
    username: appointment.username,
  });

  const getAssignmentNo = () => {
    axios
      .get(`${baseUrl}/admin/getAllQuery?tp_id=${JSON.parse(userId)}`)
      .then((res) => {
      
        if (res.data.code === 1) {
          var data = res.data.result;

          const newArrayOfObj = data.map(({ assign_no: text, ...rest }) => ({
            text,
            ...rest,
          }));
          
          setAssignmentData(newArrayOfObj);
        }
      });
  };

  const getUsers = () => {
    axios.get(`${baseUrl}/tl/allAttendees?uid=${JSON.parse(userId)}`).then((res) => {
  
      if (res.data.code === 1) {
        var data = res.data.result;
        const newOwners = data.map(({ name: text, ...rest }) => ({
          text,
          ...rest,
        }));
      
        setOwner(newOwners);
      }
    });
  };

  const resources = [
    {
      fieldName: "question_id",
      title: "Query No",
      instances: assignmentdata,
    },
    {
      fieldName: "user",
      title: "Users",
      instances: owner,
      allowMultiple: true,
    },
  ];

  const styles = (theme) => ({
    button: {
      color: theme.palette.background.default,
      padding: 0,
    },
    text: {
      paddingTop: theme.spacing(1),
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  });


  const B = (key) => {
    setRead(!key)
  }

  const AppointmentBase = ({
    children,
    data,
    onClick,
    classes,
    onAppointmentMetaChange,
    ...restProps
  }) => (
    <div onDoubleClick={() => B(data.owner)}>
      <Appointments.Appointment {...restProps}>
        <div style={{ display: "flex" }}>
        <i
         onClick={() => handleJoin(data)}
            class="fa fa-video-camera"
            style={{ fontSize: "18px", padding: "5px" , color: "#fff" }}
          ></i>
          <div>{children}</div>
          
         
        </div>
      </Appointments.Appointment>
    </div>
  );

  

  const Appointment = withStyles(styles, { name: "Appointment" })(
    AppointmentBase
  );

  const myAppointment = (props) => {
    return (
      <Appointment
        {...props}
      // onAppointmentMetaChange={onAppointmentMetaChange}
      />
    );
  };


  //handleJoin
  const handleJoin = (data) => {
//     // console.log("data", data);
// //  console.log("data", data)
// // console.log(data.startDate)
// var dt = new Date(data.startDate)
// var dt2 = new Date()
// let ck = dt.getMonth();

// let pp = dt2.getMonth();
// let rr = dt2.getHours();
// let ss = dt.getHours()
// let mm = dt2.getMinutes() + 20
// let dd = dt.getMinutes()
// let ee = dt.getDate();
// let eee = dt2.getDate()
// //   console.log("dt", dt)
// //   console.log(dt2.getDate())
// //  console.log(dt.getMinutes())
// //  console.log(dt2.getMinutes() + 20)
// //  console.log("ck", ck)
// //   console.log("dt2", dt2)
// //   console.log("pp", pp)
// //   console.log("mm", mm)
// //   console.log("dd", dd)
// //   console.log("ss", ss)
// //   console.log("rr", rr)
// //   console.log(ck == pp)
// //   console.log(ee === eee)
// //   console.log(ss == rr)
// //   console.log(mm > dd)


// if(ck == pp && ss == rr && ee == eee){


// if(mm > dd){
//   console.log("passed")
  
//   Cookies.set("channel_2", data.question_id);
//   Cookies.set("baseMode_2", baseMode);
//   Cookies.set("transcode_2", transcode);
//   Cookies.set("attendeeMode_2", attendeeMode);
//   Cookies.set("videoProfile_2", videoProfile);
//   // history.push("/teamleader/meeting/");
//   history.push(`/taxprofessional/meeting/${data.id}`);

// }
// else{
// // return false
 
// Cookies.set("channel_2", data.question_id);
// Cookies.set("baseMode_2", baseMode);
// Cookies.set("transcode_2", transcode);
// Cookies.set("attendeeMode_2", attendeeMode);
// Cookies.set("videoProfile_2", videoProfile);
// // history.push("/teamleader/meeting/");
// history.push(`/taxprofessional/meeting/${data.id}`);

// }
// }

Cookies.set("channel_2", data.question_id);
  Cookies.set("baseMode_2", baseMode);
  Cookies.set("transcode_2", transcode);
  Cookies.set("attendeeMode_2", attendeeMode);
  Cookies.set("videoProfile_2", videoProfile);
  // history.push("/teamleader/meeting/");
  history.push(`/taxprofessional/meeting/${data.id}`);
  };

  const changeFormat = (d) => {
    

    if (typeof d === 'object') {

      return (
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.toString().split(" ")[4]
      );
    } else {
   
      return d;
    }
  };

  const commitChanges = ({ added, changed, deleted }) => {

    if (added) {
      setLoading(true)


      var startDate = added.startDate;
      var endDate = added.endDate;

      let formData = new FormData();
      formData.append("customer_id", JSON.parse(userId));
      formData.append("question_id", added.question_id);
      formData.append("time", changeFormat(startDate));
      formData.append("endtime", changeFormat(endDate));
      formData.append("title", added.title);
      formData.append("notes", added.notes);
      formData.append("user", added.user);

      axios({
        method: "POST",
        url: `${baseUrl}/tl/PostCallSchedule`,
        data: formData,
      })
        .then(function (response) {

          if (response.data.code === 1) {
            setLoading(false)
            Alerts.SuccessNormal("New call scheduled successfully.")
          } else if (response.data.code === 0) {
            setLoading(false)
            var msg = response.data.result
            Alerts.ErrorNormal(msg)
          }

          getData();
        })
        .catch((error) => {
      
        });
    }
    if (changed) {
    
      setLoading(true)
      const data2 = data.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
    
      let valuesArray = Object.entries(changed);
      let id = valuesArray[0][0];
    
      let dataIttem;

      for (var i = 0; i < data2.length; i++) {
        if (data2[i].id === id) {
          dataIttem = data2[i];
        }
      }
    

      var a = dataIttem.startDate
      var b = dataIttem.endDate


      if (!dataIttem.owner) {
        var variable = "Error"
        Alerts.ErrorEdit(variable)
        return false;
      }
      let formData = new FormData();
      formData.append("customer_id", JSON.parse(userId));
      formData.append("question_id", dataIttem.question_id);
      formData.append("id", dataIttem.id);
      formData.append("time", changeFormat(a));
      formData.append("endtime", changeFormat(b));
      formData.append("title", dataIttem.title);
      formData.append("notes", dataIttem.notes);
      formData.append("user", dataIttem.user);

      axios({
        method: "POST",
        url: `${baseUrl}/tl/PostCallSchedule`,
        data: formData,
      })
        .then(function (response) {
       

          if (response.data.code === 1) {
            setLoading(false)
            var msg = "Call details updated successfully."
            Alerts.SuccessNormal(msg)
          }
          else if (response.data.code === 0) {
            setLoading(false)

            var msg = response.data.result
            Alerts.ErrorNormal(msg)
          }
          getData();
        })
        .catch((error) => {
        
        });
    }

    if (deleted !== undefined) {
   
      setLoading(true)
      var value;
      data.filter((data) => {
        if (data.id == deleted) {
        
          value = data.owner
        }
      });

   
      if (!value) {
        var variable = "Error"
        Alerts.ErrorDelete(variable)
        return false;
      }

      Swal.fire({
        title: "Are you sure?",
        text: "It will be permanently deleted !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          axios.get(`${baseUrl}/tl/freeslot?id=${deleted}`).then((res) => {
        
            if (res.data.code === 1) {
              setLoading(false)
              Swal.fire("Deleted!", "Scheduled call has been deleted.", "success");
              getData();
            } else {
              setLoading(false)
              Swal.fire("Oops...", "Errorr ", "error");
            }
          });
        }
      });
    }
  };


  const BooleanEditor = (props) => {
    if (props.label === "All Day" || props.label === "Repeat") {
      return null;
    }
    return <AppointmentForm.BooleanEditor {...props} />;
  };

  const TextEditor = (props) => {
    return <AppointmentForm.TextEditor {...props} />;
  };

  //basic layout
  const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
   
    return (
      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}
      >

        <AppointmentForm.Label text="All Participants" type="title" />
        <AppointmentForm.TextEditor
          value={appointmentData.username}
          readOnly
        />

      </AppointmentForm.BasicLayout>
    );
  };


  return (
    <>
      {
        loading ?
          <Loader />
          :
          <>
            <Paper>
              <Scheduler data={data} height={570}>
                <ViewState
                  defaultCurrentDate={currentDate}
                  defaultCurrentViewName="Week"
                />
                <EditingState onCommitChanges={commitChanges} />
                <EditRecurrenceMenu />

                <DayView cellDuration={60} startDayHour={0} endDayHour={24} />
                <WeekView cellDuration={60} startDayHour={0} endDayHour={24}  />
                
                <Appointments appointmentComponent={myAppointment} />

                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <ViewSwitcher />

                <AppointmentTooltip showOpenButton />

                {
                  read ?
                    <AppointmentForm
                      booleanEditorComponent={BooleanEditor}
                      basicLayoutComponent={BasicLayout}
                      textEditorComponent={TextEditor}
                      readOnly
                    />
                    :
                    <AppointmentForm
                      booleanEditorComponent={BooleanEditor}
                      basicLayoutComponent={BasicLayout}
                      textEditorComponent={TextEditor}
                    />
                }

                <Resources
                  data={resources}
                />
              </Scheduler>
            </Paper>
          </>
      }
    </>
  );
}

export default Demo;