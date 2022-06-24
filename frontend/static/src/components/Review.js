import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ArticleDetail from './ArticleDetail';

function handleError(err) {
    console.warn(err);
}

const Review = () => {
    const [review, setReview] = useState([]);

    const getReviewArticles = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        }
        const response = await fetch(`/api/v1/articles/admin_review/`, options).catch(handleError);
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        const json = await response.json();
        setReview(json);
    }

    useEffect(() => {
        getReviewArticles()
    }, [])

    return (
        <div className='p-4 py-20 flex flex-col items-center min-h-screen'>
            <div className='md:w-1/3 w-5/6'>
                <ul>
                    {review.map(item => 
                        <ArticleDetail key={item.id} {...item} review={review} setReview={setReview} getReviewArticles={getReviewArticles} />
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Review