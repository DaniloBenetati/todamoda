const https = require('https');

https.get('https://br.todomoda.com/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const cssLinks = [...data.matchAll(/href="([^"]*\.css[^"]*)"/gi)].map(m => m[1]);
    console.log('CSS links:', cssLinks.slice(0, 5));
    if (cssLinks.length > 0) {
      https.get(cssLinks[0], (cRes) => {
        let cssData = '';
        cRes.on('data', c => cssData += c);
        cRes.on('end', () => {
          const fontFaces = [...cssData.matchAll(/@font-face\s*\{[^}]*\}/g)].map(m => m[0]);
          const fonts = [...cssData.matchAll(/font-family:\s*([^;\}]+)/gi)].map(m => m[1]);
          console.log('Font faces count:', fontFaces.length);
          console.log('Distinct fonts in CSS:', [...new Set(fonts)].slice(0, 20));
        });
      });
    }
  });
});
