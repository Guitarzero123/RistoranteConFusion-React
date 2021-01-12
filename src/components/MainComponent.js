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
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../Redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () =>{dispatch(fetchLeaders())},
  resetFeedbackForm: ()=> { dispatch(actions.reset('feedback'))}
});

//Main Component
class Main extends Component {

  constructor(props) {
    super(props);
  }

  //if the component succesfully mounted
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  //render must be defined whenever you declare a class component
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
          leader={this.props.leaders.leaders.filter((leader) => leader.featured === true)[0]} 
          leadersLoading={this.props.leaders.isLoading}
          leadersFailed={this.props.leaders.errorMessage}
          />
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
          postComment={this.props.postComment} />
      ); 
    }

    //Renders Website
    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch>
                <Route path={"/home"} component={HomePage} />
                <Route exact path={"/aboutus"} component={() => <About leaders={this.props.leaders} />} />
                <Route exact path={"/menu"} component={() => <Menu dishes={this.props.dishes} />} />
                <Route path={"/menu/:dishId"} component={DishWithId} />
                <Route exact path={"/contactus"} component={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                <Redirect to="/home"/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));