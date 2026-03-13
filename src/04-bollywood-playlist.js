/**
 * 🎵 Simran ki Road Trip Playlist
 *
 * Simran aur uske dost road trip pe jaa rahe hain Delhi se Jaipur!
 * Usne ek playlist banayi hai with song durations (in seconds). Lekin
 * trip sirf itni der ki hai - usse zyada songs mat daalo playlist mein.
 *
 * Rules (use while loop):
 *   - Songs array mein se ek ek song add karo
 *   - BEFORE adding a song, check: kya current total + is song ki duration
 *     maxDuration se zyada ho jayegi? Agar haan, toh STOP. Mat add karo.
 *   - Agar kisi song ki duration positive number nahi hai (negative, zero,
 *     NaN, string, etc.), skip that song and move to the next one
 *   - Continue until all songs are checked or maxDuration limit reached
 *
 * Validation:
 *   - Agar songs array nahi hai, return: { count: 0, totalDuration: 0 }
 *   - Agar maxDuration positive number nahi hai, return: { count: 0, totalDuration: 0 }
 *
 * @param {number[]} songs - Array of song durations in seconds
 * @param {number} maxDuration - Maximum total duration allowed in seconds
 * @returns {{ count: number, totalDuration: number }} Songs added and total duration
 *
 * @example
 *   buildPlaylist([240, 180, 300, 200], 600)
 *   // => { count: 2, totalDuration: 420 }
 *   // 240 + 180 = 420, next song 300 would make 720 > 600, so stop
 *
 *   buildPlaylist([100, -50, 200, 150], 400)
 *   // => { count: 3, totalDuration: 450 }
 *   // Wait, 100 + 200 + 150 = 450 > 400? Let me recalculate...
 *   // 100 added (total=100), skip -50, 200 added (total=300),
 *   // 150: 300+150=450 > 400, STOP.
 *   // => { count: 2, totalDuration: 300 }
 */
export function buildPlaylist(songs, maxDuration) {
  // Your code here
  // 1. Validation: Array check aur maxDuration check
  if (!Array.isArray(songs) || typeof maxDuration !== 'number' || maxDuration <= 0) {
    return { count: 0, totalDuration: 0 };
  }

  let count = 0;
  let totalDuration = 0;
  let i = 0;

  // 2. Loop through songs using while
  while (i < songs.length) {
    const currentSong = songs[i];

    // Step A: Skip invalid durations (Negative, Zero, NaN, or non-numbers)
    if (typeof currentSong !== 'number' || currentSong <= 0 || isNaN(currentSong)) {
      i++;
      continue; // Agle song pe chalo
    }

    // Step B: Check limit BEFORE adding
    if (totalDuration + currentSong > maxDuration) {
      break; // Limit reach ho gayi, bas itne hi gaane aayenge!
    }

    // Step C: Add song to playlist
    totalDuration += currentSong;
    count++;
    i++;
  }

  return { 
    count: count, 
    totalDuration: totalDuration 
  };
}
