import ReactGA from 'react-ga';
import { sortPagesByTitle } from '../utils/api';
import Image from './image';

const PageList = ({pages = [], className}) =>
    <ul className={`page-list ${className}`}>
        {sortPagesByTitle(pages).map((page, i) => {
            const {src, description} = page.image || {};
            const url = page.url.replace('http', 'https');

            return (
                <li key={i} className="page-list--item">
                    <div className="page-list--item-inner">
                        <ReactGA.OutboundLink
                            eventLabel={`nykarlebyvyer:${url}`}
                            to={url}
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

                    </div>
                </li>
            )
        })}
    </ul>;

export default PageList;