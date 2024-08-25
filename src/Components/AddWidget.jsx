import React, { useState } from 'react';

const AddWidget = ({ id, categories, setCategories }) => {
  const [input, setInput] = useState({ widgetName: '', widgetText: '' });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page

    // Find the category by id and update its widgets
    setCategories((prevCategories) =>
      prevCategories.map((category, index) =>
        index === id
          ? {
              ...category,
              widgets: [
                ...category.widgets,
                {
                  name: input.widgetName,
                  text: input.widgetText,
                  data: [], // Initial empty data or customize as needed
                },
              ],
            }
          : category
      )
    );

    setInput({ widgetName: '', widgetText: '' }); // Clear input fields after submission
  };

  return (
    <div>
      <h3>Add New Widget</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="widgetName"
          value={input.widgetName}
          onChange={handleChange}
          placeholder="Widget Name"
          required
        />
        <input
          type="text"
          name="widgetText"
          value={input.widgetText}
          onChange={handleChange}
          placeholder="Widget Text"
          required
        />
        <button type="submit">Add Widget</button>
      </form>
    </div>
  );
};

export default AddWidget;
