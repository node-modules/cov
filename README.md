cov
=======

[![Dependency Status](https://gemnasium.com/fengmk2/cov.png)](https://gemnasium.com/fengmk2/cov)

[![NPM](https://nodei.co/npm/cov.png?downloads=true&stars=true)](https://nodei.co/npm/cov/)

Mocha Coverage report store on CDN.

## Install

```bash
$ npm install cov --registry=http://registry.cnpmjs.org
```

## Coverage Config

Add the key `"cov"` to the `"config"` key in your package.json file.
Under that key you can add any of the following properties:

```json
"config": {
  "cov": {
    "threshold": 100
  }
}
```

## Usage

@see [Makefile](https://github.com/fengmk2/cov/blob/master/Makefile)

```bash
$ make test MOCHA_OPTS='--require blanket' REPORTER=html-cov | ./node_modules/cov/bin/cov
```

## License

(The MIT License)

Copyright (c) 2013 fengmk2 &lt;fengmk2@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
