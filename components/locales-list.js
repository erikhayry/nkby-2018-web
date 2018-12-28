import { sortLocalesByName } from '../utils/api'
import Link from 'next/link'

const LocalesList = ({locales = [], withNav = false, className}) => {
    const sortedLocales = withNav ? sortLocalesByName(locales).filter(({position}) => position) : locales;
    const letterList = sortedLocales
        .map(({name}) => name[0])
        .filter((value, index, self) => self.indexOf(value) === index);

    return (
        <>
            {withNav &&
                <ul role="navigation" className="locales-list-nav">
                    {letterList.map((letter, i) => <li key={i} className="locales-list-nav--item" >
                        <a href={`#${letter}`} className="locales-list-nav--link">{letter}</a>
                    </li>)}
                </ul>
            }

            <ul>
                {sortedLocales.map(({id, name, numberOfPages, position}) => {
                    if(position){
                        const firstLetter = name[0];
                        const firstOnLetterLocale = sortedLocales.find(({name}) => firstLetter === name[0]);
                        const heading = firstOnLetterLocale.id === id ? <h2 id={firstLetter} className="locales-list--item-heading">{firstLetter}</h2> : null;

                        return (
                            <li key={id} className={className}>
                                {withNav && <>
                                    {heading}
                                </>}
                                <div className="locales-list--item">
                                    <Link href={`/locale?id=${id}`}>
                                        <a className="locales-list--link">
                                            {name}
                                            {numberOfPages > 1 && <span className="locales-list--number-of-pages">{numberOfPages}</span>}
                                        </a>
                                    </Link>
                                </div>
                            </li>
                        )
                    }

                    return null;
                })}
            </ul>
        </>
    )
};

export default LocalesList;