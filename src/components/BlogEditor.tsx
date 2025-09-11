'use client';

import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

interface BlogEditorProps {
  content: string;
  onChange: (content: string) => void;
  height?: number;
}

export default function BlogEditor({ content, onChange, height = 400 }: BlogEditorProps) {
  const editorRef = useRef<{ [key: string]: unknown }>(null);

  return (
    <div className="border border-gray-300 rounded-md">
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={content}
        onEditorChange={onChange}
        init={{
          height: height,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'image | link | removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          branding: false,
          promotion: false,
          images_upload_handler: async (blobInfo: { blob: () => Blob; filename: () => string }) => {
            try {
              const formData = new FormData();
              formData.append('file', blobInfo.blob(), blobInfo.filename());
              formData.append('type', 'blog');

              const response = await fetch('/api/upload/image', {
                method: 'POST',
                body: formData,
              });

              const result = await response.json();

              if (result.success) {
                return result.url;
              } else {
                throw new Error(result.error || 'Upload failed');
              }
            } catch (error) {
              console.error('Image upload error:', error);
              throw error;
            }
          },
          automatic_uploads: true,
          file_picker_types: 'image',
          file_picker_callback: function (callback: (url: string, meta?: unknown) => void, value: unknown, meta: { filetype: string }) {
            if (meta.filetype === 'image') {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');
              
              input.onchange = function () {
                const file = (this as HTMLInputElement).files?.[0];
                if (file) {
                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('type', 'blog');

                  fetch('/api/upload/image', {
                    method: 'POST',
                    body: formData,
                  })
                  .then(response => response.json())
                  .then(result => {
                    if (result.success) {
                      callback(result.url, { alt: file.name });
                    } else {
                      alert('Upload failed: ' + (result.error || 'Unknown error'));
                    }
                  })
                  .catch(error => {
                    console.error('Upload error:', error);
                    alert('Upload failed. Please try again.');
                  });
                }
              };
              
              input.click();
            }
          },
        }}
      />
    </div>
  );
}
