var config = {};
config.table = {};
config.query = {};
config.url ={};

config.table.cases = 'cases2';

config.query.selectCases = 'SELECT * FROM ' + config.table.cases;
config.query.addCasesQ = 'INSERT INTO ' + config.table.cases + ' SET ?';
config.query.delCases = 'DELETE FROM ' + config.table.cases + ' WHERE id IN ';

config.url.index = '/start/:tab?';
config.url.indexCases = '/start/tabs-example-second';
config.url.caseForm = '/add';
config.url.addCase = '/save';
config.url.delCases = '/del';
config.url.cond = '/cond';

module.exports = config;