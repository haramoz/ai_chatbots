import PropTypes from 'prop-types';
import { Button } from '@chatscope/chat-ui-kit-react';

const FileUploadButton = ({ onClick }) => {
  let fileReader;

  const handleFileRead = (e) => {
    const content = fileReader.result;
    // When the read is complete, call the function with the file content
    onClick(content);
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <Button secondary>
      <input
        type="file"
        id="file"
        accept=".txt"
        onChange={e => handleFileChosen(e.target.files[0])}
        style={{display: "none"}}
      />
      <label htmlFor="file">Upload File</label>
    </Button>
  );
};

FileUploadButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default FileUploadButton;
