var googleapis = require('googleapis'),
    OAuth2 = googleapis.auth.OAuth2,
	readline = require('readline'),
	fs = require('fs');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var CLIENT_ID = '994002661940-acjr0668hkji9kf2rqjnbtfvllujk7fv.apps.googleusercontent.com',
    CLIENT_SECRET = 'FzP586LkRBxCqurbH3Tw7YPT',
    REDIRECT_URL = 'http://localhost:3000/redirect',
    SCOPE = 'https://www.googleapis.com/auth/drive.file',
	ACCESS_TOKEN = 'ya29.MAAVKncKKSGQgiAAAACIWUgM5SlQsdTJCl3WpXZdnJKwDnJaiu7E4lcZWdYGsw',
	REFRESH_TOKEN = '1/nKuAmGCd0RRDDjiW6kZSfcWgk8w3RaOKiz_u0XTKVC0';
	
	
var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

oauth2Client.credentials = { access_token: ACCESS_TOKEN, refresh_token: REFRESH_TOKEN };
//console.log(oauth2Client.credentials);
oauth2Client.refreshAccessToken(function(err, tokens){
//  console.log(err);
  oauth2Client.credentials.access_token = tokens.access_token;
//  console.log(oauth2Client.credentials);
});


googleapis.discover('drive', 'v2').execute(function(err, client) {
	//handle discovery errors
	//make requests
	console.log('in discovery');
	client.drive.files
      .insert({ title: 'CheckList', mimeType: 'application/vnd.google-apps.spreadsheet'})
      //.withMedia('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', fs.readFileSync('test.xlsx'))
      .withAuthClient(oauth2Client).execute(function(err, result) {
		console.log('in auth');
		console.log('error:', err, 'result:', result.defaultOpenWithLink);
		client.drive.files
			.update({ fileId: result.id })
			.withMedia('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', fs.readFileSync('test.xlsx'))
			.withAuthClient(oauth2Client).execute(function(err, result){});
		client.drive.permissions.insert({ fileId: result.id },
			{
				'role': 'writer',
				'type': 'anyone'
			})
			.withAuthClient(oauth2Client).execute(function(err, x) {
				console.log('error:', err, 'result:', x);
		});
	});
	
	
	console.log('after file create');
});
	
	
//	var url = oauth2Client.generateAuthUrl({
//		scope: SCOPE,
//		access_type: 'offline',
//		approvalPrompt: 'force'
//	});

	//console.log(url);
	
//var getAccessToken = function(code) {
//	oauth2Client.getToken(code, function(err, tokens) {
//		console.log(err);
//		console.log(tokens);
//	});
//}
	
//rl.question('Enter the code here:', getAccessToken);