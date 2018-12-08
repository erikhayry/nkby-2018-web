import { sortLocalesByName } from '../utils/locales'
import Link from 'next/link'

const LocalesList = ({locales = []}) => {
    const sortedLocales = sortLocalesByName(locales).filter(({position}) => position);
    const letterList = sortedLocales.map(({name}) => name[0]).filter((value, index, self) => self.indexOf(value) === index);

    return (
        <>
            <ul role="navigation" className="abc-nav">
                {letterList.map((letter, i) => <li key={i} className="abc-nav--item">
                    <a href={`#${letter}`}>{letter}</a>
                </li>)}
            </ul>

            {sortedLocales.map(({id, name, numberOfPages, position}, i) => {
                if(position){
                    const firstLetter = name[0];
                    const firstOnLetterLocale = sortedLocales.find(({name}) => firstLetter === name[0]);
                    const heading = firstOnLetterLocale.id === id ? <h2 id={firstLetter} key={firstLetter} className="abc-list--item-heading">{firstLetter}</h2> : null;

                    return (
                        <>
                            {heading}
                            <div key={id} className="abc-list--item">
                                <Link prefetch href={`/locale?id=${id}`} as={`/locale/${id}`} >
                                    <a>{name} ({numberOfPages})</a>
                                </Link>
                            </div>
                        </>
                    )
                }

                return null;
            })}
        </>
    )
};

export default LocalesList;