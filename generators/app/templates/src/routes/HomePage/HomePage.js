import React, { Component } from 'react';
import { connect } from 'dva';

import './HomePage.css';
import styles from './HomePage.scss';
import yeomanLogo from '../../assets/yeoman-logo.png';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="container">
            <img src={yeomanLogo} className={styles.logo}/>
        </div>
    }
}

export default connect(({ homepage }) => ({ homepage }))(HomePage);
