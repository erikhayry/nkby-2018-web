import React from 'react';
import Link from 'next/link';

const LINKS = [
    {
        href: '/',
        copy: 'Startsidan',
        label: 'startsida med karta'
    },
    {
        href: '/about',
        copy: 'Om',
        label: 'information om sidan'
    }
];

class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.state = { showMenu: false };
        this.toggleMenu = this.toggleMenu.bind(this)
    }

    toggleMenu(){
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.pathname !== prevProps.pathname) {
            this.setState({
                showMenu: false
            })
        }
    }

    render(){
        const { showMenu } = this.state;
        const { pathname } = this.props;


        return (
            <div className={showMenu ? 'open' : ''}>
                <div className="main-nav-btn" onClick={this.toggleMenu}>
                    <div className="main-nav-icon main-nav-icon--top"></div>
                    <div className="main-nav-icon main-nav-icon--mid"></div>
                    <div className="main-nav-icon main-nav-icon--bottom"></div>
                </div>
                <nav className="main-nav">
                    {LINKS.map(({href, as = '', label, copy}, i) => {
                        if(pathname === href){
                            return <span key={i} className="main-nav--item is-active">{copy}</span>
                        }

                        return (
                            <Link key={i} href={href} as={as}>
                                <a aria-label={label} className="main-nav--item">{copy}</a>
                            </Link>
                        )
                    })}

                </nav>
            </div>
        )
    }
}

export default Nav;