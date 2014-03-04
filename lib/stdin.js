/**!
 * cov - lib/stdin.js
 * Copyright(c) 2013 - 2014 fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

module.exports = function stdin(threshold, client) {
  var chunks = [];

  process.stdin.on('data', function (data) {
    chunks.push(data);
  });

  process.stdin.on('end', function () {
    var content = Buffer.concat(chunks).toString(); // coverage.html
    // <div class="percentage">99%</div><div class="sloc">368</div><div class="hits">366</div><div class="misses">2</div>
    var sloc = 0;
    var hits = 0;
    var cov = 0;
    var m = content.match(/\"sloc\">(\d+)<\/div>/);
    if (m) {
      sloc = Number(m[1]) || 0;
    }
    m = content.match(/\"hits\">(\d+)<\/div>/);
    if (m) {
      hits = Number(m[1]) || 0;
    }
    m = content.match(/\"percentage\">([\d\.]+)%?<\/div>/);
    if (m) {
      cov = Number(m[1]) || 0;
    }

    // output:
    // CODE COVERAGE RESULT WAS SAVED TO: http://xxx/xxx.html
    // CODE COVERAGE RESULT OF LINES IS: 157/164

    var pass = cov >= threshold;

    console.log('CODE COVERAGE RESULT OF LINES IS: %s/%s', hits, sloc);
    console.log('CODE COVERAGE RESULT: %s%', cov);
    if (!pass) {
      console.log("CODE COVERAGE BELOW THRESHOLD: %s% < %s%", cov, threshold);
    } else {
      console.log('CODE COVERAGE SUCCEEDED');
    }

    var key = 'cov/html/' + pkg.name + '/' + pkg.version + '.html';
    client.delete(key, function () {
      client.upload(new Buffer(content), {key: key}, function (err, info) {
        if (err) {
          throw err;
        }
        console.log('CODE COVERAGE RESULT WAS SAVED TO: %s', info.url);
        process.exit(pass ? 0 : 1);
      });
    });
  });
};
