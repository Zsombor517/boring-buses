import * as fs from 'fs';
import { busRoutes } from './boring-busses.js';
import { departureTimes } from './timetables.js';

async function main() {
  console.log('Hello');

  let forward = [];
  let reverse = [];

  for (let busIndex = 0; busIndex < busRoutes.length; busIndex++) {
    const bus = busRoutes[busIndex];
    const timeTable = departureTimes[busIndex];
    const stops = bus[1];
    const lastStopIndex = bus[2];
    let f = {
      name: bus[0],
      'start terminus': { name: bus[1][0], departures: timeTable[0] },
    };
    for (let i = 1; i < lastStopIndex; i++) {
      const label = "stop " + i;
      f[label] = { name: bus[1][i], departureTimes: timeTable[i] };
    }
    f['end terminus'] = { name: stops[lastStopIndex] };

    forward.push(f);

    let r = {
      name: bus[0],
      'start terminus': { name: f['end terminus'].name, departures: timeTable[lastStopIndex] },
    };
    let index = lastStopIndex + 1;
    for (let i = lastStopIndex; i > 1; i--) {
      const label = "stop " + (lastStopIndex - i + 1);
      r[label] = { name: bus[1][i - 1], departures: timeTable[index++] };
    }
    r['end terminus'] = { name: f['start terminus'].name };
    reverse.push(r);
  }

  console.log(forward[0]);
  console.log(reverse[0]);
}

(async function() {
  await main();
})();
