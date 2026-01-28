import './Overlay.css'

interface OverlayProps {
    onClick: () => void;
}


export function Overlay({ onClick }: OverlayProps) {


    return (
        <div className='overlay' onClick={onClick}></div>
    );
}