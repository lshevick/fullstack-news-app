import { useState } from 'react';
import Cookies from 'js-cookie';

function handleError(err) {
    console.warn(err);
}

const ArticleDetail = ({ id, image, title, body, username, articles, setArticles }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newImage, setNewImage] = useState(image);
    const [newTitle, setNewTitle] = useState(title);
    const [newBody, setNewBody] = useState(body);
    const [preview, setPreview] = useState(image);


    const handleImage = e => {
        const file = e.target.files[0];
        setNewImage(file)

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const saveChanges = async (id) => {
        // e.preventDefault();
        const formData = new FormData();
        formData.append('title', newTitle);
        formData.append('body', newBody);
        formData.append('image', newImage);

        const options = {
            method: 'PUT',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData
        }

        const response = await fetch(`api/v1/articles/${id}/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response is not ok')
        }

        const json = await response.json();

        setArticles(articles.map(i => i.id !== json.id ? i : json))
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        saveChanges(id);
        setNewTitle(title)
        setNewBody(body)
        setNewImage(null)
        setIsEditing(false)
    }


    const articlePreview = (
        <li key={id} className='mt-4 p-3 bg-neutral-500'>
            <div className='flex justify-center'>
                <img src={image} alt="a newspaper" width='90%' />
            </div>

            <div className='flex justify-between mt-3'>
                <div className='flex flex-col justify-start items-start w-full my-3'>
                    <h2 className='w-fill font-bold'>{title}</h2>
                    <p className='w-fill font-light'>{username}</p>
                </div>
                <button className='bg-neutral-700 h-fit my-3 p-1 text-white rounded-md text-sm hover:bg-neutral-600' onClick={() => setIsEditing(true)}>Edit</button>
            </div>

            <div className='p-2'>
                <p>{body}</p>
            </div>
        </li>
    )

    const editingView = (
        <li key={id} className='mt-4 p-3 bg-neutral-500'>

            <form onSubmit={handleSubmit}>

            <div className='flex flex-col items-center justify-center p-2'>
                <img src={preview} alt="a newspaper" width='90%' />
                <input type="file" name='image' onChange={handleImage} />
            </div>

            <div className='flex justify-between mt-3'>
                <div className='flex flex-col justify-start items-start w-full my-3'>
                    <input type="text" name='newtitle' id='newtitle' value={newTitle} autoComplete='off' onChange={(e) => setNewTitle(e.target.value)} />
                    <p className='w-fill font-light'>{username}</p>
                </div>
                <button className='bg-neutral-700 h-fit my-3 p-1 text-white rounded-md text-sm hover:bg-neutral-600' onClick={() => setIsEditing(false)}>Cancel</button>
            </div>

            <div className='p-2'>
                <p>{body}</p>
                <input type="text" name="body" id="body" value={newBody} onChange={(e) => setNewBody(e.target.value)} />
            </div>
            <button type='submit' className='p-1 bg-emerald-600 text-white font-semibold rounded hover:bg-emerald-500'>Save Changes</button>
            </form>
        </li>
    )

    return (
        <>
        {isEditing ? editingView : articlePreview}
        </>
    );
}

export default ArticleDetail