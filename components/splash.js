import React from 'react';
import Link from 'next/link';


class Splash extends React.Component {
    componentDidMount(){
        setTimeout(() => {
            this.props.onLoadingEnd()
        }, 1000)
    }

    render(){
        return (
            <div className="splash">
                <Link href={'/?splash=false'}>
                    <a aria-label='Visa startsidan' className="splash--title">Nykarleby</a>
                </Link>
            </div>
        )
    }
}


export default Splash;