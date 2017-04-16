# mergeWithObservable

[![npm version](https://img.shields.io/npm/v/merge-with-observable.svg?style=flat-square)](https://www.npmjs.com/package/merge-with-observable)
[![license](https://img.shields.io/badge/licence-MIT-green.svg?style=flat-square)](https://github.com/kavolorn/Merge-With-Observable/blob/develop/LICENSE)

Function which recursively merges provided object into MobX observable taking into account custom rules when specified.

Imagine the situation when your nested observable objects in the state
have to be updated by different update messages. It may be the case when 
every distinct update message brings only partial data. You need a clever way how to apply this data.

This repo contains 

```js
mergeWithObservable(observableObject, objectToMerge, rulesDefinition)
``` 

function which tries to solve this situation.

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

## Usage

Let's demonstrate how to apply `mergeWithObservable` function. Let's imagine
a project where we can find this type of observables:

```js
{
    sport: {
        id: 2,
        name: "soccer",
        bets: [
            3, 4, 5, 6
        ]
    }
}
```

We have sport and bets for this sport. Let's imagine system has initial
knowledge only about sport ids:

```js
const observableObject = observable({
    sport: {
        id: 2
    }
});
```

Then we say we have 3 different update messages with partial data:

```js
const objectToMerge1 = {
    sport: {
        id: 2,
        name: "soccer"
    }
};
```

and

```js
const objectToMerge2 = {
    sport: {
        id: 2,
        bets: [
            1, 2, 3, 4
        ]
    }
};
```

and

```js
const objectToMerge3 = {
    sport: {
        id: 2,
        bets: [
            3, 4, 5, 6
        ]
    }
};
```

We don't want same bets to be present in the object after the merge. Also we want only bets starting at 2. How we can do that?

First we define our constrain in the rules object (same shape as observable):

```js
const rulesDefinition = {
    sport: {
        bets: (observableObject, objectToMerge, key) => {
            if (observableObject[key] === undefined) {
                observableObject[key] = observable([]);
            }
            objectToMerge[key].forEach((newValue) => {
                if (observableObject[key].find((value) => value === newValue) === undefined && newValue >= 2) {
                    observableObject[key].push(newValue);
                }
            });
        }
    }
};
```

Then we merge 3 update messages with this calls:

```js
mergeWithObservable(observableObject, objectToMerge1, rulesDefinition);
mergeWithObservable(observableObject, objectToMerge2, rulesDefinition);
mergeWithObservable(observableObject, objectToMerge3, rulesDefinition);
```

Profit. Our observable is now in this state:

```js
{
    sport: {
        id: 2,
        name: "soccer",
        bets: [
            2, 3, 4, 5, 6
        ]
    }
}
```

<small>[Table of Contents](#table-of-contents)</small>