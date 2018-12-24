import React from "react";
import LazyLoad from 'react-lazyload';
import { parseImageSrc } from '../utils'

class Image extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            withJS: false
        }
    }

    componentDidMount(){
        this.setState({
            withJS: true
        })
    }

    render() {
        const {src, height = 200} = this.props;

        if(src){            
            const imageEl = <img {...this.props} src={parseImageSrc(src)} />;

            return (
                <>
                    {this.state.withJS && <LazyLoad height={height}>
                        {imageEl}
                    </LazyLoad>}
                    <noscript>
                        {imageEl}
                    </noscript>
                </>
            )
        }

        return null;

    }
}

export default Image;