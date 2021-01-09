import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';

//Adds Comment to comments sections
export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});  

//Loads dishes
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    
    setTimeout(() => {
        dispatch(addDishes(DISHES));
    }, 2000);
};

//tells fetchDishes if dishes are being loaded
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

//tells website dishes failed loading
export const dishesFailed = (errorMessage) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errorMessage
});

//adds dishes
export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});