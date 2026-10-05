export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    const apiKey = env.TWELVE_DATA_API_KEY;

    /* =====================================================
       CHECK API KEY
       ===================================================== */

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


    /* =====================================================
       LIVE PRICE
       ===================================================== */

    if (url.pathname === "/api/price") {

      const pair =
        url.searchParams.get("pair") || "EUR/USD";

      const apiUrl =
        "https://api.twelvedata.com/price" +
        "?symbol=" +
        encodeURIComponent(pair) +
        "&apikey=" +
        encodeURIComponent(apiKey);

      const response =
        await fetch(apiUrl);

      const data =
        await response.json();

      return new Response(
        JSON.stringify(data),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }


    /* =====================================================
       MARKET HISTORY
       ===================================================== */

    if (url.pathname === "/api/history") {

      const pair =
        url.searchParams.get("pair") || "EUR/USD";

      const interval =
        url.searchParams.get("interval") || "1min";

      const outputsize =
        url.searchParams.get("outputsize") || "100";

      const apiUrl =
        "https://api.twelvedata.com/time_series" +
        "?symbol=" +
        encodeURIComponent(pair) +
        "&interval=" +
        encodeURIComponent(interval) +
        "&outputsize=" +
        encodeURIComponent(outputsize) +
        "&apikey=" +
        encodeURIComponent(apiKey);

      const response =
        await fetch(apiUrl);

      const data =
        await response.json();

      return new Response(
        JSON.stringify(data),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }


    /* =====================================================
       DEFAULT
       ===================================================== */

    return new Response(
      "Blue Berry API is running 🫐",
      {
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }
};
