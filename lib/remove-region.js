'use strict'

const normalize = require('normalize-for-search')
const {strictEqual: eql, ok} = require('assert')

// ```
// require('./municipalities.json')
// .filter(n => r.test(n)).map(n => r.exec(n)).filter(res => !!res)
// .map(res => res[0].slice(1, -1)).sort()
// ```
const regions = [
	'Altmark', 'Anhalt', 'Elbe', 'Elster', 'Geiseltal', 'Mark',
	'Prignitz', 'Saale', 'Unstrut', 'Harz'
].map(r => normalize(r))

// removes e.g. ` (elbe)` & `/harz`
const removeRegion = (_) => {
	const res = /\(\w+\)/.exec(_)
	if (!res) return _
	const fromI = res.index
	const toI = res.index + res[0].length
	if (regions.includes(_.slice(fromI + 1, toI - 1))) {
		_ = _.slice(0, fromI) + _.slice(toI)
	}
	return _
}
eql(removeRegion('foo (elbe) bar'), 'foo  bar')
eql(removeRegion('foo (elbe blub) bar'), 'foo (elbe blub) bar')

module.exports = removeRegion
