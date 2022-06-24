import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function handleError(err) {
    console.warn(err);
}

const ArticleDetail = ({ id, image, title, body, username, is_draft, is_published, articles, setArticles, isAuth, userSubmittedArticles, setUserSubmittedArticles, userArticles, setUserArticles, review, setReview, getReviewArticles, getArticles, deleteArticle }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newImage, setNewImage] = useState(image);
    const [newTitle, setNewTitle] = useState(title);
    const [newBody, setNewBody] = useState(body);
    const [preview, setPreview] = useState(image);
    const [isNewDraft, setIsNewDraft] = useState(is_draft);
    const [isPublished, setIsPublished] = useState(is_published);




    const saveDraft = (
        <div className='flex'>
            <p className='p-1 my-auto'>Save as Draft</p>
            <button type='button' className='h-5 w-5 my-auto ml-3 bg-white rounded-sm' onClick={() => setIsNewDraft(!isNewDraft)} >{isNewDraft ? 'X' : ''}</button>
        </div>
    )

    const savePublish = (
        <div className='flex'>
            <p className='p-1 my-auto'>Publish</p>
            <button type='button' className='h-5 w-5 my-auto ml-3 bg-white rounded-sm' onClick={() => setIsPublished(!isPublished)} >{isPublished ? 'X' : ''}</button>
        </div>
    )



    // const deleteArticle = async (id) => {
    //     const options = {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-CSRFToken': Cookies.get('csrftoken'),
    //         },
    //     }
    //     const response = await fetch(`/api/v1/articles/${id}/`, options).catch(handleError);
    //     if (!response.ok) {
    //         throw new Error('Network response not ok');
    //     }
    //     // const json = await response.json();
    //     // console.log(json)
    //     getReviewArticles();
    // }

    const deleteArticleButton = (
        <div>
            <button type='button' className='p-1 bg-rose-800 text-white rounded-md m-4 font-semibold hover:bg-rose-700' onClick={() => deleteArticle(id)}>Delete</button>
        </div>
    )

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
        if (checkForURL(newImage)) { } else { formData.append('image', newImage) }
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
        console.log(Cookies.get('Authorization'));
        setUserArticles(userArticles.map(i => i.id !== json.id ? i : json))
    }

    const adminSaveChanges = async (id) => {
        const formData = new FormData();
        formData.append('title', newTitle);
        formData.append('body', newBody);
        if (checkForURL(newImage)) { } else { formData.append('image', newImage) }
        formData.append('is_published', isPublished);

        const options = {
            method: 'PUT',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
                'Authorization': Cookies.get('Authorization'),
            },
            body: formData
        }

        const response = await fetch(`api/v1/articles/author/submitted/${id}/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response is not ok')
        }

        const json = await response.json();
        console.log(Cookies.get('Authorization'));
        setReview(review.map(i => i.id !== json.id ? i : json))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        (Cookies.get('isAdmin') === 'admin' && !is_draft) ? adminSaveChanges(id) : saveChanges(id);
        setNewTitle(title)
        setNewBody(body)
        setNewImage(null)
        setIsEditing(false)
    }


    const articlePreview = (
        <li key={id} className='mt-4 p-3 bg-stone-400 rounded shadow shadow-stone-400'>
            {is_draft && <p className='text-red-800 font-extrabold text-3xl'>DRAFT</p>}
            <div className='flex justify-center'>
                <img src={image} alt="a newspaper" width='90%' />
            </div>

            <div className='flex justify-between mt-3'>
                <div className='flex flex-col justify-start items-start w-full my-3'>
                    <h2 className='w-fill font-bold'>{title}</h2>
                    <p className='w-fill font-light'>{username}</p>
                </div>
                {(is_draft || (Cookies.get('isAdmin') === 'admin')) && <button className='bg-neutral-700 h-fit my-3 p-1 text-white rounded-md text-sm hover:bg-neutral-600' onClick={() => setIsEditing(true)}>Edit</button>}
            </div>

            <div className='p-2'>
                <p>{body}</p>
            </div>
        </li>
    )

    const editingView = (
        <li key={id} className='mt-4 p-3 bg-stone-400 rounded shadow shadow-stone-400'>

            <form onSubmit={handleSubmit}>

                <div className='flex flex-col items-center justify-center p-2'>
                    <img src={preview} alt="a newspaper" width='90%' />
                    <input type="file" name='image' onChange={handleImage} className='file:bg-gray-200 file:border-none file:rounded-md file:mt-3 file:hover:bg-gray-300 file:cursor-pointer' />
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
                <div className='flex flex-col'>
                    {!is_draft ? savePublish : saveDraft}
                </div>
                <div className='flex justify-center'>
                    <button type='submit' className='p-1 bg-emerald-600 text-white font-semibold rounded hover:bg-emerald-500 m-4'>Save Changes</button>
                    {(Cookies.get('isAdmin') === 'admin') ? deleteArticleButton : null}
                </div>
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