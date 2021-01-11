import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

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
    
  return fetch(baseUrl + 'dishes')
    .then(response => {
        if(response.ok) {
            return response;
        } else {
            let error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
    error => {
        let errorMessage = new Error(error.message);
        throw errorMessage;
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
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

//Loads Comments
export const fetchComments = () => (dispatch) => {
    
  return fetch(baseUrl + 'comments')
    .then(response => {
        if(response.ok) {
            return response;
        } else {
            let error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
    error => {
        let errorMessage = new Error(error.message);
        throw errorMessage;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

//tells website comments failed loading
export const commentsFailed = (errorMessage) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errorMessage
});

//adds comments
export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

//Loads promos
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if(response.ok) {
                return response;
            } else {
                let error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errorMessage = new Error(error.message);
            throw errorMessage;
        })
      .then(response => response.json())
      .then(promos => dispatch(addPromos(promos)))
      .catch(error => dispatch(promosFailed(error.message)));
};

//tells fetchPromos if promos are being loaded
export const promosLoading = () => ({
type: ActionTypes.PROMOS_LOADING
});
  
//tells website promos failed loading
export const promosFailed = (errorMessage) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errorMessage
});
  
//adds promos
export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});


