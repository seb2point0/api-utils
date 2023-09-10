const express = require('express');
const axios = require('axios');

const router = express.Router();

const extract = (data, where) => {
  var g = where || (typeof global !== 'undefined' ? global : this);
  for (var key in data){
    if (data.hasOwnProperty(key)){
        g[key] = data[key];
    }
  }
}

const createBroadcast = async (headers, title, workspaceId, selectedBrandId, csrfToken) => {
  const url = `https://streamyard.com/api/workspaces/${workspaceId}/broadcasts`;

  headers['content-type'] = 'application/json';

  const data = { 
    title, 
    selectedBrandId, 
    csrfToken, 
    "recordOnly": true, 
    "type": "studio", 
    "localIsolatedRecordings" : "audioAndVideo" 
  };

  try {
      const result = await axios.post(url, data, { headers });
      return result.data.id;
  } catch (error) {
      console.log(error);
  }
}

router.post('/', async (req, res) => {

  extract(req.body)

  let headers = {
    'authority': 'streamyard.com',
    'accept': '*/*',
    "accept-language": "en-GB,en;q=0.6",
    "cookie": `${cookies}`,
    "Origin": "https://streamyard.com",
    "Referer": `${referer}`,
    "Referrer-Policy": "origin-when-cross-origin",
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'sec-gpc': '1',
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
  };

  const broadcast = await createBroadcast(headers, title, workspaceId, selectedBrandId, csrfToken)

  res.json({
    inviteLink: 'https://streamyard.com/' + broadcast
  });
});

module.exports = router;
