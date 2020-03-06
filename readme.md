# tokenize-insa-station-name

**Get search tokens from an INSA/NASA station name.**

[![npm version](https://img.shields.io/npm/v/tokenize-insa-station-name.svg)](https://www.npmjs.com/package/tokenize-insa-station-name)
[![build status](https://api.travis-ci.org/derhuerst/tokenize-insa-station-name.svg?branch=master)](https://travis-ci.org/derhuerst/tokenize-insa-station-name)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/tokenize-insa-station-name.svg)
![minimum Node.js version](https://img.shields.io/node/v/tokenize-insa-station-name.svg)
[![chat with me on Gitter](https://img.shields.io/badge/chat%20with%20me-on%20gitter-512e92.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)

It

- lower-cases
- normalizes umlauts & non-ASCII chars (`Foo ä–$` -> `foo ae`)
- expands `str` & `str.` suffixes (`Landstr.` -> `land strasse`)
- removes `(Saale)`/`(Elbe)`/etc (`Schönebeck (Elbe), Bahnhof` -> `bahnhof schoenebeck`)
- removes `(b. …)` (`Bornstedt (b. Lu. Eisleben), Neuglück` -> `neuglueck bornstedt`)
- moves municipalities to the end (`Osterburg (Altmark), Raiffeisen` -> `raiffeisen osterburg`)


## Installation

```shell
npm install tokenize-insa-station-name
```


## Usage

```js
const tokenize = require('tokenize-insa-station-name')

tokenize('Bornstedt (b. Lu. Eisleben), Neuglück')
.join(' ') // -> 'neuglueck bornstedt'
```


## Contributing

If you have a question or need support using `tokenize-insa-station-name`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, use [the issues page](https://github.com/derhuerst/tokenize-insa-station-name/issues).
