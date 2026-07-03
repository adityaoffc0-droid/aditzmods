export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN; 
  const owner = 'adityaoffc0-droid';
  const repo = 'aditzmods';

  const pathParts = req.query.path || [];
  const ghPath = Array.isArray(pathParts) ? pathParts.join('/') : pathParts;

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${ghPath}`;

  const ghRes = await fetch(url, {
    method: req.method,
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: ['POST', 'PUT', 'DELETE'].includes(req.method) ? JSON.stringify(req.body) : undefined
  });

  const data = await ghRes.json();
  res.status(ghRes.status).json(data);
}
