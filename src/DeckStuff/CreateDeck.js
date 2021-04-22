import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";
import DeckForm from "./DeckForm";

function CreateDeck() {
  const history = useHistory();
  const initialFormState = {
    "name": "",
    "description": ""
  };
  const [formData, setFormData] = useState({...initialFormState });

  const submitHandler = (event) => {
    event.preventDefault();
    createDeck(formData);
    setFormData({ ...initialFormState });
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.go(-1);
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><Link to="/">Home</Link></li>
            <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <form onSubmit={submitHandler}>
        <DeckForm formData={formData} setFormData={setFormData} />
        <button class="btn btn-primary" type="submit" >Submit</button>
        <button class="btn btn-secondary" type="button" onClick={cancelHandler}>Cancel</button>
      </form>
      </>
  );
};

export default CreateDeck;