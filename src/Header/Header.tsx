import './Header.css'

interface HeaderProps {
    onMenuClick: () => void;
    onButtonClick: () => void;
}

export function Header({ onMenuClick, onButtonClick }: HeaderProps) {


    return (
        <header className='app-header'>
            <button
                className='header-button'
                aria-label='open-menu'
                onClick={onMenuClick}
            >
                ☰
            </button>

            <h1 className='header-title'>My Library</h1>

            <button className='header-button header-button--primary' onClick={onButtonClick}>
                + Add
            </button>

        </header>
    )
}