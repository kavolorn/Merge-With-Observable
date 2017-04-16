import assert from "assert";
import {observable, toJS} from "mobx";
import {describe, it} from "mocha";

import mergeWithObservable from "../dist/mergeWithObservable";

describe("#mergeWIthObservable", () => {
    it("should make plain merge", () => {
        const observableObject = observable({
            sport: {
                name: "trololo"
            },
            bets: [1, 2]
        });
        const objectToMerge = {
            sport: {
                id: 2
            },
            bets: [3, 4]
        };
        const expected = {
            sport: {
                id: 2,
                name: "trololo"
            },
            bets: [3, 4]
        };
        mergeWithObservable(observableObject, objectToMerge);
        assert.deepStrictEqual(toJS(observableObject), expected);
    });
    it("should call custom merge operation (case 1)", () => {
        const observableObject = observable({
            sport: {
                name: "trololo"
            },
            bets: [1, 2, 3, 4]
        });
        const objectToMerge = {
            sport: {
                id: 2
            },
            bets: [3, 4, 5, 6]
        };
        const rulesDefinition = {
            bets: (observableObject, objectToMerge, key) => {
                objectToMerge[key].forEach((newValue) => {
                    if (observableObject[key].find((value) => value === newValue) === undefined) {
                        observableObject[key].push(newValue);
                    }
                });
            }
        };
        const expected = {
            sport: {
                id: 2,
                name: "trololo"
            },
            bets: [1, 2, 3, 4, 5, 6]
        };
        mergeWithObservable(observableObject, objectToMerge, rulesDefinition);
        assert.deepStrictEqual(toJS(observableObject), expected);
    });
    it("should call custom merge operation (case 2)", () => {
        const observableObject = observable({
            sport: {
                name: "trololo",
                bets: [1, 2, 3, 4]
            }
        });
        const objectToMerge = {
            sport: {
                id: 2,
                bets: [3, 4, 5, 6]
            }
        };
        const rulesDefinition = {
            sport: {
                bets: (observableObject, objectToMerge, key) => {
                    objectToMerge[key].forEach((newValue) => {
                        if (observableObject[key].find((value) => value === newValue) === undefined) {
                            observableObject[key].push(newValue);
                        }
                    });
                }
            }
        };
        const expected = {
            sport: {
                id: 2,
                name: "trololo",
                bets: [1, 2, 3, 4, 5, 6]
            }
        };
        mergeWithObservable(observableObject, objectToMerge, rulesDefinition);
        assert.deepStrictEqual(toJS(observableObject), expected);
    });
    it("should call custom merge operation (case 3)", () => {
        const observableObject = observable({
            sport: {
                name: "trololo"
            }
        });
        const objectToMerge = {
            sport: {
                id: 2,
                bets: [3, 4, 5, 6]
            }
        };
        const rulesDefinition = {
            sport: {
                bets: (observableObject, objectToMerge, key) => {
                    if (observableObject[key] === undefined) {
                        observableObject[key] = observable([]);
                    }
                    objectToMerge[key].forEach((newValue) => {
                        if (observableObject[key].find((value) => value === newValue) === undefined && newValue >= 4) {
                            observableObject[key].push(newValue);
                        }
                    });
                }
            }
        };
        const expected = {
            sport: {
                id: 2,
                name: "trololo",
                bets: [4, 5, 6]
            }
        };
        mergeWithObservable(observableObject, objectToMerge, rulesDefinition);
        assert.deepStrictEqual(toJS(observableObject), expected);
    });
    it("should call custom merge operation (case 4)", () => {
        const observableObject = observable({
            sport: {
                id: 2
            }
        });
        const objectToMerge1 = {
            sport: {
                id: 2,
                name: "soccer"
            }
        };
        const objectToMerge2 = {
            sport: {
                id: 2,
                bets: [1, 2, 3, 4]
            }
        };
        const objectToMerge3 = {
            sport: {
                id: 2,
                bets: [3, 4, 5, 6]
            }
        };
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
        const expected = {
            sport: {
                id: 2,
                name: "soccer",
                bets: [2, 3, 4, 5, 6]
            }
        };
        mergeWithObservable(observableObject, objectToMerge1, rulesDefinition);
        mergeWithObservable(observableObject, objectToMerge2, rulesDefinition);
        mergeWithObservable(observableObject, objectToMerge3, rulesDefinition);
        assert.deepStrictEqual(toJS(observableObject), expected);
    });
});