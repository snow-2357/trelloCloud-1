import { useState } from 'react';

import "./index.css"

const TaskForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dueDate: '',
    startDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiKey = '8574be4441e6081fa440b7497a5e7b96';
    const token = 'ATTA327aa3550ce838d526a0e94d6c3255e7a362395c7ce72258f7dc5964ace822ddE022C69D';
    const listId = '65433ab511b38449c0322d2d';

    const apiUrl = `https://api.trello.com/1/cards?idList=${listId}&key=${apiKey}&token=${token}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          desc: formData.description,
          due:formData.dueDate,
          start:formData.startDate
        }),
      });
  
      if (response.ok) {
        const cardData = await response.json();
        console.log('Trello card created:', cardData);
      } else {
        console.error('Error creating Trello card:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error creating Trello card:', error);
    }
  };

  return (
    <div className="task-form">
      <h2>Create New Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TaskForm;
