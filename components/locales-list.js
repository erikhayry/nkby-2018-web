import { sortLocalesByName } from '../utils/locales'
import Link from 'next/link'

const LocalesList = ({locales = []}) => {
    const sortedLocales = sortLocalesByName(locales).filter(({position}) => position);
    const letterList = sortedLocales.map(({name}) => name[0]).filter((value, index, self) => self.indexOf(value) === index);

    return (
        <>
            <ul role="navigation" className="abc-nav">
                {letterList.map((letter, i) => <li key={i} className="abc-nav--item" >
                    <a href={`#${letter}`} className="abc-nav--link">{letter}</a>
                </li>)}
            </ul>

            {sortedLocales.map(({id, name, numberOfPages, position}, i) => {
                if(position){
                    const firstLetter = name[0];
                    const firstOnLetterLocale = sortedLocales.find(({name}) => firstLetter === name[0]);
                    const heading = firstOnLetterLocale.id === id ? <h2 id={firstLetter} className="abc-list--item-heading">{firstLetter}</h2> : null;

                    return (
                        <div key={id}>
                            {heading}
                            <div className="abc-list--item">
                                <Link href={`/locale?id=${id}`}>
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