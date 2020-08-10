import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';

class CommentForm from Component{
  constructor(props){
    super(props);
    this.state={
      isModalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render(){
    return(
      <div className="col-12 col-md-9">
          <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <Row className="form-group">
              <Label htmlFor="name" md={2}>Name</Label>
              <Col md={10}>
                  <Control.text model=".name" type="text" id="name" name="name"
                      placeholder="Name"
                      className="form-control"
                      validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 3 length',
                      maxLength: 'Must be less than 15 length'
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{size: 6, offset: 2}}>
                  <div className="form-check">
                      <Label check>
                      <Control.select model=".contactType" type="select" name="contactType"
                              className="form-control">
                          <option>Tel.</option>
                          <option>Email</option>
                      </Control.select>
                      </Label>
                  </div>
                </Col>
              </Row>
              <Row className="form-group">
                  <Label htmlFor="message" md={2}>Your Feedback</Label>
                  <Col md={10}>
                      <Control.text model=".message" type="textarea" id="message" name="message"
                          className="form-control"
                          rows="6"
                          ></Control.text>
                  </Col>
              </Row>
              <Row className="form-group">
                  <Col md={{size: 10, offset: 2}}>
                      <Button type="submit" color="primary">
                          Send Feedback
                      </Button>
                  </Col>
              </Row>
          </LocalForm>
      </div>
    );
  }

}
