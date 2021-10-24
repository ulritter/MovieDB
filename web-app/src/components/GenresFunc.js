import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

function GenresFunc(props) {
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/v1/genres`)
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
                setGenres(json.genres);
            });
    }, []);
    if (error !== null) {

    } else {
        return (
            <Fragment>
                <h2>Genres</h2>

                <div className="list-group">
                    {genres.map((m) =>
                        <Link key={m.id} to={{
                            pathname: `/genre/${m.id}`,
                            genreName: m.genre_name,
                        }} className="list-group-item list-goup-item-action">
                            {m.genre_name}
                        </Link>
                    )}
                </div>
            </Fragment>
        );
    }

}

export default GenresFunc;