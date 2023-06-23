import PropTypes from 'prop-types';
import { Button } from '@chatscope/chat-ui-kit-react';

/*
const handleInputUpload = (fileContent) => {
    console.log("Url uploaded!")
    console.log(fileContent);
    
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
  
    if (urlPattern.test(fileContent)) {
      var scrappedJsonString = fetchScrapedData(fileContent);
      setSystemMessage({ role: "system", content: scrappedJsonString });
    } else {
      console.log("Invalid URL");
    }
  };
   */

const FileUploadButton = ({ onFileUpload, buttonText }) => {
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
    <Button>
      <input
        type="file"
        id="file"
        accept=".txt"
        onChange={(e) => handleFileChosen(e.target.files[0])}
        style={{ display: 'none' }}
      />
      <label htmlFor="file">{buttonText}</label>
    </Button>
  );
};

FileUploadButton.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default FileUploadButton;