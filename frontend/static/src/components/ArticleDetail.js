import { useState } from 'react';
import Cookies from 'js-cookie';

function handleError(err) {
    console.warn(err);
}

const ArticleDetail = ({ id, image, title, body, username, is_draft, is_published, articles, setArticles, isAuth, userSubmittedArticles, setUserSubmittedArticles, userArticles, setUserArticles }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newImage, setNewImage] = useState(image);
    const [newTitle, setNewTitle] = useState(title);
    const [newBody, setNewBody] = useState(body);
    const [preview, setPreview] = useState(image);
    const [isNewDraft, setIsNewDraft] = useState(is_draft);


    const handleImage = e => {
        const file = e.target.files[0];
        setNewImage(file)

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const checkForURL = (i) => {
        const a = document.createElement('a');
        a.href = i;
        return (a.host && a.host !== window.location.host);
    }

    const saveChanges = async (id) => {
        // e.preventDefault();
        const formData = new FormData();
        formData.append('title', newTitle);
        formData.append('body', newBody);
    if (checkForURL(image)) {} else {formData.append('image', newImage)}
        formData.append('is_draft', isNewDraft);

        const options = {
            method: 'PUT',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
                'Authorization': Cookies.get('Authorization'),
            },
            body: formData
        }

        const response = await fetch(`api/v1/articles/${id}/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response is not ok')
        }

        const json = await response.json();
        console.log(userArticles);
        setUserArticles(userArticles.map(i => i.id !== json.id ? i : json))
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
            {is_draft && <p className='text-red-600 font-extrabold'>DRAFT</p>}
            <div className='flex justify-center'>
                <img src={image} alt="a newspaper" width='90%' />
            </div>

            <div className='flex justify-between mt-3'>
                <div className='flex flex-col justify-start items-start w-full my-3'>
                    <h2 className='w-fill font-bold'>{title}</h2>
                    <p className='w-fill font-light'>{username}</p>
                </div>
                {!is_published && ( is_draft && <button className='bg-neutral-700 h-fit my-3 p-1 text-white rounded-md text-sm hover:bg-neutral-600' onClick={() => setIsEditing(true)}>Edit</button>)}
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
                <div className='flex'>
                    <p className='p-1 my-auto'>Save as Draft</p>
                    <button type='button' className='h-5 w-5 my-auto ml-3 bg-white rounded-sm' onClick={() => setIsNewDraft(!isNewDraft)} >{isNewDraft ? 'X' : ''}</button>
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