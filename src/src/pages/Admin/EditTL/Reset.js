import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Select, Form, Input, Button } from "antd";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { baseUrl } from "../../../config/config";

function Reset() {
  
  const { Option } = Select;
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState(null);
  const [value, setValue] = useState({});



  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setStore2(value);
  };

  useEffect(() => {
    const getTeamLeader = () => {
      axios.get(`${baseUrl}/tl/getTeamLeader?id=243`).then((res) => {
        console.log(res);
        setValue(res.data.result[0]);    
      });
    };

    getTeamLeader();
  }, []);

  console.log("value -", value.name);
  const data1 = value.name;
  const data2 = value.email;
  const data3 = value.phone;
  const data4 = value.parent_id;
  const data5 = value.cat_name;

  useEffect(() => {
    const getSubCategory = () => {
      axios
        .get(`${baseUrl}/customers/getCategory?pid=${store2}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setTax2(res.data.result);
          }
        });
    };
    getSubCategory();
  }, [store2]);

  const onFinish = (values) => {
    console.log(values);

    // let formData = new FormData();
    // formData.append("email", value.p_email);
    // formData.append("name", value.p_name);
    // formData.append("phone", value.p_phone);
    // formData.append("pcat_id", value.p_tax);
    // formData.append("cat_id", value.p_tax2);
    // formData.append("id", id);

    // axios({
    //   method: "POST",
    //   url: `${baseUrl}/tl/updateTeamLeader`,
    //   data: formData,
    // })
    //   .then(function (response) {
    //     console.log("res-", response);
    //     if (response.data.code === 1) {
    //       alert.success("TL updated  !");
    //       history.goBack();
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("erroror - ", error);
    //   });
  };

  if (!(data1 && data2 && data3 && data4 && data5)) return <p>loading</p>;
  else
    return (
      <>
        <div class="container">
          <Form
            name="basic"
            initialValues={{
              username: `${data1}`,
              email: `${data2}`,
              phone: `${data3}`,
              category: `${data4}`,
              sub_category: `${data5}`,
            }}
            onFinish={onFinish}
          >
            <Form.Item label="Username" name="username">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="email ">
              <Input />
            </Form.Item>

            <Form.Item name="category" label="Category">
              <Select onChange={handleChange}>
                <Option value="1">Direct</Option>
                <Option value="2">InDirect</Option>
              </Select>
            </Form.Item>

            <Form.Item name="sub_category" label="Sub-category">
              <Select>
                <Option value="">--Select Sub-Category--</Option>
                {tax2.map((p, index) => (
                  <Option key={index} value={p.id}>
                    {p.details}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="phone" label="phone">
              <Input/>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

          </Form>

          {/* <Form name="nest-messages" onFinish={onFinish}>
            <Form.Item name={["query", "name"]} label=" name">
              <Input />
            </Form.Item>
            <Form.Item name={["query", "email"]} label="email ">
              <Input defaultValue={data2} />
            </Form.Item>

            <Form.Item name={["query", "phone"]} label="phone">
              <Input defaultValue={data3} />
            </Form.Item>

            <Form.Item name={["query", "pcat_1"]} label="Category">
              <Select onChange={handleChange}>
                <Option value="1">Direct</Option>
                <Option value="2">InDirect</Option>
              </Select>
            </Form.Item>

            <Form.Item name={["query", "cat_1"]} label="Sub-category">
              <Select defaultValue={data5}>
                <Option value="">--Select Sub-Category--</Option>
                {tax2.map((p, index) => (
                  <Option key={index} value={p.id}>
                    {p.details}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form> */}
        </div>
      </>
    );
}

export default Reset;

// <Option value="3">Assessment</Option>
// <Option value="4">others</Option>

// import React from "react";
// import ReactDOM from "react-dom";
// import Select from "react-select";
// import { useForm, Controller } from "react-hook-form";
// import { Checkbox, Input } from "@material-ui/core";
// import { Input as AntdInput } from "antd";

// import "./styles.css";

// const App = () => {
//   const { control, handleSubmit } = useForm();

//   const onSubmit = data => {
//     alert(JSON.stringify(data));
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>

//       <label>Ice Cream Preference</label>
//       <Controller
//         name="iceCreamType"
//         as={Select}
//         options={[
//           { value: "chocolate", label: "Chocolate" },
//           { value: "strawberry", label: "Strawberry" },
//           { value: "vanilla", label: "Vanilla" }
//         ]}
//         control={control}
//         defaultValue={[{ value: "vanilla", label: "Vanilla" }]}
//       />

//       <input type="submit" />
//     </form>
//   );
// };

// const rootElement = document.getElementById("root");

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   rootElement
// );
