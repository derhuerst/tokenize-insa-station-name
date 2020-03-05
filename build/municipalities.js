'use strict'

const queryOverpass = require('@derhuerst/query-overpass')
const normalize = require('normalize-for-search')
const slugg = require('slugg')
const {ok} = require('assert')
const bbox = require('./bbox')
const removeRegion = require('../lib/remove-region')

const filter = [
	'[type=boundary]', '[boundary=administrative]',
	'[admin_level=8]', // municipality a.k.a. "Gemeinde"
	'[name]', // needs to have a name to be useful
].join('')

queryOverpass(`\
[out:json][timeout:60][bbox:${bbox}];
(
	way${filter};
	relation${filter};
);
out tags;
`)
.then((results) => {
	const municipalities = results
	.map(res => normalize(res.tags.name))
	.map(removeRegion)
	.map(m => slugg(m.trim()))
	.sort((m1, m2) => m2.length - m1.length) // descending
	ok(municipalities.includes('bad-lauterberg'), 'includes "bad-lauterberg"')
	ok(municipalities.includes('nienburg'), 'includes "nienburg"')
	ok(municipalities.includes('burg'), 'includes "burg"')
	ok(municipalities.indexOf('nienburg') < municipalities.indexOf('burg'))

	process.stdout.write(JSON.stringify(municipalities) + '\n')
})
.catch((err) => {
	console.error(err)
	process.exit(1)
})
