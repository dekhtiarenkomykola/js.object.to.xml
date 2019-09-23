# object-to-xml-string
======================

Convert JS object to XML string

install
-------

```bash
npm install --save object-to-xml-string
```

usage
-----

Example 1
```js
const objectToXmlString = require('object-to-xml-string');

const obj2xml = new objectToXmlString();

const testObj = {
	number: 1,
	bool: true,
	u: undefined,
	n: null,
	date: new Date(),
	shops: {
		id: [1, 2, 3]
	},
	deep1: {
		deep2: {
			str: 'object-to-xml-string'
		}
	}	
};

console.log(obj2xml.convert(testObj));

/*
<number>1</number><bool>true</bool><n></n><date>Mon Sep 23 2019 21:44:13 GMT+0300 (GMT+03:00)</date><shops><id>1</id><id>2</id><id>3</id></shops><deep1><deep2><str>object-to-xml-string</str></deep2></deep1>
*/
```

Example 2

```js
const objectToXmlString = require('object-to-xml-string');

const obj2xml = new objectToXmlString();

obj2xml.hook('number', (value, key) => {
    if (key === 'id') {
        return value;
    } else {
        return value.toFixed(2);
    }
});
obj2xml.hook('boolean', b => Number(b));
obj2xml.hook('string', s => s.toUpperCase());
obj2xml.hook('date', d => d.toISOString());

const testObj = {
    number: 1,
    bool: true,
    u: undefined,
    n: null,
    date: new Date(),
    shops: {
        id: [1, 2, 3]
    },
    deep1: {
        deep2: {
            str: 'object-to-xml-string'
        }
    }
};

console.log(obj2xml.convert(testObj));

/*
<number>1.00</number><bool>1</bool><n></n><date>2019-09-23T18:49:46.641Z</date><shops><id>1</id><id>2</id><id>3</id></shops><deep1><deep2><str>OBJECT-TO-XML-STRING</str></deep2></deep1>
*/
```

license
-------
###MIT License

Copyright (c) 2019 Mykola Dekhtiarenko

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
