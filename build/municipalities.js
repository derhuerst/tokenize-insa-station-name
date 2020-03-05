'use strict'

const {ST} = require('german-states-bbox')
const queryOverpass = require('@derhuerst/query-overpass')

const bbox = [
	ST.minLat,
	ST.minLon,
	ST.maxLat,
	ST.maxLon
].map(v => v.toFixed(3)).join(',')

const filter = [
	'[type=boundary]', '[boundary=administrative]',
	'[admin_level=8]', // municipality a.k.a. "Gemeinde"
	'[name]', // needs to have a name to be useful
].join('')

console.error(`\
[out:json][timeout:60][bbox:${bbox}];
(
	way${filter};
	relation${filter};
);
out tags;
`)
queryOverpass(`\
[out:json][timeout:60][bbox:${bbox}];
(
	way${filter};
	relation${filter};
);
out tags;
`)
.then((results) => {
	console.error('res', results)
	const municipalities = results.map(res => res.tags.name)
	process.stdout.write(JSON.stringify(municipalities) + '\n')
})
.catch((err) => {
	console.error(err)
	process.exit(1)
})
