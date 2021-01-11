import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import Menu from './MenuComponent';
import About from './AboutComponent';
import Contact from './ContactComponent'
import DishDetail from './DishDetailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes, fetchComments, fetchPromos } from '../Redux/ActionCreators';
import { actions } from 'react-redux-form';

//Maps current state to the Main Components props
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

//maps dispatched actions to the Main Components props
const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  resetFeedbackForm: ()=> { dispatch(actions.reset('feedback'))}
});

//Main Component
class Main extends Component {

  constructor(props) {
    super(props);
  }

  //if the component succesful mounted
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  //render must be created whenever you declare a class component
  render() {

    //Home page
    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured === true)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrorMessage={this.props.dishes.errorMessage}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured === true)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrorMessage={this.props.promotions.errorMessage}
          leader={this.props.leaders.filter((leader) => leader.featured === true)[0]} />
      );
    }

    //Handles dish Detail component
    const DishWithId = ({ match }) => {
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]} 
          isLoading={this.props.dishes.isLoading}
          errorMessage={this.props.dishes.errorMessage} 
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          commentsErrorMessage={this.props.comments.errorMessage} 
          addComment={this.props.addComment} />
      ); 
    }

    //Renders Website
    return (
      <div>
        <Header />
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path={"/aboutus"} component={() => <About leaders={this.props.leaders} />} />
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route exact path="/contactus" component={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
            <Redirect to="/home"/>
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));