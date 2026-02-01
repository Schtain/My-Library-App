import { BookCard } from '../BookCard/BookCard';
import './BookList.css';

type BookStatus = 'Read' | 'Reading' | 'Abandoned';

interface Book {
    id: number;
    title: string;
    author: string;
    status: BookStatus;
    tags: string[];
}


interface BookListProps {
    books: Book[];
    onStatusChange: (id: number, newStatus: BookStatus) => void;
    onDeleteBook: (id: number) => void;
    onEditBook: (id: number) => void;
}

export function BookList({ books, onStatusChange, onDeleteBook, onEditBook }: BookListProps) {



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
                    onDeleteBook={onDeleteBook}
                    onEditBook={onEditBook}
                />
            ))}
        </section>
    );
}