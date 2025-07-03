// client/src/components/PostForm.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function PostForm({ initialValues, onSubmit, isEditing = false }) {
  const formik = useFormik({
    initialValues: initialValues || { title: '', content: '', image: null },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('content', values.content);
      if (values.image) {
        formData.append('image', values.image);
      }
      onSubmit(formData);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="text-red-500 text-xs italic mt-1">{formik.errors.title}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
        <textarea
          id="content"
          name="content"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.content}
          rows="8"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {formik.touched.content && formik.errors.content ? (
          <div className="text-red-500 text-xs italic mt-1">{formik.errors.content}</div>
        ) : null}
      </div>

      <div className="mb-6">
        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image (optional)</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={(event) => {
            formik.setFieldValue("image", event.currentTarget.files[0]);
          }}
          onBlur={formik.handleBlur}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {isEditing ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
}
export default PostForm;