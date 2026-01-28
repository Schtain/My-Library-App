import './AddBookModal.css'
import { useState } from 'react'


interface AddBookModalProps {
    onAddBook: (title: string, author: string, tags: string[]) => void;
}


export function AddBookModal({ onAddBook }: AddBookModalProps) {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [tagsInput, setTagsInput] = useState('');


    const handleSubmit = () => {
        if (!title.trim || !author.trim()) {
            alert('Please fill in title and author');
            return;
        }

        const tags = tagsInput
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        onAddBook(title, author, tags);

        setTitle('');
        setAuthor('');
        setTagsInput('');
    };




    return (
        <div className='book-modal'>
            <h3>Add new book</h3>


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

            <button onClick={handleSubmit}>Add Book</button>
        </div>
    );
}