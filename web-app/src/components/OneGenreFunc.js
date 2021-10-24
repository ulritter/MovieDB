import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

function OneGenreFunc(props) {
    let [movies, setMovies] = useState([]);
    const [genreName, setGenreName] = useState([]);
    const [error, setError] = useState(null);
   

    useEffect(() => {
        
        fetch(`${process.env.REACT_APP_API_URL}/v1/movies/` + props.match.params.id)
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
                setGenreName(props.location.genreName)
                
            });
    }, [props.match.params.id, props.location.genreName]);

    if (error !== null) {
        return <div>Error: {error.message}</div>
    } else {
        if (!movies){
            movies = [];
        }
        return (
            <Fragment>
                <h2>Genre: {genreName}</h2>
                <div className="list-group">
                    {movies.map((m) => (
                        <Link key={m.id} to={`/movies/${m.id}`} className="list-group-item list-goup-item-action">{m.title}</Link>
                    ))}
                </div>
            </Fragment>
        );
    }
}

export default OneGenreFunc;