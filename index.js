'use strict'

const {strictEqual: eql} = require('assert')
// Normalize handles umlauts nicely, slugg removes all non-ascii
// characters nicely, so we use both.
const normalize = require('normalize-for-search')
const slugg = require('slugg')
const municipalities = require('./municipalities.json')
const removeRegion = require('./lib/remove-region')

// remove `(b. …)`
const removeBei = (_) => {
	return _.replace(/(\s+|\b)\(b\.?\s+[^)]+\)/g, '')
}
eql(removeBei('foo b. bar baz'), 'foo b. bar baz')
eql(removeBei('foo (b.) baz'), 'foo (b.) baz')
eql(removeBei('foo (b.bar) baz'), 'foo (b.bar) baz')
eql(removeBei('foo (b. bar) baz'), 'foo baz')
eql(removeBei('foo (b bar) baz'), 'foo baz')
eql(removeBei('foo (b. bar)'), 'foo')

const findMunicipality = (_) => {
	for (const municipality of municipalities) {
		const fromI = _.indexOf(municipality)
		if (fromI === -1) continue

		// check word boundaries
		if (fromI !== 0 && _[fromI - 1] !== '-') continue
		const toI = fromI + municipality.length - 1
		if (toI !== (_.length - 1) && _[toI + 1] !== '-') continue

		return {municipality, fromI, toI}
	}
	return null
}

const normalizeStopName = (name) => {
	let _ = normalize(name)
	_ = removeRegion(removeBei(_))
	_ = slugg(_)

	// put municipalities last
	const res = findMunicipality(_)
	if (res && (res.fromI !== 0 || res.toI !== (_.length - 1))) {
		_ = [
			_.slice(0, Math.max(res.fromI - 1, 0)), // text before
			_.slice(res.toI + 2), // text after
			'-', res.municipality
		].join('')
	}

	_ = _.split('-')

	// todo
	return _
}

module.exports = normalizeStopName
