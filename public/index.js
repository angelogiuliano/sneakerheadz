const cardDeck = document.getElementById('card-deck');
const cardDeckSearch = document.getElementById('card-deck-search');
const cardDeckSearchContainer = document.getElementById('card-search-container')
const search = document.getElementById('search');
const input = document.getElementById('input');

const fetchTrendingProducts = () => {
  fetch('/products/trending')
    .then(response => response.json())
    .then(data => {
      renderTrendingProducts(data);
    })
    .catch(error => {
      console.error(error);
    });
};

const fetchSearchResults = () => {
  const inputValue = input.value;
  if (inputValue) {
    const data = {
      value: inputValue
    };
    fetch('/products/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        renderSearchProducts(result);
        scrollToSearchSection();
      })
      .catch(error => {
        console.log(error);
      });
  }
};

  const renderTrendingProducts = (products) => {
    products.map((el) => {

        const divCard = document.createElement('div')
        divCard.classList.add('card')

        const imgSneaker = document.createElement('img')
        imgSneaker.classList.add('card-img-top')
        imgSneaker.src = el.thumbnail

        const divBody = document.createElement('div')
        divBody.classList.add('card-body')

        const divDesc = document.createElement('div')
        divDesc.classList.add('card-desc')

        const h5 = document.createElement('h5')
        h5.innerText = el.shoeName
        const p = document.createElement('p')
        p.innerText = el.retailPrice + " $"

        const btn = document.createElement('button')
        const btnImg = document.createElement('img')
        btnImg.src = "https://cdn-icons-png.flaticon.com/512/263/263142.png"

        btn.appendChild(btnImg);
        divDesc.appendChild(h5);
        divDesc.appendChild(p);
        divDesc.appendChild(btn);
        divBody.appendChild(divDesc);
        divCard.appendChild(imgSneaker);
        divCard.appendChild(divBody);
        cardDeck.appendChild(divCard);
    })
  }

  const renderSearchProducts = (products) => {
    
    cardDeckSearchContainer.classList.remove('hide')
    cardDeckSearchContainer.style.removeProperty('display')
    cardDeckSearch.innerHTML = ''

    if (!products) {
      const p = document.createElement('p')
      p.innerText = 'No results.. Try again.'
      p.style.margin = 'auto'
      cardDeckSearch.appendChild(p)
    } else {
      products.map((el) => {

      const divCard = document.createElement('div')
      divCard.classList.add('card-big')

      const imgSneaker = document.createElement('img')
      imgSneaker.classList.add('card-img-top')
      imgSneaker.src = el.thumbnail

      const divBody = document.createElement('div')
      divBody.classList.add('card-body')

      const divDesc = document.createElement('div')
      divDesc.classList.add('card-desc')

      const h5 = document.createElement('h5')
      h5.innerText = el.shoeName
      const p = document.createElement('p')
      p.innerText = el.retailPrice + " $"

      const btn = document.createElement('button')
      const btnImg = document.createElement('img')
      btnImg.src = "https://cdn-icons-png.flaticon.com/512/263/263142.png"

      btn.appendChild(btnImg);
      divDesc.appendChild(h5);
      divDesc.appendChild(p);
      divDesc.appendChild(btn);
      divBody.appendChild(divDesc);
      divCard.appendChild(imgSneaker);
      divCard.appendChild(divBody);
      cardDeck.appendChild(divCard);

      cardDeckSearch.style.height = '100vh'
      cardDeckSearch.appendChild(divCard);
    });
  }
};
  
  fetchTrendingProducts();
  
  let timeoutId;
  input.addEventListener('input', function (event) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(fetchSearchResults, 1000);
    if (input.value === '') {
      cardDeckSearch.innerHTML = ''
      cardDeckSearchContainer.style.display = 'none'
    }
  });

  const scrollToSearchSection = () => {
    search.scrollIntoView({ behavior: 'smooth', block: 'start'});
  };



  