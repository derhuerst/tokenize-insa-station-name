'use strict'

const {deepStrictEqual: eql, ok} = require('assert')
const n = require('.')

// umlauts
eql(n('Foo ä–$'), ['foo', 'ae'])

// expands & splits `str.`/`str`/`strasse`
eql(n('seestr'), ['see', 'strasse'])
eql(n('seestr.'), ['see', 'strasse'])
eql(n('seestraße'), ['see', 'strasse'])
eql(n('wiebestr/huttenstr'), ['wiebe', 'strasse', 'hutten', 'strasse'])

// // removes `(Saale)`, `(Elbe)`, etc
ok(!n('Halle  (Saale), Hallmarkt').includes('saale'))
ok(!n('Schönebeck  (Elbe), Bahnhof').includes('elbe'))
eql(n('Foo (Mark)'), ['foo'])

// removes `(b. …)`
eql(n('Coswig (b Dresden)'), ['coswig'])
eql(n('Bornstedt (b. Lu. Eisleben), Neuglück'), ['neuglueck', 'bornstedt'])

// puts municipalities last
eql(n('Osterburg (Altmark), Raiffeisen'), ['raiffeisen', 'osterburg'])
eql(n('Groß Kreutz'), ['gross', 'kreutz'])
// todo: eql(n('Jesewitz - Gotha, Schilfteich'), ['schilfteich', 'gotha'])
