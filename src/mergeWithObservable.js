import {extendObservable} from "mobx";

/**
 * Function merges provided object into observable taking into account
 * custom merge rules if specified.
 *
 * @param observableObject  MobX observable object.
 * @param objectToMerge     Object which is going to be merged into observable.
 * @param rulesDefinition   Custom rules for properties.
 * @returns {*}             Initial observable object modified.
 */
const mergeWithObservable = (observableObject, objectToMerge, rulesDefinition) => {
    Object.keys(objectToMerge).forEach((key) => {
        if (rulesDefinition !== undefined && rulesDefinition[key] !== undefined && rulesDefinition[key] instanceof Function) {
            rulesDefinition[key](observableObject, objectToMerge, key);
        } else if (observableObject[key] === undefined) {
            extendObservable(observableObject, {
                [key]: objectToMerge[key]
            });
        } else if (objectToMerge[key] instanceof Object && !(objectToMerge[key] instanceof Array)) {
            mergeWithObservable(observableObject[key], objectToMerge[key], rulesDefinition && rulesDefinition[key] ? rulesDefinition[key] : undefined);
        } else {
            observableObject[key] = objectToMerge[key];
        }
    });
    return observableObject;
};

export default mergeWithObservable;