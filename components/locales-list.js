import { sortLocalesByName } from '../utils/api'
import Link from 'next/link'

function setHref(id){
    let ret = {
        href: `/locale?id=${id}`
    };

    ret.as = `/locale/${encodeURI(id)}`;

    return ret;
}

const LocalesList = ({locales = [], withABCNav = false, className}) => {
    const sortedLocales = withABCNav ? sortLocalesByName(locales).filter(({position}) => position) : locales;
    const letterList = sortedLocales.map(({name}) => name[0]).filter((value, index, self) => self.indexOf(value) === index);

    return (
        <>
            {withABCNav &&
                <ul role="navigation" className="abc-nav">
                    {letterList.map((letter, i) => <li key={i} className="abc-nav--item" >
                        <a href={`#${letter}`} className="abc-nav--link">{letter}</a>
                    </li>)}
                </ul>
            }

            {sortedLocales.map(({id, name, numberOfPages, position}, i) => {
                if(position){
                    const firstLetter = name[0];
                    const firstOnLetterLocale = sortedLocales.find(({name}) => firstLetter === name[0]);
                    const heading = firstOnLetterLocale.id === id ? <h2 id={firstLetter} className="abc-list--item-heading">{firstLetter}</h2> : null;

                    return (
                        <div key={id} className={className}>
                            {withABCNav && <>
                                {heading}
                            </>}
                            <div className="abc-list--item">
                                <Link {...setHref(id)}>
                                    <a className="abc-list--link">{name} ({numberOfPages})</a>
                                </Link>
                            </div>
                        </div>
                    )
                }

                return null;
            })}
        </>
    )
};

export default LocalesList;