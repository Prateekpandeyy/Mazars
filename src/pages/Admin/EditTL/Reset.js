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
  
    setStore2(value);
  };

  useEffect(() => {
    const getTeamLeader = () => {
      axios.get(`${baseUrl}/tl/getTeamLeader?id=243`).then((res) => {
      
        setValue(res.data.result[0]);    
      });
    };

    getTeamLeader();
  }, []);

 
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
         
          if (res.data.code === 1) {
            setTax2(res.data.result);
          }
        });
    };
    getSubCategory();
  }, [store2]);

  const onFinish = (values) => {
   

  
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

         
        </div>
      </>
    );
}

export default Reset;

