import React from 'react';
import { Card, CardImg, CardText, CardBody,  CardTitle, CardSubtitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

//Card renderer
function RenderCard({ item, isLoading, errorMessage }) {
    //display Loading animation
    if(isLoading) {
        return (
            <Loading />
        );
    }
    //handle Errors
    else if (errorMessage) {
        return (
            <h4>{errorMessage}</h4>      
        );
    }
    else {
        //Render Card
        return (
            <FadeTransform in transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle>: null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }
    
}

//Renders home page
function Home(props) {
    return (
        <div className="container">
            <div className="row row-content align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} 
                        isLoading={props.dishesLoading}
                        errorMessage={props.dishesErrorMessage} 
                    />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} 
                        isLoading={props.promosLoading}
                        errorMessage={props.promosErrorMessage}
                    />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} />
                </div>
            </div>
        </div>
    );
}

export default Home;