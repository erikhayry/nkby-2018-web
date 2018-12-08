import ReactGA from 'react-ga';
import { sortPagesByTitle } from '../utils/locales';
import Image from './image';

const PageList = ({pages = []}) =>
    <ul className="page-list">
        {sortPagesByTitle(pages).map((page, i) => {
            const {src, description} = page.image;

            return (
                <li key={i} className="page-list--item">
                    <Image
                        className="page-list--item-image"
                        src={src}
                        alt={description}
                    />
                    <ReactGA.OutboundLink
                        className="page-list--item-description"
                        eventLabel="to-nykarlebyvyer"
                        to={page.url.replace('http', 'https')}
                        target="_blank"
                        rel="noopener"
                    >
                        {page.title}
                    </ReactGA.OutboundLink>
                </li>
            )
        })}
    </ul>;

export default PageList;