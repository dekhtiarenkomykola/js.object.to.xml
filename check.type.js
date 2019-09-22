
const JS_TYPES = {
    undefined: 'undefined',
    null: 'null',
    number: 'number',
    boolean: 'boolean',
    string: 'string',
    object: 'object',
    function: 'function',
    array: 'array',
    date: 'date'
};

const JS_TYPE_STRING_TOKEN = {
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Number]': 'number',
    '[object Boolean]': 'boolean',
    '[object String]': 'string',
    '[object Object]': 'object',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date'
};

function getObjectType(object) {
    const stringToken = Object.prototype.toString.call(object);
    return JS_TYPE_STRING_TOKEN[stringToken];
}

function isUndefined(object) {
    return getObjectType(object) === JS_TYPES.undefined;
}

function isNull(object) {
    return getObjectType(object) === JS_TYPES.null;
}

function isNumber(object) {
    return getObjectType(object) === JS_TYPES.number;
}

function isBoolean(object) {
    return getObjectType(object) === JS_TYPES.boolean;
}

function isString(object) {
    return getObjectType(object) === JS_TYPES.string;
}

function isObject(object) {
    return getObjectType(object) === JS_TYPES.object;
}

function isFunction(object) {
    return getObjectType(object) === JS_TYPES.function;
}

function isArray(object) {
    return getObjectType(object) === JS_TYPES.array;
}

function isDate(object) {
    return getObjectType(object) === JS_TYPES.date;
}

const checkType = {
    getObjectType: getObjectType,
    isUndefined: isUndefined,
    isNull: isNull,
    isNumber: isNumber,
    isBoolean: isBoolean,
    isString: isString,
    isObject: isObject,
    isFunction: isFunction,
    isArray: isArray,
    isDate: isDate
};

module.exports = {
    JS_TYPES: JS_TYPES,
    checkType: checkType
};
