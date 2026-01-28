import { BookCard } from '../BookCard/BookCard';
import './BookList.css';

type BookStatus = 'Read' | 'Reading' | 'Abandoned';

interface Book {
    id: string;
    title: string;
    author: string;
    status: BookStatus;
    tags: string[];
}


interface BookListProps {
    books: Book[];
    onStatusChange: (id: string, newStatus: BookStatus) => void;
}

export function BookList({ books, onStatusChange }: BookListProps) {



    return (
        <section className="book-list">
            {books.map(book => (
                <BookCard
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    status={book.status}
                    tags={book.tags}
                    onStatusChange={onStatusChange}
                />
            ))}
        </section>
    );
}