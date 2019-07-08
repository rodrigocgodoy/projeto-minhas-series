import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

import api from '../bd/Api'

const statuses = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir'
}

class Serie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }

        this.deleteSeries = this.deleteSeries.bind(this)
    }
    deleteSeries(id) {
        api.deleteSeries(id).then((res) => 
            this.forceUpdate()
        )
    }
    render() {
        return (
            
            <div className="item col-xs-4 col-lg-4">
                {
                    this.state.redirect &&
                    <Redirect to={this.state.redirect} />
                }
                <div key={this.props.dados.id} className="thumbnail">
                    <img className="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />
                    <div className="caption">
                        <h4 className="group inner list-group-item-heading">
                            {this.props.dados.name}</h4>
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <p className="lead">
                                    {this.props.dados.genre} / {statuses[this.props.dados.status]}</p>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <Link className="btn btn-success" to={`/series-edit/${this.props.dados.id}`}>Gerenciar</Link>
                                <a className="btn btn-success" onClick={() => this.deleteSeries(this.props.dados.id)}>Apagar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Serie