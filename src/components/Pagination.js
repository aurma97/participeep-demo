import React from 'react'

const Pagination = ({filmsPerPage, totalFilms, paginate}) => {
    const pageNumbers = [];
    
    for(let i = 1; i <= Math.ceil(totalFilms / filmsPerPage); i++) {
        pageNumbers.push(i)
    } 

    return (
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            <ul className="pagination-list">
                {
                    pageNumbers.map(number =>(
                        <li key={number}>
                            <a onClick={()=>paginate(number)} href="#" className="pagination-link" aria-label="Goto page 1">{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pagination
