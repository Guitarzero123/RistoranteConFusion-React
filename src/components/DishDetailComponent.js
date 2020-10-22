import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem, Breadcrumb, BreadcrumbItem } from 'reactstrap'; 
import { Link } from 'react-router-dom';


function RenderDish({ dish }) {
    if(dish != null) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    } else {
        return ( <div></div> );
    }
}

function RenderComments({ comments }) {
    if(comments != null) {

        const commentList = comments.map((comment) => {
            return (
                <ListGroupItem key={comment.id} className="border-0">
                    {comment.comment}<br></br>
                    --{comment.author}, {new Intl.DateTimeFormat('en-CA', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                </ListGroupItem>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ListGroup>
                    {commentList}
                </ListGroup>
            </div>
        );
        
    } else {
        return ( <div></div> );
    }
}

function DishDetail(props) {
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
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div> 
        );
}


export default DishDetail;