import * as React from "react";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
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


import axios from "axios";
import { baseUrl } from "../../config/config";

const userId = window.localStorage.getItem("userid");

const getData = (setData, setLoading) => {
  axios
    .get(
      `${baseUrl}/customers/videoScheduler?customer_id=${JSON.parse(userId)}`
    )
    .then((res) => {
      console.log("res -", res);
      console.log("result -", res.data.result.items);
      setData(res.data.result.items);
      setLoading(false);
    });
};

const styles = {
  toolbarRoot: {
    position: "relative",
  },
  progress: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
  },
};

const ToolbarWithLoading = withStyles(styles, { name: "Toolbar" })(
  ({ children, classes, ...restProps }) => (
    <div className={classes.toolbarRoot}>
      <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
      <LinearProgress className={classes.progress} />
    </div>
  )
);

const mapAppointmentData = (appointment) => ({
  id: appointment.id,
  startDate: appointment.start,
  endDate: appointment.end,
  title: appointment.title,
  gg: appointment.summary,
  question_id: appointment.question_id,
  summary: appointment.summary,
});

var date = new Date();
console.log("date-", convert(date));

function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

const initialState = {
  data: [],
  loading: false,
  currentDate: convert(date),
  currentViewName: "Day",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setLoading":
      return { ...state, loading: action.payload };
    case "setData":
      return { ...state, data: action.payload.map(mapAppointmentData) };
    case "setCurrentViewName":
      return { ...state, currentViewName: action.payload };
    case "setCurrentDate":
      return { ...state, currentDate: action.payload };
    default:
      return state;
  }
};

export default () => {
  const [assignmentdata, setAssignmentData] = React.useState([]);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { data, loading, currentViewName, currentDate } = state;

  const setCurrentViewName = React.useCallback(
    (nextViewName) =>
      dispatch({
        type: "setCurrentViewName",
        payload: nextViewName,
      }),
    [dispatch]
  );

  const setCurrentDate = React.useCallback(
    (nextDate) =>
      dispatch({
        type: "setCurrentDate",
        payload: nextDate,
      }),
    [dispatch]
  );

  const setData = React.useCallback(
    (nextData) =>
      dispatch({
        type: "setData",
        payload: nextData,
      }),
    [dispatch]
  );

  const setLoading = React.useCallback(
    (nextLoading) =>
      dispatch({
        type: "setLoading",
        payload: nextLoading,
      }),
    [dispatch]
  );

  const changeFormat = (d) => {
    console.log(d);
    return (
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getDate() +
      " " +
      d.toString().split(" ")[4]
    );
  };
  
  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
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
      axios({
        method: "POST",
        url: `${baseUrl}/customers/PostCallSchedule`,
        data: formData,
      })
        .then(function (response) {
          console.log("res post-", response);
          getData(setData, setLoading);
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }

    if (changed) {
      console.log("changed", changed);

      let valuesArray = Object.entries(changed);
      const obj = {
        id: "",
        title: "",
        notes: "",
        startDate: "",
        endDate: "",
        question_id: "",
      };

      for (let value of valuesArray) {
        // console.log("value", value);
        obj.id = value[0];
        obj.title = value[1].title;
        obj.notes = value[1].notes;
        obj.question_id = value[1].question_id;
        obj.startDate = value[1].startDate;
        obj.endDate = value[1].endDate;
      }

      let formData = new FormData();
      formData.append("customer_id", JSON.parse(userId));
      formData.append("question_id", obj.question_id);
      formData.append("id", obj.id);
      formData.append("time", obj.startDate);
      formData.append("endtime", obj.endDate);
      formData.append("title", obj.title);
      formData.append("notes", obj.notes);

      axios({
        method: "POST",
        url: `${baseUrl}/customers/PostCallSchedule`,
        data: formData,
      })
        .then(function (response) {
          console.log("res post-", response);
          getData(setData, setLoading);
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }

    // if (deleted !== undefined) {
    //   console.log("deleted f", deleted);
    //   axios.get(`${baseUrl}/customers/freeslot?id=${deleted}`).then((res) => {
    //     console.log("res -", res);
    //     getData(setData, setLoading);
    //   });
    // }
  };

  React.useEffect(() => {
    getData(setData, setLoading);
    getAssignmentNo();
  }, [setData, currentViewName, currentDate]);

  const getAssignmentNo = () => {
    axios
      .get(
        `${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}`
      )
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

  const resources = [
    {
      fieldName: "question_id",
      title: "Assignment No",
      instances: assignmentdata,
    },
  ];

  return (
    <Paper>
      <Scheduler data={data} height={660}>
        <ViewState
          currentDate={currentDate}
          currentViewName={currentViewName}
          onCurrentViewNameChange={setCurrentViewName}
          onCurrentDateChange={setCurrentDate}
        />
        <EditingState onCommitChanges={commitChanges} />
        <EditRecurrenceMenu />

        <IntegratedEditing />
        <DayView startDayHour={10} endDayHour={24} />
        <WeekView startDayHour={7.5} endDayHour={17.5} />
        <Appointments />
        <Toolbar
          {...(loading ? { rootComponent: ToolbarWithLoading } : null)}
        />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />

        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm />

        <Resources data={resources} />
      </Scheduler>
    </Paper>
  );
};
