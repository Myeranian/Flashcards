import React from "react";
import DeckList from "./DeckList";
import { Link } from "react-router-dom";


function Home() {
  return (
    <div>
      <Link to="/decks/new" class="btn btn-primary btn-lg">Create Deck</Link>
      <DeckList />
      </div>
  );
};

export default Home;