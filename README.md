# mergeWithObservable

[![npm version](https://img.shields.io/npm/v/merge-with-observable.svg?style=flat-square)](https://www.npmjs.com/package/merge-with-observable)
[![license](https://img.shields.io/badge/licence-MIT-green.svg?style=flat-square)](https://github.com/kavolorn/Merge-With-Observable/blob/develop/LICENSE)

Function which merges provided object into MobX observable taking into 
account custom rules when specified.

Imagine the situation when your nested observable objects in the state
have to be updated by different update messages. It may be the case when 
every distinct update message brings only partial data in the nested 
elements. You need a clever way how to apply this data.

This repo contains `mergeWithObservable` function which tries to solve this
situation.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

Execute this command in your environment. 

```
npm install merge-with-observable --save
```
or

```
yarn add merge-with-observable
```

<small>[Table of Contents](#table-of-contents)</small>
