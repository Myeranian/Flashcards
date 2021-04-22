import React, { useState, useEffect } from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";
/* import DeckForm from "./DeckForm"; */

function EditDeck() {
  const history = useHistory();
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
    
      const submitHandler = (event) => {
        event.preventDefault();
        async function update() {
          await updateDeck(deck);
        }
        update();
        history.go(0);
      };

      const cancelHandler = (event) => {
        event.preventDefault();
        history.go(-1);
    };

    const handleChange = ({ target }) => {
      setDeck({
        ...deck,
        [target.name]: target.value,
      });
    };

    useEffect(() => {
        async function getDeck() {
          const data = await readDeck(deckId);
          setDeck(data);
        }
        getDeck();
        
    }, [deckId]);

    if (!deck) {
      return (
        <p>Loading...</p>
      );
    }
    else { 
    return (
        <>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                <li class="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li class="breadcrumb-item active" aria-current="page">Edit Deck</li>
            </ol>
        </nav>
        <h1>Edit Deck: {deck.name}</h1>
        <form onSubmit={submitHandler}>
          <div class="mb-3">
            <label htmlFor="name" class="form-label">Name:</label>
            <input class="form-control" placeholder={deck.name} type="text" id="name" name="name" value={deck.name} onChange={handleChange}/>
          </div>
          <div class="mb-3">
            <label htmlFor="description" class="form-label">Description:</label>
            <textarea class="form-control" placeholder={deck.description} id="description" name="description" value={deck.description} onChange={handleChange}/>
          </div>
          <br />
          <button class="btn btn-primary" type="submit">Submit</button>
          <button class="btn btn-secondary" type="button" onClick={cancelHandler}>Cancel</button>
        </form>
        </>
    );
  }
};

export default EditDeck;