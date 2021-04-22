import React, { useState, useEffect } from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";
import DeckForm from "./DeckForm";

function EditDeck() {
  const history = useHistory();
    const [deck, setDeck] = useState([]);
    const { deckId } = useParams();
    const initialFormState = {
        "name": deck.name,
        "description": deck.description
      };
      const [formData, setFormData] = useState({...initialFormState });
    
      const submitHandler = (event) => {
        event.preventDefault();
        updateDeck(formData);
        setFormData({ ...initialFormState });
      };

      const cancelHandler = (event) => {
        event.preventDefault();
        history.go(-1);
    };

    useEffect(() => {
        async function getDeck() {
          const data = await readDeck(deckId);
          setDeck(data);
        }
        getDeck();
    }, [deckId]);

    return (
        <>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                <li class="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li class="breadcrumb-item active" aria-current="page">Edit Deck</li>
            </ol>
        </nav>
        <h1>Edit Deck</h1>
        <form onSubmit={submitHandler}>
        <DeckForm formData={formData} setFormData={setFormData}/>
        <button class="btn btn-primary" type="submit">Submit</button>
        <button class="btn btn-secondary" type="button" onClick={cancelHandler}>Cancel</button>
        </form>
        </>
    );
};

export default EditDeck;