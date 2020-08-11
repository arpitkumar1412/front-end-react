import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Col, Row, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
  function RenderDish({dish}){
    return(
      <div className="col-12 col-md-5 m-1">
      <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
        <Card>
          <CardImg top src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
      </div>
    );
  }

  function RenderComments({comments, postComment, dishId}){
    return(
      <div className="col-12 col-md-5 m-1">
        <h3>Comments</h3>
        <p>Imagine all the eatables, living in conFusion!</p>
        <Stagger in>
          {comments.map((comment) => {
            return (
              <Fade in>
              <ul key={comment.id}>
              <p>{comment.comment}</p>
              <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
              </ul>
              </Fade>
            );
          })}
        </Stagger>

        <CommentForm dishId={dishId} postComment={postComment}/>
      </div>
    );
  }

  function DishDetail(props){
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }

    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }

    else if(props.dish != null){
      return(
        <div className = "container">
          <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>
            <RenderDish dish={props.dish} />
            <RenderComments comments={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      );
    }
    else{
      return(
        <div></div>
      );
    }
  };

  class CommentForm extends Component{
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

    handleSubmit(values) {
      this.toggleModal();
      this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);

    }

    render(){
      return(
        <div className="col-12 col-md-9">
        <Button onClick={this.toggleModal} color="primary">Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader  toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>Rating</Label>
                <Col md={{size:10}}>
                  <div className="form-check">
                      <Control.select model=".rating" type="select" name="rating"
                              className="form-control">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                      </Control.select>
                    </div>
                  </Col>
                </Row>

                <Row className="form-group">
                  <Label htmlFor="comment" md={12}>Name</Label>
                  <Col md={12}>
                      <Control.text model=".author" type="text" id="comment" name="comment"
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
                      <Label htmlFor="comment" md={12}>Your Feedback</Label>
                      <Col md={12}>
                          <Control.text model=".comment" type="textarea" id="comment" name="comment"
                              className="form-control"
                              rows="12"
                              ></Control.text>
                      </Col>
                  </Row>

                  <Row className="form-group">
                      <Col md={{size: 5}}>
                          <Button type="submit" color="primary">
                              Send Feedback
                          </Button>
                      </Col>
                  </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  }

export default DishDetail;
