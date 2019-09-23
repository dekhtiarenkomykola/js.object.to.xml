const chechType = require('./check.type').checkType;
const JS_TYPES  = require('./check.type').JS_TYPES;

function wrrap(wr, value) {
    return `<${wr}>${value}</${wr}>`;
}

class objectToXmlString {
    constructor() {
        this.hooks = {
            [JS_TYPES.undefined]: () => { },
            [JS_TYPES.null]: () => '',
            [JS_TYPES.number]: (n) => n,
            [JS_TYPES.boolean]: (b) => b,
            [JS_TYPES.string]: (s) => s,
            [JS_TYPES.object]: (o) => o,
            [JS_TYPES.function]: (f) => String(f),
            [JS_TYPES.array]: (arr) => arr,
            [JS_TYPES.date]: (d) => String(d),
        };
    }

    hook(name, action) {
        this.hooks[name] = action;
    }

    convert(object) {
        let convertXmlString = '';

        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const
                    element     = object[key],
                    elementType = chechType.getObjectType(element);

                switch (elementType) {
                    case JS_TYPES.object: {
                        const value = this.convert(element);
                        convertXmlString += wrrap(key, value);
                        break;
                    }
                    case JS_TYPES.array: {

                        element.forEach(arrItem => {
                            let value = '';

                            if (chechType.isObject(arrItem)) {
                                value = this.convert(arrItem);
                            } else {
                                const arrItemType = chechType.getObjectType(arrItem);
                                const hookResult = this.hooks[arrItemType](arrItem, key);
                                if (!chechType.isUndefined(hookResult)) {
                                    value += hookResult;
                                }
                            }

                            convertXmlString += wrrap(key, value);
                        });
                        break;
                    }
                    default: {
                        const hookResult = this.hooks[elementType](element, key);
                        if (!chechType.isUndefined(hookResult)) {
                            convertXmlString += wrrap(key, hookResult);
                        }
                    }
                }
            }
        }

        return convertXmlString;
    }
}

module.exports = objectToXmlString;
