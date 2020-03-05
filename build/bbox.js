'use strict'

const {ST} = require('german-states-bbox')

const bbox = [
	ST.minLat,
	ST.minLon,
	ST.maxLat,
	ST.maxLon
].map(v => v.toFixed(3)).join(',')

module.exports = bbox
