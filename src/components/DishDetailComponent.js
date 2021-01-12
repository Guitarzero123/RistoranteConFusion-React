import React,{ Component } from 'react';
import { 
    Card, CardImg, CardText, CardBody, CardTitle, ListGroup,
    ListGroupItem, Breadcrumb, BreadcrumbItem, Button, Modal,
    ModalHeader, ModalBody, Row, Label, Col 
} from 'reactstrap'; 
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger} from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

//Comment Form Component
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    //Toggles the Modal
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    //Handles the forms submission
    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <>
                
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg" />Submit Comment
                </Button>
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                       
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" sm={12}>Rating</Label>
                                <Col>
                                    <Control.select model=".rating" name="rating" className="form-control custom-select">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" sm={12}>Your Name</Label>
                                <Col>
                                    <Control.text model=".author" name="author" id="author" className="form-control" placeholder="Your Name" 
                                        validators={{minLength: minLength(3), maxLength: maxLength(15)}} 
                                    />
                                    <Errors className="text-danger" model=".author" show="touched"
                                        messages={{ 
                                            minLength: 'Must be greater than 2 characters', 
                                            maxLength: 'Must be 15 characters or less'
                                        }} 
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" sm={12}>Comment</Label>
                                <Col>
                                    <Control.textarea model=".comment" name="comment" id="comment" rows="6" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
};

//Renders Dishes in cards
function RenderDish({ dish }) {
    if(dish != null) {
        return (
            <FadeTransform in transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    } else {
        return ( <div></div> );
    }
}

//Renders Comments
function RenderComments({ comments, postComment, dishId }) {
    if(comments != null) {

        //maps comments to commentList array
        const commentList = comments.map((comment) => {
            return (
                
                    <ListGroupItem key={comment.id} className="border-0">
                        <Fade in>
                            {comment.comment}<br></br>
                            --{comment.author}, {new Intl.DateTimeFormat('en-CA', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        </Fade>
                    </ListGroupItem>
                
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                
                
                    <ListGroup>
                        <Stagger in>
                            {commentList}
                        </Stagger>
                    </ListGroup>
                
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
        
    } else {
        return ( <div></div> );
    }
}

function DishDetail(props) {
    //displays loading animation
    if(props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    //Error Handling
    else if(props.errorMessage) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errorMessage}</h4>
                </div>
            </div>
        )
    }
    //Renders the Dish and all attached comments
    if(props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={'/menu'}>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content"> 
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} 
                            postComment={props.postComment} 
                            dishId={props.dish.id} />
                    </div>
                </div>
            </div> 
        );
    } else {
        return ( <div></div> );
    }
        
}

export default DishDetail;