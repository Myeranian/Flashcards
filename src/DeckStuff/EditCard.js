import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import { updateCard, readDeck, readCard } from "../utils/api/index";
import CardForm from "./CardForm";

function EditCard() {
    const history = useHistory();
    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState({});
    const { deckId, cardId } = useParams();
    const initialFormState = ({
        "front": card.front,
        "back": card.back,
        "deckId": Number(deckId),
        "id": cardId
    });
    const [formData, setFormData] = useState({ ...initialFormState });
    
    const submitHandler = (event) => {
        event.preventDefault();
        updateCard(formData);
    };

    const cancelHandler = (event) => {
        event.preventDefault();
        history.go(-1);
    };

    useEffect(() => {
        async function getDeck() {
          const data = await readDeck(deckId);
          setDeck(data);
          const cardData = await readCard(cardId);
          setCard(cardData);
          setFormData(initialFormState);
        }
        getDeck();
    }, [deckId, cardId]);

    return (
        <>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                <li class="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li class="breadcrumb-item active" aria-current="page">Edit Card</li>
            </ol>
        </nav>
        <h2>Edit Card</h2>
        <form onSubmit={submitHandler}>
        <CardForm formData={formData} setFormData={setFormData}/>
        <button type="button" class="btn btn-secondary" onClick={cancelHandler}>Cancel</button>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
        </>
    );
  
};
export default EditCard;