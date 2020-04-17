import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {deleteFilm, getFilms} from '../../store/actions/filmAction';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp, faThumbsDown, faTrash} from "@fortawesome/free-solid-svg-icons";
import Pagination from '../Pagination';

const Films = (props) => {
    let {getFilms, films} = props;
    const [categories, setCategory] = useState([]);
    const [movies, setMovie] = useState();
    const [likes, setLike] = useState();
    const [disLikes, setDisLike] = useState([]);
    const [filmsToDelete, setFilm] = useState([]);
    const [searchCat, setSearchCat] = useState("");
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState(4);

    useEffect(() => {
        getFilms();
    }, [movies])

    films.map((film, index) => {
        categories.findIndex(i => i.title === film.category ) === -1 && setCategory([...categories, {id: index, title: film.category}])
    })

    const filterByCat = (e) => {
        setSearchCat(e.target.value);
    }

    const resetFilter = () => {
        setSearchCat("");
    }

    // Delete a film
    if (filmsToDelete) {
        filmsToDelete.map(item => {
            films = films.filter(elt => {
                return item.id != elt.id;
            })
        })
    }

    // Like Dislike

    if (likes) {
        let film = {
            ...likes,
            likes: likes.likes >=0 ? likes.likes++ : 0,
            dislikes: likes.dislikes >= 0 ? likes.dislikes-- : 0
        }
        films[likes.index] = film
    }

    if (disLikes) {
        let film = {
            ...disLikes,
            likes: disLikes.likes ? disLikes.likes-- : 0,
            dislikes: disLikes.dislikes >= 0 ? disLikes.dislikes++ : 0
        }
        films[disLikes.index] = film
    }

    // Filters

    if (searchCat){
        films = films.filter(film => {
            return film.category == searchCat;
        })
    }else{
        films = films
    }

    // Pagination

    const indexOfLastFilm = activePage * perPage;
    const indexOfFirstFilm = indexOfLastFilm - perPage;
    const currentFilms = films.slice(indexOfFirstFilm, indexOfLastFilm)

    // Change page
    const paginate = (e, pageNumber) => setActivePage(pageNumber);

    films = currentFilms

    return (
        <div className="container">
            <h2 className="title is-link">Liste des films ({films.length})</h2>
            <div className="level">
                <div className="level-left">
                    <div className="level-item">
                        <div className="field">
                            <label className="label">Pagination par</label>
                            <div className="select is-fullwidth">
                                <select onChange={filterByCat} onChange={(e)=>setPerPage(e.target.value)}>
                                    <option value="4">4</option>
                                    <option value="8">8</option>
                                    <option value="12">12</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="level-item">
                        <div className="field">
                            <label className="label">Filtre par catégorie</label>
                            <div className="select is-fullwidth">
                                <select onChange={filterByCat}>
                                    <option>Sélectionner une catégorie</option>
                                    {
                                        categories.map(item => {
                                            return <option value={item.title} key={item.id}>{item.title}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="level-item">
                        <div className="field">
                            <label className="label">&nbsp;</label>
                            <button className="button is-danger is-inverted" onClick={resetFilter}>Réinitialiser</button>
                        </div>
                    </div>
                </div>
            </div>
            {
                films.length ? films.map((item, index) => {
                    return (
                        <div className="is-inline-block carditem" key={index}>
                            <div className="card thecard">
                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-content">
                                            <p className="title is-4">{item.title}</p>
                                            <br/>
                                            <p className="subtitle is-6">Catégorie : {item.category}</p>
                                        </div>
                                    </div>
                                    <div className="level">
                                        <div className="level-left">
                                            <div className="level item">
                                                <div className="content">
                                                    {
                                                         likes && likes.index === index ? 
                                                            <span className="has-text-link">
                                                                <FontAwesomeIcon icon={faThumbsUp}/>&nbsp;{item.likes}
                                                            </span>
                                                        :
                                                            <span className="has-text-link" onClick={()=>setLike({...item, index})}>
                                                                <FontAwesomeIcon icon={faThumbsUp}/>&nbsp;{item.likes}
                                                            </span>
                                                    }
                                                    &nbsp;
                                                    {
                                                        disLikes && disLikes.index === index ? 
                                                            <span className="has-text-danger">
                                                                <FontAwesomeIcon icon={faThumbsDown}/>&nbsp;{item.dislikes}
                                                            </span>
                                                        :
                                                            <span className="has-text-danger" onClick={()=>setDisLike({...item, index})}>
                                                                <FontAwesomeIcon icon={faThumbsDown}/>&nbsp;{item.dislikes}
                                                            </span>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="level-right">
                                            <div className="level-item">
                                                <span className="" onClick={()=>setFilm([...filmsToDelete, item])}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                :
                   <div className="notification">
                       Aucun film n'est disponible
                   </div>
            }
            <Pagination filmsPerPage={perPage} totalFilms={props.films.length} paginate={paginate} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        films: state.films
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFilms: () => dispatch(getFilms())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Films);
