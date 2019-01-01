import React from "react";
import LazyLoad from 'react-lazyload';
import { parseImageSrc } from '../utils'

class Image extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            withJS: false,
            imageStatus: 'loading'
        }
    }

    componentDidMount(){
        this.setState({
            withJS: true
        });
    }

    handleImageLoaded() {
        this.setState({ imageStatus: "loaded" });
    }

    handleImageErrored() {
        this.setState({ imageStatus: "failed" });
    }

    render() {
        const {src, height = 200, alt} = this.props;
        const { imageStatus, withJS } = this.state;

        if(src && imageStatus !== 'failed'){
            const imageEl = <img
                {...this.props}
                src={parseImageSrc(src)}
                onLoad={this.handleImageLoaded.bind(this)}
                onError={this.handleImageErrored.bind(this)}
            />;

            return (
                <>
                    {withJS && <LazyLoad height={height}>
                        {imageEl}
                    </LazyLoad>}
                    <noscript>
                        {imageEl}
                    </noscript>
                </>
            )
        } else if (alt) {
            return <div className="image--alt">{alt}</div>
        }

        return null;

    }
}

export default Image;