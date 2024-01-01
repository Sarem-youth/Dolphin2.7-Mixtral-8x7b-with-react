import React from 'react';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, settings, updateSettings, closeModal }) => {
  if (!isOpen) return null;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    updateSettings(name, value);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Settings</h2>
        <form>
          {/* Repeat for each setting, e.g., max_new_tokens, repeat_penalty, etc. */}
          <div className="form-group">
            <label htmlFor="system_prompt">System Prompt:</label>
            <textarea
              id="system_prompt"
              name="system_prompt"
              value={settings.system_prompt}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="prompt_template">Prompt Template:</label>
            <textarea
              id="prompt_template"
              name="prompt_template"
              value={settings.prompt_template}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="max_new_tokens">Max New Tokens:</label>
            <input
              type="number"
              id="max_new_tokens"
              name="max_new_tokens"
              value={settings.max_new_tokens}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="repeat_penalty">Repeat Penalty:</label>
            <input
              type="number"
              id="repeat_penalty"
              name="repeat_penalty"
              value={settings.repeat_penalty}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="temperature">Temperature:</label>
            <input
              type="number"
              id="temperature"
              name="temperature"
              value={settings.temperature}
              onChange={handleInputChange}
            />
          </div>
          
          {/* ... other settings ... */}
        </form>
        <button className="close-button" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default SettingsModal;
