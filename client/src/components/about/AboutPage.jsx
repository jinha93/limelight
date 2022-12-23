import Team from './Team';
import About from './About';
import { Fragment } from 'react';

function AboutPage(props) {
    return (
        <Fragment>
            <About></About>
            <Team></Team>
        </Fragment>
    )
}

export default AboutPage;