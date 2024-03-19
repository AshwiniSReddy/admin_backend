const axios = require('axios');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.OWNER;
const REPO = process.env.REPO;
const WORKFLOW_ID = process.env.WORKFLOW_ID;

async function triggerWorkflow() {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW_ID}/dispatches`;

  const body = {
    ref: 'main',
    inputs: {
      invalidateCache: 'true'
    }
  };

  const headers = {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
  };

  try {
    const response = await axios.post(url, body, { headers });
    console.log('Workflow triggered:', response.data);
  } catch (error) {
    // console.error('Error triggering workflow:', error);
    console.error('Error triggering workflow:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

module.exports = triggerWorkflow;
