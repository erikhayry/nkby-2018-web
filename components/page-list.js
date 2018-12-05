import ReactGA from 'react-ga';
import { sortPagesByTitle } from '../utils/locales';
import Image from './image';

const PageList = ({pages = []}) =>
    <ul>
        {sortPagesByTitle(pages).map((page, i) => {
            return (
                <li key={i}>
                    <Image src={page.image}/>
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