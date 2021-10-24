import React, { Component, Fragment } from 'react';
import Input from './form-components/Input';
import { Link } from 'react-router-dom';

export default class GraphQL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            isLoaded: false,
            error: null,
            aler: {
                type: "d-none",
                message: "",
            },
            searchTerm: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (evt) => {
        let value = evt.target.value;
     

        this.setState(
            (prevState) => ({
                searchTerm: value,
            })
        )
        if (value.length > 2) {
            this.performSearch();
        } else {
            this.setState({
                movies: [],
            })
        }

    }

    performSearch() {

        let lcSearch = this.state.searchTerm.toLowerCase();
        const payload = `
        {
            search (titleContains: "${lcSearch}"){
                id
                title
                runtime
                year
                description
            }
        }
        `
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'POST',
            body: payload,
            headers: myHeaders,
        }


        fetch(`${process.env.REACT_APP_API_URL}/v1/graphql`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                let theList = Object.values(data.data.search);
                return theList;
            })
            .then((theList) => {
                console.log(theList);
                if (theList.length > 0) {
                    this.setState({
                        movies: theList,
                    })
                } else {
                    this.setState({
                        movies: [],
                    })
                }
            })
    }

    componentDidMount() {
        const payload = `
        {
            list {
                id
                title
                runtime
                year
                description
            }
        }
        `
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'POST',
            body: payload,
            headers: myHeaders,
        }


        fetch(`${process.env.REACT_APP_API_URL}/v1/graphql`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                let theList = Object.values(data.data.list);
                return theList;
            })
            .then((theList) => {
                console.log(theList);
                this.setState({
                    movies: theList,
                })
            })
    }

    render() {
        let movies = this.state.movies;
        return (
            <Fragment>
                <h2>GraphQL</h2>
                <hr />

                <Input
                    title={"Search"}
                    type={'text'}
                    name={'researchlease_date'}
                    value={this.state.searchTerm}
                    handleChange={this.handleChange}
                />

                <div className="list-group">
                    {movies.map((m) => (
                        <Link key={m.id}
                            className="list-group-item list-goup-item-action"
                            to={`/moviesgraphql/${m.id}`}>
                            <strong> {m.title}</strong><br />
                            <small className="text-muted">
                                ({m.year}) - {m.runtime} minutes<br />
                                {m.description.slice(0, 100)}...
                            </small>
                        </Link>
                    ))}
                </div>
            </Fragment>
        );
    }
}
