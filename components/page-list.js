import ReactGA from 'react-ga';
import { sortPagesByTitle } from '../utils/locales';
import Image from './image';

const PageList = ({pages = []}) =>
    <ul className="page-list">
        {sortPagesByTitle(pages).map((page, i) => {
            const {src, description} = page.image || {};

            return (
                <li key={i} className="page-list--item">
                    <ReactGA.OutboundLink
                        eventLabel="to-nykarlebyvyer"
                        to={page.url.replace('http', 'https')}
                        target="_blank"
                        rel="noopener"
                    >
                        {src && <Image
                            className="page-list--item-image"
                            src={src}
                            alt={description}
                        />}
                        <div className="page-list--item-description">
                            {page.title}
                        </div>
                    </ReactGA.OutboundLink>
                </li>
            )
        })}
    </ul>;

export default PageList;