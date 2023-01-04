import React from "react";
import Layout from "../../../../components/Layout/Layout";
import { Container } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import CustomHeading from "../../../../components/Common/CustomHeading";
import AddEditor from "../AddEditor";
import { DatePicker, Space } from "antd";
import Select from "react-select";
const { RangePicker } = DatePicker;
const Schema = yup.object().shape({
  message_type: yup.string().required(""),
  p_message: yup.string().required(""),
  p_to: yup.string().required(""),
});

const Enquiry = (props) => {
  let history = useHistory();
  const { handleSubmit, register, errors, reset } = useForm({
    resolver: yupResolver(Schema),
  });
  const options = [
    {
      label: "first",
      value: "1",
    },
    {
      label: "second",
      value: "2",
    },
    {
      label: "third",
      value: "3",
    },
  ];
  const onSubmit = (value) => {
    console.log("done");
  };
  return (
    <Layout cmsDashboard="cmsDashboard">
      <Container maxWidth="xl">
        <Card>
          <CardHeader>
            <Row>
              <Col md="4">
                <button
                  className="autoWidthBtn ml-2"
                  onClick={() => history.goBack()}
                >
                  Go Back
                </button>
              </Col>
              <Col md="4" align="center">
                <CustomHeading>Enquiry</CustomHeading>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      User type<span className="declined">*</span>
                    </label>
                    <select
                      className={classNames("form-control", {
                        "is-invalid": errors.p_to,
                      })}
                      name="p_to"
                      ref={register}
                      style={{ height: "33px" }}
                    >
                      <option value="">--select--</option>
                      <option value="0">From email list</option>
                      <option value="1">All clients</option>
                      <option value="2">All TL, Client, TP</option>
                      <option value="3">TL only</option>
                      <option value="4">TP only</option>
                    </select>
                    {errors.p_to && (
                      <div className="invalid-feedback">
                        {errors.p_to.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <label>Email</label>
                  <Select isMulti options={options} />
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Subject</label>
                    <input
                      type="text"
                      name="p_query"
                      className="form-control"
                      ref={register}
                    />
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="form-group">
                    <label>
                      Message<span className="declined">*</span>
                    </label>
                    <AddEditor />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="d-block">
                    Schedule date<span className="declined">*</span>
                  </label>
                  <Space direction="vertical" size={12}>
                    <DatePicker
                      renderExtraFooter={() => "extra footer"}
                      showTime
                    />
                  </Space>
                </div>

                <button type="submit" className="customBtn">
                  Submit
                </button>
              </div>
            </form>
          </CardBody>
        </Card>
      </Container>
    </Layout>
  );
};
export default Enquiry;
