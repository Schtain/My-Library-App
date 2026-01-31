import './Home.css'
import { BookList } from '../BookList/BookList';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { useState, useEffect } from 'react';
import { AddBookModal } from '../AddBookModal/AddBookModal';
import { Overlay } from '../Overlay/Overlay';
//import { AddBookButton } '../AddBookButton/AddBookButton';


export function Home() {

    const exampleBooks = [
        {
            id: 1,
            title: "Dune",
            author: "Frank Herbert",
            status: "Read",
            tags: ['Sci-Fi', 'classic']
        },
        {
            id: 2,
            title: "1984",
            author: 'George Orwell',
            status: 'Read',
            tags: ['dystopia', 'politics']
        },
        {
            id: 3,
            title: "The Hobbit",
            author: 'J. R. R. Tolkien',
            status: 'Reading',
            tags: ['fantasy', 'classic']
        },
        {
            id: 4,
            title: "The Twelve Chairs",
            author: "Ilf and Petrov",
            status: 'Abandoned',
            tags: ['classic', 'comedy']
        }
    ]
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [books, setBooks] = useState<Book[]>(() => {
        try {
            const savedBooks = localStorage.getItem('books');
            return savedBooks ? JSON.parse(savedBooks) : exampleBooks; //! ЗАМЕНИТЬ НА ПУСТОЙ МАССИВ
        } catch (error) {
            console.log('Fail to receive data from local storage: ', error);
            return exampleBooks; //! ЗАМЕНИТЬ НА ПУСТОЙ МАССИВ
        }
    });

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const getBooksToShow = () => {
        if (selectedTags.length === 0) {
            return books;
        }
        return books.filter(book => {
            return selectedTags.every(tag => {
                return book.tags.includes(tag);
            })
        })
    }
    // ДОБАВЛЕНИЕ ТЭГОВ В СПИСОК ВЫБРАННЫХ ТЭГОВ ДЛЯ ПРОВЕРКИ
    const onCheckedTag = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedTags(previous => [...previous, event.target.value])
        } else {
            setSelectedTags(previous => previous.filter(tag => tag !== event.target.value))
        }
    };


    // ПОЛУЧЕНИЕ И ОБРАБОТКА ТЭГОВ

    const uniqueTagsArray = Array.from(new Set(books.flatMap(book => book.tags)));






    // СХРАННЕНИЕ КНИГ В ХРАНИЛИЩЕ

    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books))
        console.log('Book list has beend saved to local storage')

    }, [books]);


    type BookStatus = 'Read' | 'Reading' | 'Abandoned';

    interface Book {
        id: number;
        title: string;
        author: string;
        status: BookStatus;
        tags: string[];
    }

    // ФУНКЦИИ

    //ФУНКЦИЯ СМЕНЫ СТАТУСА КНИГИ
    const handleStatusChange = (id: number, newStatus: BookStatus) => {
        setBooks(prevBooks =>
            prevBooks.map(book =>
                book.id === id ? { ...book, status: newStatus } : book
            )
        );
    };

    //ФКНЦИЯ ДОБАВЛЕНИЯ КНИГИ
    const addBook = (title: string, author: string, tags: string[]) => {
        const newBook: Book = {
            id: Date.now(),
            title: title,
            author: author,
            status: 'Reading',
            tags: tags
        }
        setBooks(prevBooks => [...prevBooks, newBook]);
        setIsModalOpen(false); //! ПОТЕНЦИАЛЬНО ПОДЛЕЖИТ УДАЛЕНИЮ
    }

    //ФУНКЦИЯ УДАЛЕНИЯ КНИГИ

    const deleteBook = (id: number) => {
        setBooks(previous => previous.filter(book => book.id !== id))
    }






    return (
        <div className='home'>
            {/*ОКНО ДОБАВЛЕНИЯ КНИГИ */}
            {isModalOpen && <AddBookModal onAddBook={addBook} />}
            {isModalOpen && (<Overlay onClick={() => setIsModalOpen(false)} />)}

            <Header onMenuClick={() => setIsSidebarOpen(true)} onButtonClick={() => setIsModalOpen(true)} />


            {/*САЙДДБАР С МЕНЮ */}
            {isSidebarOpen && (<Sidebar onCheckedTag={onCheckedTag} uniqueTagsArray={uniqueTagsArray} onClose={() => setIsSidebarOpen(false)} />)}
            {isSidebarOpen && (<Overlay onClick={() => setIsSidebarOpen(false)} />)}

            {/*СПИСОК КНИГ (ЛИСТ) ХРАНЯЩИЙ КАРТОЧКИ С КНИГАМИ */}
            <main className="home__content">
                <BookList
                    books={getBooksToShow()}
                    onStatusChange={handleStatusChange}
                    onDeleteBook={deleteBook}
                />
            </main>
            {/* <AddBookButton /> */}
        </div>
    );
}