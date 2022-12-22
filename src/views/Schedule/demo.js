import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
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
import { useHistory } from "react-router-dom";
import * as Cookies from "js-cookie";

function Demo() {
  const userId = window.localStorage.getItem("userid");
  const history = useHistory();
  var date = new Date();
  const [data, setData] = useState([]);
  const [currentDate] = useState(convert(date));
  const [assignmentdata, setAssignmentData] = useState([]);
  const [baseMode] = useState("avc");
  const [transcode] = useState("interop");
  const [attendeeMode] = useState("video");
  const [videoProfile] = useState("240p_4");
  const token = window.localStorage.getItem("clientToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  useEffect(() => {
    getData();
    getAssignmentNo();
  }, []);

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const getData = () => {
    axios
      .get(
        `${baseUrl}/customers/videoScheduler?customer_id=${JSON.parse(userId)}`,
        myConfig
      )
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
    assign_no: appointment.assign_no,
    owner: appointment.owner,
    username: appointment.username,
  });

  const getAssignmentNo = () => {
    axios
      .get(
        `${baseUrl}/customers/getAllQuery?uid=${JSON.parse(userId)}`,
        myConfig
      )
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

  const resources = [
    {
      fieldName: "question_id",
      title: "Query No",
      instances: assignmentdata,
    },
  ];

  const commitChanges = ({ added, changed, deleted }) => {};

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
        <i
          class="fa fa-video-camera"
          onClick={() => handleJoin(data)}
          style={{ fontSize: "18px", padding: "5px", color: "#fff" }}
        ></i>
        <div>{children}</div>
        <div></div>
      </div>
    </Appointments.Appointment>
  );

  const Appointment = withStyles(styles, { name: "Appointment" })(
    AppointmentBase
  );

  const myAppointment = (props) => {
    return <Appointment {...props} />;
  };

  const handleJoin = (data) => {
    // console.log("data", data);
    //  console.log("data", data)
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
    //   console.log("dt", dt)
    //   console.log(dt2.getDate())
    //  console.log(dt.getMinutes())
    //  console.log(dt2.getMinutes() + 20)
    //  console.log("ck", ck)
    //   console.log("dt2", dt2)
    //   console.log("pp", pp)
    //   console.log("mm", mm)
    //   console.log("dd", dd)
    //   console.log("ss", ss)
    //   console.log("rr", rr)
    //   console.log(ck == pp)
    //   console.log(ee === eee)
    //   console.log(ss == rr)
    //   console.log(mm > dd)

    //if(ck == pp && ss == rr && ee == eee){

    // if(mm > dd){
    //   console.log("passed")

    //   Cookies.set("channel", data.question_id);
    //   Cookies.set("baseMode", baseMode);
    //   Cookies.set("transcode", transcode);
    //   Cookies.set("attendeeMode", attendeeMode);
    //   Cookies.set("videoProfile", videoProfile);
    //   history.push("/customer/meeting");

    // }
    // else{
    // // return false
    // Cookies.set("channel", data.question_id);
    // Cookies.set("baseMode", baseMode);
    // Cookies.set("transcode", transcode);
    // Cookies.set("attendeeMode", attendeeMode);
    // Cookies.set("videoProfile", videoProfile);
    // history.push("/customer/meeting");
    // }
    // }
    Cookies.set("channel", data.question_id);
    Cookies.set("baseMode", baseMode);
    Cookies.set("transcode", transcode);
    Cookies.set("attendeeMode", attendeeMode);
    Cookies.set("videoProfile", videoProfile);
    history.push(`/customer/meeting/${data.id}`);
  };

  const messages = {
    moreInformationLabel: "",
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
        <AppointmentForm.Label text="All participants" type="title" />
        <AppointmentForm.TextEditor value={appointmentData.username} readOnly />
      </AppointmentForm.BasicLayout>
    );
  };

  return (
    <Paper>
      <Scheduler data={data} height={550}>
        <ViewState
          defaultCurrentDate={currentDate}
          defaultCurrentViewName="Week"
        />
        <EditingState onCommitChanges={commitChanges} />
        <EditRecurrenceMenu />
        <DayView cellDuration={60} startDayHour={0} endDayHour={24} />
        <WeekView cellDuration={60} startDayHour={0} endDayHour={24} />
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

        <Resources data={resources} mainResourceName="username" />
      </Scheduler>
    </Paper>
  );
}

export default Demo;
