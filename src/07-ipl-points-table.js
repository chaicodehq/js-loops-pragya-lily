/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  // Your code here
  // 1. Validation: Check if matches is a valid non-empty array
  if (!Array.isArray(matches) || matches.length === 0) {
    return [];
  }

  // 2. Accumulator: Stores team data as keys for quick access
  const table = {};

  // Helper function: Ensures team exists in the table object
  const initTeam = (teamName) => {
    if (!table[teamName]) {
      table[teamName] = { 
        team: teamName, 
        played: 0, 
        won: 0, 
        lost: 0, 
        tied: 0, 
        noResult: 0, 
        points: 0 
      };
    }
  };

  // 3. Process each match
  for (let i = 0; i < matches.length; i++) {
    const { team1, team2, result, winner } = matches[i];

    // Initialize teams if they aren't already in the table
    initTeam(team1);
    initTeam(team2);

    // Update matches played for both
    table[team1].played++;
    table[team2].played++;

    if (result === "win") {
      // Winner logic (2 points)
      table[winner].won++;
      table[winner].points += 2;

      // Loser logic
      const loser = (winner === team1) ? team2 : team1;
      table[loser].lost++;
    } 
    else if (result === "tie") {
      // Tie logic (1 point each)
      table[team1].tied++;
      table[team1].points += 1;
      table[team2].tied++;
      table[team2].points += 1;
    } 
    else if (result === "no_result") {
      // Rain/No result logic (1 point each)
      table[team1].noResult++;
      table[team1].points += 1;
      table[team2].noResult++;
      table[team2].points += 1;
    }
  }

  // 4. Convert Object to Array for sorting
  const resultTable = Object.values(table);

  // 5. Sorting Logic
  resultTable.sort((a, b) => {
    // Primary: Points Descending (Zyada points upar)
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    // Secondary: Team Name Ascending (Alphabetical order A -> Z)
    return a.team.localeCompare(b.team);
  });

  return resultTable;
}
