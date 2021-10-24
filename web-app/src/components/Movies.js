import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Movies extends Component {

    state = {
        movies: [],
        isLoaded: false,
        error: null,
    };

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/v1/movies`)
            // .then ((response) => response.json())
            .then((response) => {
                console.log("Status code is", response.status)
                if (response.status !== 200) {
                    let err = Error;
                    err.message = "Invalid response code: " + response.status;
                    this.setState({ error: err });
                }
                return response.json()
            })
            .then((json) => {
                this.setState({
                    movies: json.movies,
                    isLoaded: true,
                    error: null,
                },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error,
                        })
                    }
                );
            });
    }

    render() {
        const { movies, isLoaded, error } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <p>Loading ...</p>;
        } else {
            return (
                // Simple List
                // <Fragment>
                //     <h2>Choose a movie</h2>
                //     <div className="list-group">
                //         {movies.map( (m) => (
                //                 <Link key={m.id} to={`/movies/${m.id}`} className="list-group-item list-goup-item-action">{m.title}</Link>
                //         ))}
                //     </div>
                // </Fragment>

                // more comprehensive list
                <div className="list-group">
                    <table className="table table-borderless">
                        <tbody>
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
                                        {m.poster !== "" && (
                                            <Link key={`p${m.id}`} className="list-group-item " to={`/movies/${m.id}`}>
                                                <img src={`https://image.tmdb.org/t/p/w200${m.poster}`} height="100px" alt="poster" />
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}