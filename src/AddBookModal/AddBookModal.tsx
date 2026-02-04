import './AddBookModal.css'
import { useEffect, useState } from 'react'

type BookStatus = 'Read' | 'Reading' | 'Abandoned';

interface Book {
    id: number;
    title: string;
    author: string;
    status: BookStatus;
    tags: string[];
    addedAt: number;
}



interface AddBookModalProps {
    onAddBook: (title: string, author: string, tags: string[]) => void;
    bookToEdit: Book | null;
    onUpdateBook: (book: Book) => void;
}


export function AddBookModal({ onAddBook, bookToEdit, onUpdateBook }: AddBookModalProps) {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [tagsInput, setTagsInput] = useState('');


    useEffect(() => {
        if (bookToEdit) {
            setTitle(prev => prev !== bookToEdit.title ? bookToEdit.title : prev);
            setAuthor(prev => prev !== bookToEdit.author ? bookToEdit.author : prev);
            setTagsInput(prev =>
                prev !== bookToEdit.tags.join(',') ? bookToEdit.tags.join(',') : prev
            );
        } else {
            setTitle('');
            setAuthor('');
            setTagsInput('');
        }

    }, [bookToEdit]);

    const handleSubmit = () => {

        if (!title.trim() || !author.trim()) {
            alert('Please fill in title and author');
            return;
        }

        const tags = tagsInput
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        if (bookToEdit) {
            const updatedBook: Book = {
                ...bookToEdit,
                title,
                author,
                tags
            };

            onUpdateBook(updatedBook);
            setTitle('');
            setAuthor('');
            setTagsInput('');
            return
        }


        onAddBook(title, author, tags);

        setTitle('');
        setAuthor('');
        setTagsInput('');
    };




    return (
        <div className='book-modal'>
            <h3>{bookToEdit ? 'Update book' : 'Add new book'}</h3>


            <input type='text'
                className='book-title-input'
                placeholder='Book title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                className='book-author-input'
                placeholder='Author'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />

            <input
                type="text"
                className='tags-input'
                placeholder='Tags (comma separated)'
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
            />

            <textarea
                className='book-comment'
                placeholder='Comment (not used yet)'
            ></textarea>

            <button onClick={handleSubmit}>{bookToEdit ? 'Update' : 'Add book'}</button>
        </div>
    );
}
