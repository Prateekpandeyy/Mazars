// import React, { Component } from 'react';
// import { Form, Button, Col, Row } from 'react-bootstrap';
// import axios from "axios";
// import { baseUrl } from "../../../config/config";


// export default class Tst extends Component {
//     state = {
//         courseName: 'ghfg',
//         courseType: 'fhhhhhh',
//         courseGrade: 'gh',
//         courseHours: '',
//         coursePassGrade: ''
//     }

//     onChange(e) {
//         console.log('e.target', e.target.coursehours);

//         this.setState({
//              [e.target.name]: e.target.value });
//     }

//     onSubmit = (e) => {
//         e.preventDefault();
//         this.props.Tst(this.state);
//         this.setState({
//             courseName: '',
//             courseType: '',
//             courseGrade: ''
//         })
//     }

//     render() {
//         const courses = this.props.courses.map(course =>
//             <option 
//                 key={course.id} 
//                 value={course.courseName} 
//                 coursehours={course.courseHours} 
//                 coursepassgrade={course.coursePassGrade}  
//             >
//                 {course.courseName}
//             </option>
//         )

//         return (
//             <div>
//                 <Form onSubmit={this.onSubmit}>
//                     <Row>
//                         <Col>
//                             <Form.Group controlId="exampleForm.ControlSelect1">

//                                 <Form.Control
//                                     as="select"
//                                     name="courseName"
//                                     defaultValue={this.state.courseName}
//                                     onChange={this.onChange.bind(this)}
//                                 >
//                                 <option value="">Course...</option>
//                                     {courses}
//                                 </Form.Control>
//                             </Form.Group>
//                         </Col>
//                         <Col>
//                             <Form.Group controlId="formGridState">

//                                 <Form.Control as="select"
//                                     name="courseType"
//                                     defaultValue={this.state.courseType}
//                                     onChange={this.onChange.bind(this)}
//                                 >
//                                     <option value="">Select...</option>
//                                     <option value="true">a</option>
//                                     <option value="false">m</option>
//                                 </Form.Control>
//                             </Form.Group>
//                         </Col>
//                         <Col>
//                             <Form.Group controlId="formBasicGrade">
//                                 <Form.Control
//                                     type="number"
//                                     placeholder="Course grade"
//                                     name="courseGrade"
//                                     defaultValue={this.state.courseGrade}
//                                     onChange={this.onChange.bind(this)}
//                                 />
//                             </Form.Group>

//                             <Form.Group controlId="courseHours">
//                                 <Form.Control
//                                     type="hidden"
//                                     name="courseHours"
//                                     defaultValue={this.props.courseHours}

//                                 />
//                             </Form.Group>
//                         </Col>
//                         <Col>
//                             <Form.Group controlId="submit">
//                                 <Button variant="primary" type="submit">
//                                     Submit
//                         </Button>
//                             </Form.Group>
//                         </Col>
//                     </Row>
//                 </Form>
//             </div>
//         )
//     }
// }

 