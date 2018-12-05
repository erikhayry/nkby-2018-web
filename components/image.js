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
        const {src, alt, height = 200} = this.props;

        if(src){            
            const imageEl = <img src={parseImageSrc(src)} alt={alt} />;

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