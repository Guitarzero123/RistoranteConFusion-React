import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap'; 

class DishDetail extends Component {

    renderDish(dish) {
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

    renderComments(comments) {
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

    render() {
        const dish = this.props.selectedDish;
        let comments = dish != null ? dish.comments : null;
            return (
                <div className="container">
                    <div className="row"> 
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(dish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            {this.renderComments(comments)}
                        </div>
                    </div>
                </div> 
            );
    }
}

export default DishDetail;