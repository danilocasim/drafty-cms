import { Editor } from '@tinymce/tinymce-react';

function ContentEditor({ editorRef, content }) {
  return (
    <Editor
      apiKey='ng2kh043o0lxb0npjv2syptz0ld38dj0y8ny4nlnlnwf0bp7'
      onInit={(_evt, editor) => (editorRef.current = editor)}
      initialValue={content}
      init={{
        height: 400,
        menubar: false,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount',
          'codesample',
        ],
        codesample_global_prismjs: true,

        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help | codesample',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
}

export default ContentEditor;
