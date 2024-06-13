import { wait } from "./wait";
import { APIFOOTBALLKEY } from "@env";

export const fetchLastMathcData = async (matchId : number) => {
  console.log(`↪️ Fetching Match Data for [${matchId}]`);

  const myHeaders = new Headers();
  myHeaders.append("x-rapidapi-host", "api-football-v1.p.rapidapi.com");
  myHeaders.append("x-rapidapi-key", APIFOOTBALLKEY);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await wait(2000);

  const response = await fetch(
    `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${matchId}&season=2024`,
    requestOptions as RequestInit
  ).catch((error) => console.error(error));

  if(!response) return;
  const matchesData = await response.json();
  console.log("📦 Matches Data:", matchesData);
  let matchData = matchesData.response.filter((element: any) => {
    if (element.fixture.status.elapsed == null) {
      return element;
    }
  })[0];

  console.log("📦 Match Data:", matchData);

  return matchData;
};
