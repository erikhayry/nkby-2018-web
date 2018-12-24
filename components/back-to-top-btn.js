import React from 'react';

class BackToTopBtn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showBackToTop: typeof window !== 'undefined' && window.scrollY > 500 ? true : false
        };

        this.handleScroll = this.handleScroll.bind(this)
    }

    handleScroll() {
        this.setState({showBackToTop: window.scrollY > 500});
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }

    render(){
        const { showBackToTop } = this.state;

        return (
            <a href="#top" className={`back-to-top-btn ${ showBackToTop ? 'is-visible' : ''}`}>
                <span className="visible-hidden">Tillbaka till toppen</span>
            </a>
        )
    }
}


export default BackToTopBtn;