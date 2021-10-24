import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

function MoviesFunc(props) {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/v1/movies`)
            .then((response) => {
                console.log("Status code is", response.status)
                if (response.status !== 200) {
                    setError("Invalid response code: ", response.status);
                } else {
                    setError(null);
                }
                return response.json()
            })
            .then((json) => {
                setMovies(json.movies);
            });
    }, []); 

    if (error !== null) {

    } else {
        return (
            <Fragment>
                <div className="list-group">
                    <table className="table table-borderless">
                        {movies.map((m) => (
                            <tr>
                                <td>
                                    <Link key={m.id}
                                        className="list-group-item list-goup-item-action"
                                        to={`/movies/${m.id}`}>
                                        <strong> {m.title}</strong><br />
                                        <small className="text-muted">
                                            ({m.year}) - {m.runtime} minutes<br />
                                            {m.description.slice(0, 100)}...
                                        </small>
                                    </Link >
                                </td>
                                <td>
                                    <Link className="list-group-item list-goup-item-action" to={`/movies/${m.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w200${m.poster}`} height="70px" alt="poster" />
                                    </Link>
                                </td>
                            </tr>
                        ))}

                    </table>
                </div>
            </Fragment>
        );
    }
}

export default MoviesFunc;