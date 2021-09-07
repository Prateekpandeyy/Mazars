import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
  Resources,
  EditRecurrenceMenu,
} from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Link, useHistory } from "react-router-dom";
import * as Cookies from "js-cookie";

function Demo() {
  const userId = window.localStorage.getItem("userid");
  const history = useHistory();
  const [data, setData] = useState([]);
  const [assignmentdata, setAssignmentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState([]);


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
  const [currentDate] = useState(convert(date));

  useEffect(() => {
    getData();
    getAssignmentNo();
    getUsers();
  }, []);


  const getData = () => {
    axios
      .get(
        `${baseUrl}/customers/videoScheduler?customer_id=${JSON.parse(userId)}`
      )
      .then((res) => {
        console.log("res -", res);
        console.log("result -", res.data.result.items);
        var a = res.data.result.items;
        if (a) {
          setData(a.map(mapAppointmentData));
          setLoading(false);
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
    assign_no: appointment.assign_no,
    owner: appointment.owner,
    username: appointment.username,
  });


  const getAssignmentNo = () => {
    axios
      .get(`${baseUrl}/customers/getAllQuery?uid=${JSON.parse(userId)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          var data = res.data.result;
          const newArrayOfObj = data.map(({ assign_no: text, ...rest }) => ({
            text,
            ...rest,
          }));
          console.log("dt--", newArrayOfObj);
          setAssignmentData(newArrayOfObj);
        }
      });
  };


  const getUsers = () => {
    axios.get(`${baseUrl}/tl/allAttendees?uid=${JSON.parse(userId)}`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        var data = res.data.result;
        const newOwners = data.map(({ name: text, ...rest }) => ({
          text,
          ...rest,
        }));
        console.log("dt--", newOwners);
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
    // {
    //   fieldName: "username",
    //   title: "Users",
    //   instances: owner,
    //   allowMultiple: true,
    // },
  ];



  const commitChanges = ({ added, changed, deleted }) => {
    console.log("added", added)
  };



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

  const AppointmentBase = ({
    children,
    data,
    onClick,
    classes,
    onAppointmentMetaChange,
    ...restProps
  }) => (
    <Appointments.Appointment {...restProps}>
      <div style={{ display: "flex" }}>
        {
          console.log("data", data)
        }
        <div>{children}</div>
        <div
          onClick={() => handleJoin(data.question_id)}
        >
          <i
            class="fa fa-video-camera"
            style={{ fontSize: "12px", color: "#fff" }}
          ></i>
        </div>
      </div>
    </Appointments.Appointment>
  );


  const Appointment = withStyles(styles, { name: "Appointment" })(
    AppointmentBase
  );



  const myAppointment = (props) => {
    return (
      <Appointment
        {...props}
      />
    );
  };

  //handleJoin
  const handleJoin = (id) => {
    console.log("id", id);
    Cookies.set("channel", id);
    Cookies.set("baseMode", baseMode);
    Cookies.set("transcode", transcode);
    Cookies.set("attendeeMode", attendeeMode);
    Cookies.set("videoProfile", videoProfile);
    history.push("/customer/meeting");
  };


  const messages = {
    moreInformationLabel: ""
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
    console.log("appointmentData", appointmentData);
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
    <Paper>
      <Scheduler data={data} height={660}>
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


        <AppointmentForm
          basicLayoutComponent={BasicLayout}
          textEditorComponent={TextEditor}
          booleanEditorComponent={BooleanEditor}
          readOnly
        />

        <Resources
          data={resources}
          mainResourceName="username"
        />

      </Scheduler>
    </Paper>
  );
}

export default Demo;



{/* <AppointmentForm.Label text="Customer Phone" type="title" /> */ }
// function TitleComponent({ title }) {
//   return (
//     <div>
//       <Link to={`/customer/queries`}>queries - {title}</Link>
//     </div>
//   );
// }

/* <Link to={`/customer/meeting`}>
          <p style={{ fontSize: "12px",color:"#fff" }}>link</p>
        </Link> */



//03-nov-1972
    // if (added) {
    //   console.log("added - ", added);
    //   var startDate = added.startDate;
    //   var endDate = added.endDate;

    //   let formData = new FormData();
    //   formData.append("customer_id", JSON.parse(userId));
    //   formData.append("question_id", added.question_id);
    //   formData.append("time", changeFormat(startDate));
    //   formData.append("endtime", changeFormat(endDate));
    //   formData.append("title", added.title);
    //   formData.append("notes", added.notes);
    //   axios({
    //     method: "POST",
    //     url: `${baseUrl}/customers/PostCallSchedule`,
    //     data: formData,
    //   })
    //     .then(function (response) {
    //       console.log("res post-", response);
    //       getData();
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       console.log("erroror - ", error);
    //     });
    // }
    // if (changed) {
    //   console.log("changed", changed);

    //   const data2 = data.map((appointment) =>
    //     changed[appointment.id]
    //       ? { ...appointment, ...changed[appointment.id] }
    //       : appointment
    //   );
    //   console.log("data2 - ", data2);

    //   let valuesArray = Object.entries(changed);
    //   let id = valuesArray[0][0];
    //   console.log("id -", id);
    //   let dataIttem;

    //   for (var i = 0; i < data2.length; i++) {
    //     if (data2[i].id === id) {
    //       dataIttem = data2[i];
    //     }
    //   }
    //   console.log("dataIttem", dataIttem);

    //   let formData = new FormData();
    //   formData.append("customer_id", JSON.parse(userId));
    //   formData.append("question_id", dataIttem.question_id);
    //   formData.append("id", dataIttem.id);
    //   formData.append("time", dataIttem.startDate);
    //   formData.append("endtime", dataIttem.endDate);
    //   formData.append("title", dataIttem.title);
    //   formData.append("notes", dataIttem.notes);

    //   axios({
    //     method: "POST",
    //     url: `${baseUrl}/customers/PostCallSchedule`,
    //     data: formData,
    //   })
    //     .then(function (response) {
    //       console.log("res post-", response);
    //       getData();
    //     })
    //     .catch((error) => {
    //       console.log("erroror - ", error);
    //     });
    // }

    // if (deleted !== undefined) {
    //   console.log("deleted f", deleted);
    //   axios.get(`${baseUrl}/customers/freeslot?id=${deleted}`).then((res) => {
    //     console.log("res -", res);
    //     getData();
    //     setLoading(false);
    //   });
    // }