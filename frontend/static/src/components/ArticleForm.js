import { useState } from 'react';
import Cookies from 'js-cookie'

function handleError(err) {
    console.warn(err);
}

const ArticleForm = ({ articles, setArticles }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');


    const handleImage = e => {
        const file = e.target.files[0];
        setImage(file)

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('image', image);

        const options = {
            method: 'POST',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData
        }

        const response = await fetch('api/v1/articles/', options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response is not ok')
        }

        const json = await response.json();

        setArticles([...articles, json])
        setTitle('')
        setBody('')
        setImage(null)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title"></label>
            <input type="text" id='title' name='title' autoComplete='off' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />

            <label htmlFor="body"></label>
            <input type="text" name='body' id='body' value={body} autoComplete='off' onChange={(e) => setBody(e.target.value)} placeholder='Article Body' />
            <div>
                <input type="file" name='photo' id='photo' onChange={handleImage} />
                {image && <img src={preview} alt='newspaper img' />}
            </div>
            <button type='submit'>Submit Article</button>
        </form>
    );
}

export default ArticleForm