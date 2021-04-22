import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";

function Study() {
  const history = useHistory();
    const [deck, setDeck] = useState([]);
    const [cards, setCards] = useState([]);
    const [isFront, setIsFront] = useState(true);
    const [cardNum, setCardNum] = useState(0);
    const { deckId } = useParams();

    const flipHandler = (event) => {
        event.preventDefault();
        if (isFront === true) {
            setIsFront(!isFront)
        }
        if (isFront === false && (cardNum + 1) < cardTotal) {
            setCardNum(cardNum + 1);
            setIsFront(!isFront)
        }
        if (isFront === false && (cardNum + 1) == cardTotal) {
            const askRestart = (window.confirm("Would you like to restart the deck? Click cancel to return to home page."));
            if (askRestart) {
            setCardNum(0);
            setIsFront(true);
            }
            else {
                //return user to Home screen with useHistory()
                history.go(-1);
            }
        }
    };
    

    useEffect(() => {
        async function getDeck() {
          const data = await readDeck(deckId);
          setDeck(data);
          const filteredCards = data.cards.filter((card) => card.deckId == deckId);
          setCards(filteredCards);
        }
        getDeck();
    }, [deckId]);
   
    const cardTotal = cards.length;

    if (cards.length > 2) {
        return (
          <>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                <li class="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li class="breadcrumb-item active" aria-current="page">Study</li>
            </ol>
          </nav>
            <h2>Study: {deck.name}</h2>
              <div class="card">
                <div class="card-body">
                  <h3 class="card-title">Card {cardNum + 1} of {cardTotal}</h3>
                  <p class="card-text">
                    {(isFront) ? `${cards[cardNum].front}` : `${cards[cardNum].back}`}
                  </p>
                  <button type="button" class="btn btn-secondary" onClick={flipHandler}>flip</button>
                    {(isFront) ? `` : <button type="button" class="btn btn-warning" onClick={flipHandler}>Next</button>}
                </div>
            </div>
          </>  
        );
    }
    else {
        return (
            <>
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                <li class="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li class="breadcrumb-item active" aria-current="page">Study</li>
            </ol>
          </nav>
            <h2>Study: {deck.name}</h2>
            <h3>Not enough cards.</h3>
            <p>{`You need at least 3 cards to study. There are ${cards.length} cards in this deck.`}</p>
            <Link to={`/decks/${deck.id}/cards/new`}><button class="btn btn-primary">Add Cards</button></Link>
            </>
        );
    }
};

export default Study;