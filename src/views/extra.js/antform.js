import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Select,
  Space,
  Button,
  Checkbox,
  Radio,
  Upload,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";

function Fresh() {
  const userId = window.localStorage.getItem("userid");
  const category = window.localStorage.getItem("category");
  const { Option } = Select;

  const onFinish = (values) => {
    console.log(values);
    console.log(values.query.upload.fileList);

var arr = values.query.upload.fileList
    let formData = new FormData();

    for (var i = 0; i < arr.length; i++) {
      console.log("pics", arr[i].originFileObj);

      let a =arr[i].originFileObj;
      formData.append("upload_1", a);
    }


    

    formData.append("fact", values.query.fact);
    formData.append("specific", JSON.stringify(values.query.specific));
    formData.append("case_name", values.query.case);
    formData.append("assessment_year  ", values.query.assessment_year);
    formData.append("purpose", values.query.purpose);
    formData.append("timelines", values.query.timelines);
   

    formData.append("user", JSON.parse(userId));
    formData.append("cid", JSON.parse(category));

    axios
      .post(`${baseUrl}/customers/PostQuestion`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log("res-", response);
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  const options = [
    { label: "Softcopy - Word/ Pdf", value: "Softcopy - Word/ Pdf" },
    {
      label: "SoftCopy- Digitally Signed",
      value: "SoftCopy- Digitally Signed",
    },
  ];

  const props = {
    onChange({ file, fileList }) {
      console.log("img :", file, fileList);
    },
  };

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <Form name="nest-messages" onFinish={onFinish}>
            <Form.Item name={["query", "fact"]} label="Facts of the case">
              <Input.TextArea />
            </Form.Item>

            <Form.Item name={["query", "case"]} label="Case name">
              <Input />
            </Form.Item>

            <Form.Item
              name={["query", "purpose"]}
              label="Purpose for which Opinion is sought name"
            >
              <Select placeholder="Select a person">
                <Option value="Assessment">Assessment</Option>
                <Option value="2011-12">Lucy</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name={["query", "assessment_year"]}
              label="Assessment year"
            >
              <Select mode="tags" allowClear>
                <Option value="2010-11">2010-11</Option>
                <Option value="2011-12">2011-12</Option>
                <Option value="2013-14">2013-14</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name={["query", "format"]}
              label="Format in which Opinion is required"
            >
              <Checkbox.Group
                options={options}
                // defaultValue={["Pear"]}
              />
            </Form.Item>

            <Form.Item
              name={["query", "timelines"]}
              label="Timelines within which Opinion is Required"
            >
              <Radio.Group defaultValue="Urgent, (4-5 Working Days)">
                <Radio.Button value="Urgent, (4-5 Working Days)">
                  Urgent, (4-5 Working Days)
                </Radio.Button>
                <Radio.Button value="Regular (10-12 Working Days)">
                  Regular (10-12 Working Days)
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item>Specific Questions for advisory</Form.Item>
            <Form.List name={["query", "specific"]}>
              {(fields, { add, remove }) => (
                <>
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space key={key}>
                      <Form.Item
                        {...restField}
                        name={[name, "first"]}
                        fieldKey={[fieldKey, "first"]}
                      >
                        <Input placeholder="specfic question" />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                </>
              )}
            </Form.List>

            <Form.Item name={["query", "upload"]} label="Upload file">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </CardHeader>
      </Card>
    </Layout>
  );
}

export default Fresh;
const assessment_year = [
  {
    year: "2010-11",
  },
  {
    year: "2011-12",
  },
  {
    year: "2012-13",
  },
  {
    year: "2013-14",
  },
  {
    year: "2014-15",
  },
  {
    year: "2015-16",
  },
  {
    year: "2016-17",
  },
  {
    year: "2017-18",
  },
  {
    year: "2018-19",
  },
  {
    year: "2019-20",
  },
  {
    year: "2020-21",
  },
  {
    year: "2021-22",
  },
  {
    year: "2022-23",
  },
  {
    year: "2023-24",
  },
  {
    year: "2024-25",
  },
  {
    year: "2025-26",
  },
  {
    year: "2026-27",
  },
  {
    year: "2027-28",
  },
];
