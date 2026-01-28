import './BookCard.css'

type BookStatus = 'Read' | 'Reading' | 'Abandoned';

interface BookCardProps {
    id: string;
    title: string;
    author: string;
    status: BookStatus;
    tags: string[];
    onStatusChange?: (id: string, newStatus: BookStatus) => void;
}

export function BookCard(props: BookCardProps) {


    return (
        <div className={`book-card book-card--${props.status}`} >
            <div className='card-content'>
                <h3>{props.title}</h3>
                <p>{props.author}</p>

                <select
                    className="status-select"
                    value={props.status}
                    onChange={(e) => {
                        const newStatus = e.target.value as BookStatus;
                        props.onStatusChange?.(props.id, newStatus)
                    }}
                >
                    <option value="Read">Read</option>
                    <option value="Reading">Reading</option>
                    <option value="Abandoned">Abandoned</option>
                </select>

                <div className='tags'>
                    {props.tags.map(tag => (
                        <span key={tag} className='tag'>
                            {`${tag} `}
                        </span>
                    ))}
                </div>
            </div>

            <button className='delete-card-button'>Delete</button>
        </div>
    );
}