import React, { useState, useEffect, Fragment } from 'react';

function OneMovieFunc(props) {
    const [movie, setMovie] = useState({    });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/v1/movie/` + props.match.params.id)
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
                setMovie(json.movie);
            });
    }, [props.match.params.id]);

    if (error !== null) {
        return <div>Error: {error.message}</div>
    } else {
        if (movie.genres) {
            movie.genres = Object.values(movie.genres);
        } else {
            movie.genres = [];
        }
        return (
            <Fragment>
                <h2>
                    Movie: {movie.title} ({movie.year})
                </h2>
                {movie.poster !== "" && (
                    <div>
                        <img src={`https://image.tmdb.org/t/p/w200/${movie.poster}`} alt="poster" />
                    </div>
                )}
                <div className="float-start">
                    <small>{movie.mpaa_rating}</small>
                </div>
                <div className="float-end">
                    {movie.genres.map((m, index) => (
                        <span className="badge bg-secondary me-1" key={index}>
                            {m}
                        </span>
                    ))}
                </div>

                <div className="clearfix"></div>
                <hr />

                <table className="table table-compact table-striped">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td><strong>Title:</strong></td>
                            <td>{movie.title} </td>
                        </tr>
                        <tr>
                            <td><strong>Description:</strong></td>
                            <td>{movie.description}</td>
                        </tr>
                        <tr>
                            <td><strong>Runtime:</strong></td>
                            <td>{movie.runtime} minutes</td>
                        </tr>
                    </tbody>
                </table>
            </Fragment>

        );
    }
}


export default OneMovieFunc;