var os = require('os');

var TAB = '    ';

var TERMINAL = {
  'GREEN': '\x1b[32m',
  'RED': '\x1b[31m',
  'RESET': '\x1b[0m'
};

var report = function(results) {
  results.testSuites.forEach(function(testSuiteSummary) {
    console.log(testSuiteSummary.name + ': ');

    testSuiteSummary.tests.forEach(function(testSummary) {
      console.log(TAB + testSummary.name + ': ');
      var summary = TAB.repeat(2);
      if(testSummary.failures.length === 0) {
        summary += TERMINAL.GREEN;
      } else {
        summary += TERMINAL.RED;
      }
      summary += testSummary.failures.length + ' failures' + TERMINAL.RESET + ' in ' + testSummary.assertions + ' assertions.';
      console.log(summary);

      if(testSummary.failures.length > 0) {
        console.log(TAB.repeat(2) + testSummary.failures.join(os.EOL + TAB.repeat(2)));
      }
    });
  });

  console.log();

  var summary = '';
  if(results.failures === 0) {
    summary += TERMINAL.GREEN;
  } else {
    summary += TERMINAL.RED;
  }
  summary += results.failures + ' total failures' + TERMINAL.RESET + ' in ' +  results.assertions + ' total assertions.';
  console.log(summary); 
};

module.exports = report;