import './Sidebar.css'

interface SidebarProps {
    onClose: () => void;
    uniqueTagsArray: string[];
    onCheckedTag: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedTags: string[];
    onResetTags: () => void;
}


export function Sidebar({ onClose, uniqueTagsArray, onCheckedTag, selectedTags, onResetTags }: SidebarProps) {


    return (
        <aside className='sidebar'>
            <button className='sidebar-close-button' onClick={onClose}>X</button>
            <div className='sidebar-content'>

                {/*БАЗОВЫЕ ВАРИАНТЫ СОРТИРОВКИ*/}
                <section className='sidebar-section'>
                    <h3 className='sidebar-title'>Sort by</h3>

                    <label className='sidebar-option'>
                        <input type="radio" name='sort' />
                        Title (A-Z)
                    </label>

                    <label className='sidebar-option'>
                        <input type="radio" name='sort' />
                        Author (A-Z)
                    </label>

                    <label className='sidebar-option'>
                        <input type='radio' name='sort' />
                        Status
                    </label>
                </section>

                {/*ООБРАННЫЕ ТЭГИ ДЛЯ ЧЕКБОКСОВ */}

                <section className='sidebar-section'>
                    <ul className='sidebar-tags-list'>


                        <h3 className='sidebar-title'>Tags</h3>

                        {
                            uniqueTagsArray.map(tag => (

                                <li key={tag} className='tag-item'>
                                    <label className='tag-label'>
                                        <span>{tag}</span>
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
            </div>

            <div className='sidebar-footer'>
                <button
                    className='sidebar-button'
                    onClick={onResetTags}
                >
                    Reset
                </button>
                <button className='sidebar-button'>
                    Search
                </button>

            </div>
        </aside>
    );
}