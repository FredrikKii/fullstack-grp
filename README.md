**ÖVERSIKT:**

Det här APIt används för att hantera en vår webshop där vi kränger hattar. Du kan göra anrop för att hämta, skapa, uppdatera och ta bort produkter, användare och hattar och denna Dokumentationen är tänkt som en lite guide som visar vilka endpoints som finns och hur du kan använda och komma åt dem. 

Alla anrop sker med: *http://localhost:2000/api*

**--------------------**

Datamodeller beskriver hur data struktureras och hanteras i ett system. De definierar vilka fält (som ID, namn, pris) som varje typ av objekt har, och hur dessa objekt relaterar till varandra. I denna uppgift har vi dessa:

***User:*** Denna modell beskriver vad som lagras om en användare, t.ex. ett ID, namn och om de är en administratör.

***Hat:*** Datamodellen för hattar beskriver varje hatt genom ett ID, namn, pris, bild och lagerstatus.

***Cart:*** Modellen för en varukorg beskriver att varje varukorg har ett ID, en användare kopplad till den och en lista över produkter (hattar) och hur många av varje produkt som finns i varukorgen.

Såhär ser upplägget ut:

User: {
  _id: number,  - Ett unikt ID för varje användare
  name: string, - Namn på användaren
  isAdmin: boolean - Om användaren är en administratör (true/false)
}


Hat: {
  _id: number,  - Ett unikt ID för varje hatt
  name: string, - Namnet på hatten
  price: number, - Pris på hatten
  image: string, - URL till en bild av hatten
  amountInStock: number - Antal hattar i lager
}

Cart: {
  _id: number,  // Ett unikt ID för varje varukorg
  userId: number, // ID på användaren som äger varukorgen
  productId: number, // ID på produkten (hatten) som ligger i varukorgen
  amount: number // Antal av den produkten i varukorgen
}

**--------------------**

**ENDPOINTS:** 

Dessa fungerar på users, hats och cart. Det gäller bara att ändra vartifrån du vill ha data.
T ex: 
http://localhost:2000/api/users/ 
http://localhost:2000/api/cart/ 
http://localhost:2000/api/hats/ 
osv.


Du kan använda fetch för att kommunicera med API. Samma här, ändra bara mellan USER/HATS/CART beroende på vad du hämtar.
Här är exempel för USER.

***GET***
För att hämta en lista med ALLA objekt:


fetch('http://localhost:2000/api/users/')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

För att hämta en lista med en SPECIFIK användare:

const userId = '66f556f2a35fe3610afef77c'; // *Ersätt med det aktuella ID:t på objekt du vill hämta*
fetch('http://localhost:2000/api/users/${userId}')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

  ***POST***

För att lägga till ett nytt objekt:

  fetch('http://localhost:2000/api/users/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: "IsildurSaysNoToThrowingTheRingEqualsDoom",
    isAdmin: true
  }),
})
.then(response => {
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
})
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));

***PUT***

För att uppdatera ett befintligt objekt:

const userId = '66f556f2a35fe3610afef77c'; // *Ersätt med det aktuella ID:t du vill ändra på.*
fetch('http://localhost:2000/api/users/${userId}', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: "Uppdaterat Namn",
    isAdmin: false
  }),
})
.then(response => {
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
})
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));

***DELETE***

För att ta bort ett objekt:

const userId = '66f556f2a35fe3610afef77c'; // Ersätt med det aktuella ID:t på det du vill ta bort.
fetch('http://localhost:2000/api/users/${userId}', {
  method: 'DELETE',
})
.then(response => {
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  console.log('Användare borttagen');
})
.catch(error => console.error('Error:', error));

***SEARCH** 

För att söka på ett objekt:

const query = 'NAMNPÅANVÄNDARE'; // Ersätt med sökordet
fetch('http://localhost:2000/api/users/search?q=${query}')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));


***_____________________***


*GET/POST/PUT/DELETE:*

***GET:*** För att hämta alla eller ett specifikt objekt.
ALLA: http://localhost:2000/api/users/ 
SPECIFIK: http://localhost:2000/api/users/66f556f2a35fe3610afef77c (numren efter users/ är det unika id:t för en användare/hatt/cart)

***_____________________***


***POST:*** För att lägga till ett nytt objekt.
Här måste du ha en datamodell beroende på vad för objekt du vill lägga in. Ska vi lägga in en hatt så behövs den modellen jag tidigare skrev. Alltså:

Hat: {
  
  name: string, - Namnet på hatten
  price: number, - Pris på hatten
  image: string, - URL till en bild av hatten
  amountInStock: number - Antal hattar i lager

}

Har tagit bort id:t för det behövs inte då MongoDB genererar ett nytt unikt för varje sak som läggs in.

***_____________________***


***PUT:*** För att uppdatera ett befintligt objekt genom att skicka en komplett representation av det objektet. Du behöver ange det unika ID
för objektet som ska uppdateras i URL.'

EXEMPEL: http://localhost:2000/api/users/66f556f2a35fe3610afef77c.


EXEMPEL PÅ NY HATT: 

{
  "name": "Nytt Namn",
  "price": Pris på,
  "image": "https://ny-bild-url.com/bild.jpg",
  "amountInStock": 20
}

EXEMPEL PÅ NY ANVÄNDARE:

{
    "name": "IsildurSaysNoToThrowingTheRingEqualsDoom",
    "isAdmin": "true"
}


***DELETE:*** För att ta bort ett objekt från servern genom att ange dess unika ID i url:n.

EXEMPEL:

URL: http://localhost:2000/api/users/66f556f2a35fe3610afef77c

Objekt med id 66f556f2a35fe3610afef77c kommer då tas bort.

***_____________________***


***SEARCH:*** För att söka på specifikt objekt så skrivs denna sträng: localhost:2000/api/users/search?q= + namn:

EXEMPEL:

Användare: localhost:2000/api/users/search?q=NAMNPÅANVÄNDARE/KEPS/VARAIVARUKORG

***_____________________***


