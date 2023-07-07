import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Player } from "../interfaces";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type CardProps = {
  players: Player[];
};

function PlayersDisplay({ players }: CardProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    players.length ? setIsLoading(false) : setIsLoading(true);
  }, [players]);
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
        <div className="top-bar">
          <div className="search-wrapper">
            <label htmlFor="search-form">
              <input
                type="text"
                className="search-form"
                placeholder="Recherche..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>
          <div  className="selector">
          <label>
          Choisir une position 
            <select name="selectedCategory" onChange={(e) => setCategory(e.target.value)}>
              <option value= {""}></option>
              <option value= {10}>Gardien</option>
              <option value= {20}>Defenseur</option>
              <option value= {21}>Lateral</option>
              <option value= {30}>Milieu défensif</option>
              <option value= {31}>Milieu offensif</option>
              <option value= {40}>Attaquant</option>
            </select>
          </label>
          </div>
          </div>
          <div className="card-container">
            {players.filter((player)=> {if(category==="" ) {return true}  else {return player.ultraPosition == category}})
              .map((element) =>
              element.firstName?.toLowerCase().includes(query.toLowerCase()) ||
              element.lastName?.toLowerCase().includes(query.toLowerCase()) 
               ? (
                <Card
                  key={element.id}
                  style={{ width: "10rem" }}
                  className="player-card"
                >
                  <Card.Img variant="top" src="../footballer.png" />
                  <Card.Body>
                    <Card.Title>
                      {element.firstName} {element.lastName}
                    </Card.Title>
                    <Card.Text>
                      {element.ultraPosition == 10
                        ? "Gardien"
                        : element.ultraPosition == 20
                        ? "Defenseur"
                        : element.ultraPosition == 21
                        ? "Lateral"
                        : element.ultraPosition == 30
                        ? "Milieu défensif"
                        : element.ultraPosition == 31
                        ? "Milieu offensif"
                        : element.ultraPosition == 40
                        ? "Attaquant"
                        : "Ni"}
                    </Card.Text>
                    <Link to={`/${element.id}`}>
                      <Button variant="primary">Voir les details</Button>
                    </Link>
                  </Card.Body>
                </Card>
              ) : null
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PlayersDisplay;
