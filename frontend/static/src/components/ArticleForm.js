import { useState } from "react";
import Cookies from "js-cookie";
import { ImCheckmark } from "react-icons/im";

function handleError(err) {
  console.warn(err);
}

const ArticleForm = ({ articles, userArticles, setUserArticles, setDataChanged }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [isDraft, setIsDraft] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("image", image);
    formData.append("is_draft", isDraft);

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    const response = await fetch("api/v1/articles/author/", options).catch(
      handleError
    );

    if (!response.ok) {
      throw new Error("Network response is not ok");
    }

    const json = await response.json();

    setUserArticles([...userArticles, json]);
    setTitle("");
    setBody("");
    setIsDraft(false);
    setImage(null);
    setDataChanged((prev) => !prev);
  };

  return (
    <div className="h-screen my-10 flex flex-col justify-start items-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-300 p-3 flex flex-col justify-center items-center w-5/6 rounded-md md:w-1/3 lg:w-full"
      >
        <h2 className="my-5 p-2 bg-stone-500 w-2/3 text-lg font-bold rounded-md">
          Create a New Article
        </h2>

        <label htmlFor="title"></label>
        <input
          className="m-1 p-1 w-2/3 bg-neutral-100 text-black rounded-md"
          type="text"
          id="title"
          name="title"
          autoComplete="off"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <label htmlFor="body"></label>
        <input
          className="m-1 p-1 w-2/3 bg-neutral-100 text-black rounded-md"
          type="text"
          name="body"
          id="body"
          value={body}
          autoComplete="off"
          onChange={(e) => setBody(e.target.value)}
          placeholder="Article Body"
        />

        <div>
          <input
            className="m-1 p-1 bg-stone-400 w-5/6 rounded-md file:rounded file:border-none file:bg-sky-600 file:hover:bg-sky-500 file:cursor-pointer"
            type="file"
            name="photo"
            id="photo"
            onChange={handleImage}
          />
          {image && <img src={preview} alt="newspaper img" width="25%" />}
        </div>
        <div className="flex">
          <p className="p-1 my-auto">Save as Draft</p>
          <button
            type="button"
            className="h-5 w-5 p-1 my-auto ml-3 bg-white rounded-sm"
            onClick={() => setIsDraft(!isDraft)}
          >
            {isDraft ? <ImCheckmark /> : ""}
          </button>
        </div>
        <button
          type="submit"
          className=" mt-3 p-2 bg-emerald-700 hover:bg-emerald-600 rounded-md font-bold"
        >
          Submit Article
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
