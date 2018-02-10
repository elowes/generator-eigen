import React, { Component } from 'react';
import { connect } from 'dva';

import './HomePage.css';
import styles from './HomePage.scss';

@connect(state => ({
    homepage: state.homepage,
    loading: state.loading
}))
class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    returnRandomMovieName() {
        const { homepage } = this.props;
        const arr = homepage.movietop250.subjects;
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex].title;
    }

    render() {
        const { homepage, loading } = this.props;
        return <div className="container">
            <h1 className={styles.title}>
                {
                    (loading.global || !homepage.movietop250) ?
                        "获取豆瓣热门电影中..."
                        :
                        this.returnRandomMovieName()
                }
            </h1>
        </div>
    }
}

export default HomePage;
