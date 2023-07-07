import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import PlayersDisplay from "./components/PlayersDisplay";
import { Player } from "./interfaces";
import { Route, Routes } from "react-router-dom";
import PlayerDetails from "./components/PlayerDetails";

function App() {
  const [players, setPlayers] = useState([] as Player[]);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(
        `https://api.mpg.football/api/data/championship-players-pool/1`
      );
      setPlayers(response.data.poolPlayers);
    } catch (error) {
      console.log("Could not fetch players", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);


  return (
    <>
      <Routes>
        <Route path="/" element={<PlayersDisplay players={players}></PlayersDisplay>} />
        <Route path="/:id" element={<PlayerDetails />} />
      </Routes>
    </>
  );
}

export default App;
