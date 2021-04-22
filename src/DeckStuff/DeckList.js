import React, { useEffect, useState } from "react";
import { listDecks, deleteDeck } from "../utils/api/index";
import {Link} from "react-router-dom";

function deleteHandler(deckId) {
  if (window.confirm("Are you sure you want to delete this deck? It can't be recovered after deleting.")) {
    deleteDeck(deckId);
  }
};

function DeckList() {
  const [deckList, setDeckList] = useState([]);
 
  useEffect(() => {
    async function getDecks() {
      try{
        const data = await listDecks();
        setDeckList(data);
      } catch (error){
        throw error;
      }
    }
    getDecks();
  }, []);
  
  if (deckList.length > 0) {

    const list = deckList.map((deck) => (
    <div class="card">
      <div class="card-body">
      <h2 class="card-title">{deck.name}</h2>
      <p class="card-subtitle mb-2 text-muted">{deck.cards.length} cards</p>
      <p class="card-text">{deck.description}</p>
      <Link to={`decks/${deck.id}`} class="btn btn-secondary">View</Link>
      <Link to={`decks/${deck.id}/study`}class="btn btn-primary">Study</Link>
      <button class="btn btn-danger" onClick={ () => deleteHandler(deck.id)}>Trash</button>
      </div>
    </div>
    ));

    return (
      <div>
        {list}
      </div>
    );
  }
  else {
    return <p>deckList not loaded</p>
  }

};

export default DeckList;