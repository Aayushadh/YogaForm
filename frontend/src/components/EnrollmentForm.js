import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Card, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import ParticlesBg from "particles-bg";

const EnrollmentForm = ({match}) => {

  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [batch, setBatch] = useState("A");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [obj, setObj] = useState({});

  useEffect(() => {
    const submitData = async () => {
      try {
        const data = await axios.post("/api/students/", obj);
        setSuccess("Registration Done !! Now, Pay your fees!!");
      } catch (e) {
        setError(e.response.data.message);
      }
      setLoading(false);
    };
    if (loading) {
      submitData();
    }
  }, [loading]);

  const submitHandler = (e) => {
    setLoading(true);
    setError("");
    setSuccess("");
    setObj({ name, email, batch, dob });
    e.preventDefault();
  };

  const payHandle =()=>{

    navigate(`/pay/${email}/${batch}`)
  }

  return (

    

    <div style={{width:"50%",position:"absolute",top:"25%",left:"25%",textAlign:"center"}}>

    <Card>
      <Card.Header>Enrollment Form</Card.Header>
      <Card.Body>
      {success !== "" && <Alert variant="success">{success}</Alert>}
      {error !== "" && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={submitHandler}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              required
              onChange={(e) => setName(e.target.value)}
              />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="formGridDOB">
            <Form.Label>DOB</Form.Label>
            <Form.Control
              type="date"
              required
              onChange={(e) => setDob(e.target.value)}
              />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBatch">
            <Form.Label>Batch</Form.Label>
            <Form.Select
              defaultValue="Batch"
              onChange={(e) => setBatch(e.target.value)}
              >
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </Form.Select>
          </Form.Group>
        </Row>
        {(!success)&&
        <Button variant="primary" type="submit">
          {(!loading)?"Submit":(<div style={{align:"center"}}><Spinner animation="border" /></div>)}
        </Button>
        }
        <br/><br/>
        {success&&<Button onClick={payHandle}>Pay Fees</Button>}
      </Form>
      </Card.Body>
    </Card>
    </div>
  );
};

export default EnrollmentForm;
