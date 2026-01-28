import './Sidebar.css'

interface SidebarProps {
    onClose: () => void;
}


export function Sidebar({ onClose }: SidebarProps) {


    return (
        <aside className='sidebar'>
            <button className='sidebar-close-button' onClick={onClose}>X</button>
            <div className='sidebar-content'>
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

                <section className='sidebar-section'>
                    <h3 className='sidebar-itle'>Tags</h3>

                    <label className='sidebar-option'>
                        <input type="checkbox" />
                        Sci-Fi (1)
                    </label>

                    <label className='sidebar-option'>
                        <input type="checkbox" />
                        Fantasy (1)
                    </label>

                    <label className='sidebar-option'>
                        <input type="checkbox" />
                        Classic (2)
                    </label>
                </section>
            </div>

            <div className='sidebar-footer'>
                <button className='sidebar-button'>
                    Search
                </button>

            </div>
        </aside>
    );
}