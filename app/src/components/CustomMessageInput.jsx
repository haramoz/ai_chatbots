import { MessageInput } from '@chatscope/chat-ui-kit-react';
import FileUploadButton from './FileUploadButton';
import PropTypes from 'prop-types';


const CustomMessageInput = ({ onSend, onFileUpload }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <MessageInput placeholder="Type message here" onSend={onSend} />
      <FileUploadButton onFileUpload={onFileUpload} />
    </div>
  );
};

CustomMessageInput.propTypes = {
    onSend: PropTypes.func.isRequired,
    onFileUpload: PropTypes.func.isRequired
  };

export default CustomMessageInput;
