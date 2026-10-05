export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/price") {
      const pair = url.searchParams.get("pair") || "EUR/USD";

      const apiKey = env.TWELVE_DATA_API_KEY;

      if (!apiKey) {
        return new Response(
          JSON.stringify({
            error: "TWELVE_DATA_API_KEY secret is not available"
          }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
      }

      const apiUrl =
        `https://api.twelvedata.com/price?symbol=${encodeURIComponent(pair)}&apikey=${encodeURIComponent(apiKey)}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    return new Response("Blue Berry API is running 🫐");
  }
};
