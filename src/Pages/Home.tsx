import '..App.css';
import { BookList} from '../BookList/BookList';
import { Sidebar} from '../Sidebar/Sidebar';
import { AddBookButton} '../AddBookButton/AddBookButton';


export function Home() {
    return (
        <div className='app-layout'>
            <Sidebar />
            <BookList />
            <AddBookButton />
        </div>
    );
}