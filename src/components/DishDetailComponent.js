import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap'; 


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
    const dish = props.dish;
    const comments = dish != null ? dish.comments : null;
        return (
            <div className="container">
                <div className="row"> 
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={comments} />
                    </div>
                </div>
            </div> 
        );
}


export default DishDetail;