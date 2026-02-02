import './Sidebar.css'



interface SidebarProps {
    onClose: () => void;
    uniqueTagsArray: string[];
    onCheckedTag: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedTags: string[];
    onReset: () => void;

    sortField: 'title' | 'author' | 'status' | 'date';
    sortDirection: 'asc' | 'desc';

    onChangeSortField: (field: 'title' | 'author' | 'status' | 'date') => void;
    onToggleSortDirection: () => void;
    tagsCount: Record<string, number>
}


export function Sidebar({
    onClose, uniqueTagsArray,
    onCheckedTag, selectedTags,
    onReset,
    sortField,
    sortDirection,
    onChangeSortField,
    onToggleSortDirection,
    tagsCount
}: SidebarProps) {


    return (
        <aside className='sidebar'>
            <button className='sidebar-close-button' onClick={onClose}>X</button>
            <div className='sidebar-content'>

                {/*БАЗОВЫЕ ВАРИАНТЫ СОРТИРОВКИ*/}



                <section className='sidebar-section'>
                    <h3 className='sidebar-title'>Sort by</h3>
                    <div className='sidebar-basic-sort-menu'>
                        <div className='sidebar-basic-sort-options'>
                            <label className='sidebar-option'>
                                <input
                                    type="radio"
                                    name='sortField'
                                    value='title'

                                    checked={sortField === 'title'}
                                    onChange={() => onChangeSortField('title')}
                                />
                                Title
                            </label>


                            <label className='sidebar-option'>
                                <input
                                    type="radio"
                                    name='sortField'
                                    value='author'

                                    checked={sortField === 'author'}
                                    onChange={() => onChangeSortField('author')}
                                />
                                Author
                            </label>

                            <label className='sidebar-option'>
                                <input
                                    type='radio'
                                    name='sort'
                                    value='status'

                                    checked={sortField === 'date'}
                                    onChange={() => onChangeSortField('date')}
                                />
                                Date
                            </label>

                            <label className='sidebar-option'>
                                <input
                                    type='radio'
                                    name='sort'
                                    value='status'

                                    checked={sortField === 'status'}
                                    onChange={() => onChangeSortField('status')}
                                />
                                Status
                            </label>
                        </div>
                        {/*ПЕРЕКЛЮЧЕНИЕ НАПРАВЛЕНИЯ */}
                        <button
                            className='sort-direction-toggle-button'
                            onClick={onToggleSortDirection}
                        >
                            {sortDirection === 'asc' ? '↑ A-Z' : '↓ Z-A'}
                        </button>
                    </div>
                </section>

                {/*ООБРАННЫЕ ТЭГИ ДЛЯ ЧЕКБОКСОВ */}

                <section className='sidebar-section'>
                    <ul className='sidebar-tags-list'>


                        <h3 className='sidebar-title'>Tags</h3>

                        {
                            uniqueTagsArray.map(tag => (

                                <li key={tag} className='tag-item'>
                                    <label className='tag-label'>
                                        <span className='tag-name-container'>{tag} ({tagsCount[tag]})</span>

                                        <input
                                            type='checkbox'
                                            className='tag-checkbox'
                                            name={tag}
                                            value={tag}
                                            onChange={onCheckedTag}
                                            checked={selectedTags.includes(tag) ? true : false}
                                        />
                                    </label>
                                </li>

                            ))
                        }




                    </ul>
                </section>
            </div >

            <div className='sidebar-footer'>
                <button
                    className='sidebar-button'
                    onClick={onReset}
                >
                    Reset
                </button>
                <button className='sidebar-button'>
                    Search
                </button>

            </div>
        </aside >
    );
}

/* 
ФОРМАТ ВЫВОДА ДЛЯ КНОПОК

 <label> Title
        <label> <input type="radio" name="sort" value="title-asc" />(A-Z)</label>
        <label> <input type="radio" name="sort" value="title-desc" />(Z-A)</label>
      </label>


*/