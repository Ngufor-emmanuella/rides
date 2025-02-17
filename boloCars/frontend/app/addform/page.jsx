'use client';
import ElvisForm from '../components/elvisform';
import '../styles/prado1.css';

const AddForm = () => {
    const handleFormSubmit = (newEntry) => {
        console.log('New entry submitted:', newEntry);
    };

    return (
        <div className="container mt-5">
            <br />
            <br />
            <ElvisForm onFormSubmit={handleFormSubmit} />
            <br />
        </div>
    );
};

export default AddForm;