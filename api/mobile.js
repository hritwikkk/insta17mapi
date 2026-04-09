export default async function handler(req, res) {
  // URL se 'mob' parameter nikalna
  const { mob } = req.query;

  if (!mob) {
    return res.status(400).json({ error: "Mobile number is required (?mob=12345)" });
  }

  try {
    // 8002 port wali API ko call karna
    const response = await fetch(`http://103.25.175.203:8002/?mob=${encodeURIComponent(mob)}`);
    const data = await response.json();

    // Browser ko JSON return karna
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    res.status(200).send(JSON.stringify(data, null, 2));
  } catch (error) {
    res.status(500).json({ error: "Mobile API not responding" });
  }
}
