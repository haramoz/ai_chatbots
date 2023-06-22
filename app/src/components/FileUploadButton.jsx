import PropTypes from 'prop-types';
import { Button } from '@chatscope/chat-ui-kit-react';

const FileUploadButton = ({ onFileUpload }) => {
  let fileReader;

  const handleFileRead = () => {
    const fileContent = fileReader.result;
    onFileUpload(fileContent);
  };
  

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <Button >
      <input
        type="file"
        id="file"
        accept=".txt"
        onChange={(e) => handleFileChosen(e.target.files[0])}
        style={{ display: 'none' }}
      />
      <label htmlFor="file">Upload File</label>
    </Button>
  );
};

FileUploadButton.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};

export default FileUploadButton;
