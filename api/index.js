export default async function handler(req, res) {
  // URL se 'username' parameter nikalna
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Please provide a username (?username=your_name)" });
  }

  try {
    // Asli IP ko server-side par call karna (IP hide ho jayegi)
    const response = await fetch(`http://103.25.175.203:8001/search?quary=${encodeURIComponent(username)}`);
    const data = await response.json();

    // Browser ko batana ki ye JSON data hai
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); // CORS fix
    
    // Same to same JSON output
    res.status(200).send(JSON.stringify(data, null, 2));
  } catch (error) {
    res.status(500).json({ error: "Backend IP not responding" });
  }
    }
