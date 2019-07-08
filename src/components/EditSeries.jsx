import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from '../bd/Api'

const statuses = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir'
}

class EditSeries extends Component {
    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            isLoading: false,
            redirect: false,
            series: {}
        }

        this.saveSeries = this.saveSeries.bind(this)
    }
    componentDidMount() {
        this.setState({ isLoading: true })

        api.loadSeriesById(this.props.match.params.id)
            .then((res) => {
                this.setState({series: res.data})
                this.refs.name.value = this.state.series.name
                this.refs.comments.value = this.state.series.comments
                this.refs.genre.value = this.state.series.genre
                this.refs.status.value = this.state.series.status
            })


        api.loadGenres()
            .then((res) => {
                this.setState({
                    isLoading: false,
                    genres: res.data
                })
            })
    }
    saveSeries() {
        const newSeries = {
            id: this.props.match.params.id,
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comments: this.refs.comments.value
        }
        api.updateSeries(newSeries).then((res) =>
            this.setState({
                redirect: `/series/${this.refs.genre.value}`
            })
        )
    }
    render() {
        return (
            <section className="intro-section">
                {
                    this.state.redirect &&
                    <Redirect to={this.state.redirect} />
                }
                <h1>Editar Série</h1>
                <div className="row">
                    <div className="col-md-6 col-sm-6 offset-md-3 offset-sm-3">
                        <form>
                            Nome: <input defaultValue={this.state.series.name} type='text' ref='name' className='form-control' />
                            <br />
                            Status:
                            <select ref='status' className='form-control'>
                                {Object
                                    .keys(statuses)
                                    .map(key =>
                                        <option key={key} value={key}>{statuses[key]}</option>
                                    )
                                }
                            </select>
                            <br />
                            Gênero:
                            <select ref='genre' className='form-control'>
                                {this.state.genres
                                    .map(key =>
                                        <option key={key} value={key}>{key}</option>
                                    )
                                }
                            </select>
                            <br />
                            Comentários: <textarea ref='comments' className='form-control'>{this.state.series.comments}</textarea>
                            <br />
                            <button type='button' onClick={this.saveSeries} className='btn btn-outline-success btn-block'>Salvar</button>
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}

export default EditSeries