import React, { useState } from "react";
import {Link, useHistory} from "react-router-dom";
 
function CardForm({ card, setCard }) {
    
    const handleChange = ({ target }) => {
        setCard({
          ...card,
          [target.name]: target.value,
        });
      };

    return (
        <>
        <div class="mb-3">
          <label class="form-label" htmlFor="front">Front:</label>
          <textarea class="form-control" id="front" name="front" value={card.front} onChange={handleChange}/>
        </div>
      <div class="mb-3">
        <label class="form-label" htmlFor="back">Back:</label>
        <textarea class="form-control" id="back" name="back" value={card.back} onChange={handleChange}/>
      </div>
      <br />
        </>
    );
};

export default CardForm;