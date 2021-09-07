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
        console.log("res -", res);
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
          {
            console.log("data", data)
          }
          <div>{children}</div>
          
          <div
            onClick={() => handleJoin(data)}
          ><i
            class="fa fa-video-camera"
            style={{ fontSize: "12px", color: "#fff" }}
          ></i>
          </div>
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
    // console.log("data", data);

    Cookies.set("channel_2", data.question_id);
    Cookies.set("baseMode_2", baseMode);
    Cookies.set("transcode_2", transcode);
    Cookies.set("attendeeMode_2", attendeeMode);
    Cookies.set("videoProfile_2", videoProfile);
    // history.push("/teamleader/meeting/");
    history.push(`/taxprofessional/meeting/${data.id}`);

  };

  const changeFormat = (d) => {
    console.log("d ---", d);

    if (typeof d === 'object') {
      console.log("GMT");
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
      console.log("d");
      return d;
    }
  };

  const commitChanges = ({ added, changed, deleted }) => {

    if (added) {
      setLoading(true)
      console.log("added - ", added);

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
          console.log("res post-", response);
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
          console.log("erroror - ", error);
        });
    }
    if (changed) {
      console.log("changed", changed);
      setLoading(true)
      const data2 = data.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
      console.log("data2 - ", data2);

      let valuesArray = Object.entries(changed);
      let id = valuesArray[0][0];
      console.log("id -", id);
      let dataIttem;

      for (var i = 0; i < data2.length; i++) {
        if (data2[i].id === id) {
          dataIttem = data2[i];
        }
      }
      console.log("owner", dataIttem.owner);

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
          console.log("res post-", response);

          if (response.data.code === 1) {
            setLoading(false)
            var msg = "Call details updated successfully."
            Alerts.SuccessNormal(msg)
          }
          else if (response.data.code === 0) {
            setLoading(false)
            console.log("call 0 code")
            var msg = response.data.result
            Alerts.ErrorNormal(msg)
          }
          getData();
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }

    if (deleted !== undefined) {
      console.log("deleted f", deleted);
      setLoading(true)
      var value;
      data.filter((data) => {
        if (data.id == deleted) {
          console.log("owner", data.owner);
          value = data.owner
        }
      });

      // console.log("value", value);
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
            console.log("res -", res);
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
    <>
      {
        loading ?
          <Loader />
          :
          <>
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