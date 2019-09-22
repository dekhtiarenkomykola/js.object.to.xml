const chechType = require('./check.type').checkType;
const JS_TYPES  = require('./check.type').JS_TYPES;

function wrrap(wr, value) {
    return `<${wr}>${value}</${wr}>`;
}

class JsObjectToXml {
    constructor() {
        this.hooks = {
            [JS_TYPES.undefined]: () => { },
            [JS_TYPES.null]: () => '',
            [JS_TYPES.number]: (n) => n,
            [JS_TYPES.boolean]: (b) => b,
            [JS_TYPES.string]: (s) => s,
            [JS_TYPES.object]: (o) => o,
            // [JS_TYPES.function]: (f) => String(f),
            // [JS_TYPES.array]: (arr) => arr,
            [JS_TYPES.date]: (d) => String(d),
        };
    }

    hook(name, action) {
        if (name === JS_TYPES.function || name === JS_TYPES.array) {
            throw 'Not correct hook name.';
        }
        this.hooks[name] = action;
    }

    convert(object) {
        let convertXmlString = '';

        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const element = object[key];
                const type = chechType.getObjectType(element);

                switch (type) {
                    case JS_TYPES.object: {
                        let value = this.convert(element);
                        convertXmlString += wrrap(key, value);
                        break;
                    }
                    case JS_TYPES.array: {

                        element.forEach(arrItem => {
                            convertXmlString += wrrap(key, arrItem);
                        });
                        break;
                    }
                    default: {
                        const hookResult = this.hooks[type](element);
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

module.exports = JsObjectToXml;
