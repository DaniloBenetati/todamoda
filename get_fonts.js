const https = require('https');

https.get('https://br.todomoda.com/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const fontMatches = [...data.matchAll(/font-family:[^;\"\}]+/gi)].map(m => m[0]);
    const fontLinks = [...data.matchAll(/href="([^"]*(?:fonts\.googleapis|woff2|woff|typekit)[^"]*)"/gi)].map(m => m[1]);
    const fontNames = [...data.matchAll(/family=([a-zA-Z0-9+:]+)/g)].map(m => m[1]);
    console.log('Font families:', fontMatches.slice(0, 15));
    console.log('Font links:', fontLinks);
    console.log('Font names:', fontNames);
  });
}).on('error', err => console.log('Err:', err.message));
