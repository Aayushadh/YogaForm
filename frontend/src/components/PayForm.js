import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Card, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import ReactLoading from "react-loading";
import { useParams } from "react-router";

const PayForm = () => {

  const params = useParams();
  let demail = params.email;
  let dbatch = params.batch;

  const [email, setEmail] = useState(demail);
  const [batch, setBatch] = useState(dbatch);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [obj, setObj] = useState({});

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = new Date().getMonth();

  useEffect(() => {
    const submitData = async () => {
      try {
        const data = await axios.put("/api/students/", obj);
        setSuccess("Payment Done Successfully !!");
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
    setObj({ email, batch, month });
    e.preventDefault();
  };
  return (
    <div style={{ width: "50%",position:"absolute",top:"25%",left:"25%",textAlign:"center"}}>
      <Card>
          <Card.Header>Monthly Fees Form</Card.Header>
        <Card.Body>
          {success !== "" && <Alert variant="success">{success}</Alert>}
          {error !== "" && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={demail}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridBatch">
                <Form.Label>Batch</Form.Label>
                <Form.Select
                  value={dbatch}
                  onChange={(e) => setBatch(e.target.value)}
                >
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="formGridFees">
                <Form.Label>Fees</Form.Label>
                <Form.Control type="text" placeholder="500 RS" readOnly />
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="formGridMonth">
                <Form.Label>Month</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={months[month]}
                  readOnly
                />
              </Form.Group>
            </Row>

            <Form.Group controlId="formGridAC">
              <Form.Label>Account No.</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Account No."
                required
              />
            </Form.Group>

            <br />
            <br />
            {!success && (
                <div style={{textAlign:"center"}}>
              <Button variant="primary" type="submit" >
                {!loading ? (
                  "Pay"
                ) : (
                  <div style={{ align: "center" }}>
                    <Spinner animation="border" />
                  </div>
                )}
              </Button>
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PayForm;
