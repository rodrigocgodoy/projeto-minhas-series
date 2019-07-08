import React, { Component } from 'react'

import Serie from './Serie'
import api from '../bd/Api'

class Series extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            series: []
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        api.loadSeriesByGenre(this.props.match.params.genre).then((res) => {
            this.setState({
                isLoading: false,
                series: res.data
            })
        })
    }
    render() {
        return (
            <section id="intro" className="intro-section">
                <h1>Séries {this.props.match.params.genre}</h1>
                <br />
                <div id="series" className="row list-group">
                    {
                        !this.state.isLoading &&
                        this.state.series.map((dados, i) => {     
                            return (
                                <div>
                                    <Serie key={i} dados={dados} />
                                </div>
                            ) 
                         })
                    }

                </div>
            </section>
        )
    }
}

export default Series