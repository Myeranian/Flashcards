import React, { useState } from "react";

function DeckForm({ formData, setFormData }) {

    const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
      };

    return (
        <>
        <div class="mb-3">
          <label htmlFor="name" class="form-label">Name:</label>
          <input class="form-control" type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
        </div>
        <div class="mb-3">
        <label htmlFor="description" class="form-label">Description:</label>
          <textarea class="form-control" id="description" name="description" value={formData.description} onChange={handleChange}/>
        </div>
        <br />
        </>
    );
};

export default DeckForm;