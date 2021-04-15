
const mymap = L.map('mapVisId').setView([0, 0], 2);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

      const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      const tiles = L.tileLayer(tileUrl, { attribution });
      tiles.addTo(mymap);

getData();

async function getData() {
    //const response = await fetch('Airplane_Crashes_and_Fatalities_Since_1908.csv');
    const response = await fetch('test.csv');
    const data = await response.text();

    const table = data.split('\n').slice(1);

    table.forEach(row => {
        const col = (row + ',').split(/(?: *?([^",]+?) *?,|" *?(.+?)" *?,|( *?),)/).slice(1).reduce((a, b) => (a.length > 0 && a[a.length - 1].length < 4) ? [...a.slice(0, a.length - 1), [...a[a.length - 1], b]] : [...a, [b]], []).map(e => e.reduce((a, b) => a !== undefined ? a : b, undefined));
        const date = col[0];
        const location = col[2];
        const fatalities = col[10];
        console.log(date, location, fatalities);
    });

}