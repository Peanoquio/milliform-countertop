import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.css';

const CustomSelect = ({ label, options, value, onChange, placeholder = 'Select…' }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const selectedOption = options.find((o) => o.value === value);
  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-select">
      {showDropdown && (
        <div
          className="custom-select-backdrop"
          onClick={() => setShowDropdown(false)}
        />
      )}
      <label className="field">
        <span>{label}</span>
        <div className="custom-select-wrapper" ref={dropdownRef}>
          <button
            type="button"
            className="custom-select-button"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label={`Select ${label.toLowerCase()}`}
          >
            <span className="select-value">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <span className="select-arrow">▼</span>
          </button>

          {showDropdown && (
            <div className="custom-select-dropdown">
              <input
                type="text"
                className="custom-select-search"
                placeholder={`Search ${label.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <div className="custom-select-list">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`custom-select-option ${
                        option.value === value ? 'active' : ''
                      }`}
                      onClick={() => {
                        onChange(option.value);
                        setShowDropdown(false);
                        setSearchTerm('');
                      }}
                    >
                      {option.label}
                    </button>
                  ))
                ) : (
                  <div className="custom-select-empty">No options found</div>
                )}
              </div>
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default CustomSelect;
