import './Home.css'
import { BookList } from '../BookList/BookList';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { useState } from 'react';
import { AddBookModal } from '../AddBookModal/AddBookModal';
import { Overlay } from '../Overlay/Overlay';
//import { AddBookButton } '../AddBookButton/AddBookButton';


export function Home() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [books, setBooks] = useState<Book[]>([
        {
            id: '1',
            title: "Dune",
            author: "Frank Herbert",
            status: "Read",
            tags: ['Sci-Fi', 'classic']
        },
        {
            id: '2',
            title: "1984",
            author: 'George Orwell',
            status: 'Read',
            tags: ['dystopia', 'politics']
        },
        {
            id: '3',
            title: "The Hobbit",
            author: 'J. R. R. Tolkien',
            status: 'Reading',
            tags: ['fantasy', 'classic']
        },
        {
            id: '4',
            title: "The Twelve Chairs",
            author: "Ilf and Petrov",
            status: 'Abandoned',
            tags: ['classic', 'comedy']
        }
    ]);

    type BookStatus = 'Read' | 'Reading' | 'Abandoned';

    interface Book {
        id: string;
        title: string;
        author: string;
        status: BookStatus;
        tags: string[];
    }

    // ФУНКЦИИ

    //ФУНКЦИЯ СМЕНЫ СТАТУСА КНИГИ
    const handleStatusChange = (id: string, newStatus: BookStatus) => {
        setBooks(prevBooks =>
            prevBooks.map(book =>
                book.id === id ? { ...book, status: newStatus } : book
            )
        );
    };

    //ФКНЦИЯ ДОБАВЛЕНИЯ КНИГИ
    const addBook = (title: string, author: string, tags: string[]) => {
        const newBook: Book = {
            id: Date.now().toString(),
            title: title,
            author: author,
            status: 'Reading',
            tags: tags
        }

        setBooks(prevBooks => [...prevBooks, newBook]);
        setIsModalOpen(false); //! ПОТЕНЦИАЛЬНО ПОДЛЕЖИТ УДАЛЕНИЮ
    }







    return (
        <div className='home'>
            {isModalOpen && <AddBookModal onAddBook={addBook} />}
            {isModalOpen && (<Overlay onClick={() => setIsModalOpen(false)} />)}

            <Header onMenuClick={() => setIsSidebarOpen(true)} onButtonClick={() => setIsModalOpen(true)} />



            {isSidebarOpen && (<Sidebar onClose={() => setIsSidebarOpen(false)} />)}
            {isSidebarOpen && (<Overlay onClick={() => setIsSidebarOpen(false)} />)}
            <main className="home__content">
                <BookList
                    books={books}
                    onStatusChange={handleStatusChange}
                />
            </main>
            {/* <AddBookButton /> */}
        </div>
    );
}