import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PlayerStats } from "../interfaces";
import { Player } from "../interfaces";
import { Club } from "../interfaces";


function PlayerDetails(): JSX.Element {
  const [playerStats, setPlayerStats] = useState({} as PlayerStats);
  const [onePlayer, setOneplayer] = useState({} as Player);  
  const [isLoading, setIsLoading] = useState(true);
  const [club , setClub] = useState({} as Club)

  const { id } = useParams();

  const fetchPlayerStats = async () => {
    try {
      const response = await axios.get(
        `https://api.mpg.football/api/data/championship-player-stats/${id}/2022`
      );
      setPlayerStats(response.data);
    } catch (error) {
      console.log("Could not fetch the details of the player", error);
    }
  };

  const fetchOnePlayer = async () => {
    try {
      const response = await axios.get(
        `https://api.mpg.football/api/data/championship-players-pool/1`
      );
      setOneplayer(response.data.poolPlayers.find((footballer: Player) => footballer.id === id));
    } catch (error) {
      console.log("Could not fetch players", error);
    }
  };

  const fetchClub = async () => {
    try {
      const response = await axios.get(
        `https://api.mpg.football/api/data/championship-clubs`
      );
      setClub(response.data.championshipClubs[onePlayer.clubId]);
      setIsLoading(false);
    } catch (error) {
      console.log("Could not fetch club", error);
    }
  };

  useEffect(() => {
    fetchPlayerStats();
    fetchOnePlayer();
  }, [id]);

  useEffect(() => {
    if (onePlayer){
    fetchClub()
    }
  }, [onePlayer]);

  return (
    <div>
      {isLoading ? "Loading..." : (
        <Card style={{ width: "18rem" }} className="player-details">
        <Card.Img variant="top" src={club?.defaultAssets.logo.medium} />
          <Card.Body>
            <Card.Title> {onePlayer.firstName}  {onePlayer.lastName}</Card.Title>
            <Card.Title> {club?.name["fr-FR"]}</Card.Title>
            <Card.Text>    {
                    (onePlayer.ultraPosition == 10 ? "Gardien" : 
                    onePlayer.ultraPosition == 20  ? "Defenseur" : 
                    onePlayer.ultraPosition == 21 ? "Lateral" : 
                    onePlayer.ultraPosition == 30 ? "Milieu défensif" : 
                    onePlayer.ultraPosition == 31 ? "Milieu offensif" : 
                    onePlayer.ultraPosition == 40 ? "Attaquant" : "Ni")
                  }</Card.Text> 
            <Card.Text>Note moyenne : {onePlayer.stats?.averageRating.toFixed(2)}</Card.Text>
            <Card.Text>Total de buts : {onePlayer.stats?.totalGoals}</Card.Text>
            <Card.Text>Total de matchs : {onePlayer.stats?.totalMatches}</Card.Text>
            <Card.Text>Total de matchs débutés : {onePlayer.stats?.totalStartedMatches}</Card.Text>
            <Card.Text>Total de matchs joués : {onePlayer.stats?.totalPlayedMatches}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default PlayerDetails;
