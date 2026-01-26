type BookStatus = 'read' | 'reading' | 'abandoned';

interface BookCardProps {
    title: string;
    author: string;
    status: BookStatus;
    tags: string[];
}





export function BookCard(props: BookCardProps) {




    return (
        <div className="book-card">
            <h3>{props.title}</h3>
            <p>{props.author}</p>

            <span className={`status status--${props.status}`}>
                {props.status}
            </span>

            <div className='tags'>
                {props.tags.map(tag => (
                    <span key={tag} className='tag'>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}