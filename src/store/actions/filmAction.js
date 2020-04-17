import {movies$} from '../../config/api';

export const getFilms = () => {
    return (dispatch) => {
        movies$
        .then(films => {
             dispatch({type: 'GET_FILMS', films: films})
             console.log("ici")
        })
        .catch(error => console.log(error))
    }
}

export const deleteFilm = (id) => {
    return (dispatch) => {
        movies$
        .then(films => {
            films = films.filter(film => film.id != id);
            console.log(id);
            dispatch({type: 'DELETE_FILM', films})
        })
        
    }
}