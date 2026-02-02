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
            tags: ['sci-fi', 'classic'],
            addedAt: 1769415668462,
        },
        {
            id: 2,
            title: "1984",
            author: 'George Orwell',
            status: 'Read',
            tags: ['dystopia', 'politics'],
            addedAt: 1768810896825,
        },
        {
            id: 3,
            title: "The Hobbit",
            author: 'J. R. R. Tolkien',
            status: 'Reading',
            tags: ['fantasy', 'classic'],
            addedAt: 1768292526256,
        },
        {
            id: 4,
            title: "The Twelve Chairs",
            author: "Ilf and Petrov",
            status: 'Abandoned',
            tags: ['classic', 'comedy'],
            addedAt: 1769674947907,
        }
    ]

    // СОСТОЯНИЯ
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

    const [editingBookId, setEditingBookId] = useState(0);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    // СОСТОЯНИЕ ДЛЯ СОРТИРОВКИ

    const [sortField, setSortField] = useState<'title' | 'author' | 'status' | 'date'>('title');
    const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc');


    const toggleDirection = () => {
        setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    }

    // СОРТИРОВКА КНИГ ИСХОДЯ ИЗ МОДА СОРТИРОВК, дополнение функции getBooksToShow для сортировки филнального массива
    const sortBooks = (books: Book[]) => {
        const sortedBooks = [...books];

        let result;

        switch (sortField) {

            case 'title':
                result = sortedBooks.sort((a, b) =>
                    a.title.localeCompare(b.title));
                break;

            case 'author':
                result = sortedBooks.sort((a, b) =>
                    a.author.localeCompare(b.author));
                break;

            case 'status':
                result = sortedBooks.sort((a, b) =>
                    a.status.localeCompare(b.status));
                break;

            case 'date':
                result = sortedBooks.sort((a, b) =>
                    a.addedAt - b.addedAt);
                break;

            default:
                result = sortedBooks;
        }

        return sortDirection === 'desc' ? result.reverse() : result;

    }

    const reset = () => {
        setSelectedTags([]);
        setSortField('title');
        setSortDirection('desc')
    }

    const getBooksToShow = () => {
        let result = books;

        if (selectedTags.length > 0) {
            result = result.filter(book => {
                return selectedTags.every(tag => {
                    return book.tags.includes(tag);
                })
            })
        }
        return sortBooks(result);
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

    const uniqueTagsArray = Array.from(new Set(books.flatMap(book => book.tags))).sort();

    // ПОДСЧЁТ ТЭГОВ

    const tagsCount = books.reduce((acc, book) => {
        book.tags.forEach(tag => {
            acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
    }, {} as Record<string, number>);

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
        addedAt: number;
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

        const normalizedTags = tags.map(tag => tag.trim().toLowerCase())

        const newBook: Book = {
            id: Date.now(),
            title: title,
            author: author,
            status: 'Reading',
            tags: normalizedTags,
            addedAt: Date.now(),
        }
        setBooks(prevBooks => [...prevBooks, newBook]);
        setIsModalOpen(false); //! ПОТЕНЦИАЛЬНО ПОДЛЕЖИТ УДАЛЕНИЮ
    }

    //ФУНКЦИЯ УДАЛЕНИЯ КНИГИ

    const deleteBook = (id: number) => {
        setBooks(previous => previous.filter(book => book.id !== id))
    }

    // ФУНКЦИЯ ОБНОВЛЕНИЯ КНИГИ

    const editBook = (id: number) => {
        setEditingBookId(id);
        console.log(editingBookId)

        const editingBook = books.find(book => book.id === id);
        setEditingBook(editingBook ? editingBook : null)

        setIsModalOpen(true);
    }

    const updateBook = (updatedBook: Book) => {

        const normalizedTags = updatedBook.tags.map(tag => tag.trim().toLowerCase())

        setBooks(
            books.map(book =>
                book.id === updatedBook.id ? { ...updatedBook, tags: normalizedTags, addedAt: book.addedAt } : book
            )
        );

        setEditingBook(null);
        setIsModalOpen(false);
    }






    return (
        <div className='home'>
            {/*ОКНО ДОБАВЛЕНИЯ КНИГИ */}
            {isModalOpen && <AddBookModal
                bookToEdit={editingBook ? editingBook : null}
                onAddBook={addBook}
                onUpdateBook={updateBook}
            />}
            {isModalOpen && (<Overlay onClick={() => setIsModalOpen(false)} />)}

            <Header onMenuClick={() => setIsSidebarOpen(true)} onButtonClick={() => setIsModalOpen(true)} />


            {/*САЙДДБАР С МЕНЮ */}
            {isSidebarOpen && (<Sidebar
                selectedTags={selectedTags}
                onCheckedTag={onCheckedTag}
                uniqueTagsArray={uniqueTagsArray} onClose={() => setIsSidebarOpen(false)}
                onReset={reset}

                sortField={sortField}
                sortDirection={sortDirection}
                onChangeSortField={setSortField}
                onToggleSortDirection={toggleDirection}
                tagsCount={tagsCount}

            />)}
            {isSidebarOpen && (<Overlay onClick={() => setIsSidebarOpen(false)} />)}

            {/*СПИСОК КНИГ (ЛИСТ) ХРАНЯЩИЙ КАРТОЧКИ С КНИГАМИ */}
            <main className="home__content">
                <BookList
                    books={getBooksToShow()}
                    onStatusChange={handleStatusChange}
                    onDeleteBook={deleteBook}
                    onEditBook={editBook}
                />
            </main>
            {/* <AddBookButton /> */}
        </div>
    );
}