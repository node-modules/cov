/**!
 * cov - lib/istanbul.js
 * Copyright(c) 2014 fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');
var istanbul = require('istanbul');

module.exports = function istanbulDir(threshold, client, root, pkg) {
  var collector = new istanbul.Collector();
  collector.add(JSON.parse(fs.readFileSync(path.join(root, 'coverage.json'), 'utf8')));
  var actuals = istanbul.utils.summarizeCoverage(collector.getFinalCoverage())
  // console.log(actuals)
  // { lines: { total: 17, covered: 17, skipped: 0, pct: 100 },
  // statements: { total: 17, covered: 17, skipped: 0, pct: 100 },
  // functions: { total: 4, covered: 4, skipped: 0, pct: 100 },
  // branches: { total: 14, covered: 14, skipped: 0, pct: 100 } }

  // 行覆盖率信息: CODE COVERAGE RESULT OF LINES IS: xx/xx
  // 分支覆盖率信息: CODE COVERAGE RESULT OF BRANCHES IS: xx/xx
  // 覆盖率报表链接: CODE COVERAGE RESULT WAS SAVED TO: http://10.32.20.131/t.html

  // output:
  // CODE COVERAGE RESULT WAS SAVED TO: http://xxx/xxx.html
  // CODE COVERAGE RESULT OF LINES IS: 157/164

  var cov = actuals.lines.pct;
  var pass = cov >= threshold;

  // First line must be empty, otherwise mocha analyze will fails on CISE(TOAST) ci env
  console.log('\nCODE COVERAGE RESULT OF LINES IS: %s/%s', actuals.lines.covered, actuals.lines.total);
  console.log('CODE COVERAGE RESULT OF BRANCHES IS: %s/%s', actuals.branches.covered, actuals.branches.total);
  console.log('CODE COVERAGE RESULT OF FUNCTIONS IS: %s/%s', actuals.functions.covered, actuals.functions.total);
  console.log('CODE COVERAGE RESULT OF STATEMENTS IS: %s/%s', actuals.statements.covered, actuals.statements.total);

  console.log('CODE COVERAGE RESULT: %s%', cov);
  if (!pass) {
    console.log("CODE COVERAGE BELOW THRESHOLD: %s% < %s%", cov, threshold);
  } else {
    console.log('CODE COVERAGE SUCCEEDED');
  }

  var lcovDir = path.join(root, 'lcov-report');
  var files = [
    // index.html,
    // tbsession-hsf/index.html
    // tbsession-hsf/lib/index.html
    // tbsession-hsf/lib/tbsession.js.html
  ];
  var walk = function (p) {
    var names = fs.readdirSync(p);
    names.forEach(function (n) {
      var filepath = path.join(p, n);
      if (fs.statSync(filepath).isDirectory()) {
        walk(filepath);
      } else {
        files.push(filepath);
      }
    });
  };

  walk(lcovDir);

  var done = 0;
  var indexURL;
  var version = pkg.version || '0.0.0';
  files.forEach(function (filename, i) {
    var name = 'cov/html/' + pkg.name + '/' + pkg.version + filename.replace(lcovDir, '');
    client.delete(name, function (err) {
      client.uploadFile(filename, {key: name}, function (err, info) {
        if (err) {
          throw err;
        }
        if (filename.indexOf('/lcov-report/index.html') >= 0) {
          indexURL = info.url;
        }
        done++;
        if (done === files.length) {
          console.log('CODE COVERAGE RESULT WAS SAVED TO: %s', indexURL);
          process.exit(pass ? 0 : 1);
        }
      });
    });
  });
};
