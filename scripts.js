document.addEventListener('DOMContentLoaded', function () {
  // Código que será executado quando o navegador carregar
});

async function getInstaFeed() {
  try {
    const response = await fetch(
      ' https://us-central1-squid-apis.cloudfunctions.net/test-front-basic'
    );

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
getInstaFeed();
