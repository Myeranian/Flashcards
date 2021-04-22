import React, { useState, useEffect } from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";

  function cardDeleteHandler(cardId) {
    if (window.confirm("Are you sure you want to delete this card? It can't be recovered after deleting.")) {
      deleteCard(cardId);
    }
  };

function Deck() {
    const [deck, setDeck] = useState([]);
    const [cards, setCards] = useState([]);
    const { deckId, cardId } = useParams();
    const history = useHistory();

    const deckDeleteHandler = (event) => {
      event.preventDefault();
      if (window.confirm("Are you sure you want to delete this deck? It can't be recovered after deleting.")) {
        deleteDeck(deckId);
        history.go(-1);
      }
    };
    

    useEffect(() => {
        async function getDeck() {
            const data = await readDeck(deckId);
            setDeck(data);
            //const filteredCards = data.cards.filter((card) => card.deckId == deckId);
            setCards(data.cards);
        }
        getDeck();
    }, [deckId]);

    

    if (!deck) {
      return (
        <p>Deck failed to load cards</p>
      );
    }
    else {
      const list = cards.map((card) => (
        <div class="card">
          <div class="card-body">
            <p class="card-text"> {card.front}</p>
            <p class="card-text"> {card.back}</p>
            <Link to={`/decks/${deckId}/cards/${card.id}/edit`}class="btn btn-secondary">Edit</Link>
            <button class="btn btn-danger" onClick={ () => cardDeleteHandler(card.id)}>Trash</button>
          </div>
        </div>
       ));
      return (
            <>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>

            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <Link to={`/decks/${deckId}/edit`}class="btn btn-secondary">Edit</Link>
            <Link to={`/decks/${deckId}/study`}class="btn btn-primary">Study</Link>
            <Link to={`/decks/${deckId}/cards/new`} class="btn btn-info">Add Cards</Link>
            <button class="btn btn-danger" onClick={deckDeleteHandler}>Trash</button>
            <hr></hr>
            <h2>Cards</h2>
            <div>{list}</div> 
            </>
        );
    }
};

export default Deck;