import ReactGA from 'react-ga';
import { parseImageSrc } from '../utils'
import { sortPagesByTitle } from '../utils/locales';
import LazyLoad from 'react-lazyload';

const PageList = ({pages = []}) =>
    <ul>
        {sortPagesByTitle(pages).map((page, i) => {
            return (
                <li key={i}>
                    <LazyLoad height={100}>
                        <img src={parseImageSrc(page.image)} />
                    </LazyLoad>
                    <noscript>
                        <img src={parseImageSrc(page.image)} />
                    </noscript>
                    <br/>
                    <ReactGA.OutboundLink
                        eventLabel="to-nykarlebyvyer"
                        to={page.url}
                        target="_blank"
                    >
                        {page.title}`
                    </ReactGA.OutboundLink>s
                </li>
            )
        })}
    </ul>;

export default PageList;