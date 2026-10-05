export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/price") {
      const pair = url.searchParams.get("pair") || "EUR/USD";

      const apiUrl =
        `https://api.twelvedata.com/price?symbol=${encodeURIComponent(pair)}&apikey=${env.TWELVE_DATA_API_KEY}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      return new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    return new Response("Blue Berry API is running 🫐");
  }
};
