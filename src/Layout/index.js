import React from "react";
import {Switch, Route} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../DeckStuff/Home";
import CreateDeck from "../DeckStuff/CreateDeck";
import Study from "../DeckStuff/Study";
import Deck from "../DeckStuff/Deck";
import EditDeck from "../DeckStuff/EditDeck";
import AddCard from "../DeckStuff/AddCard";
import EditCard from "../DeckStuff/EditCard";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact={true} path="/decks/:deckId">
            <Deck />
          </Route>
          <Route exact={true} path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact={true} path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact={true} path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact={true} path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
        <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
