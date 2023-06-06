const cardDeck = document.getElementById("card-deck");
const cardDeckSearch = document.getElementById("card-deck-search");
const cardDeckSearchContainer = document.getElementById(
  "card-search-container"
);
const search = document.getElementById("search");
const input = document.getElementById("input");
const openSidebarBtn = document.getElementById("openSidebar");
const closeSidebarBtn = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");

// Fetch Data
const fetchTrendingProducts = () => {
  fetch("/products/trending")
    .then((response) => response.json())
    .then((data) => {
      renderTrendingProducts(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const fetchSearchResults = () => {
  const inputValue = input.value;
  if (inputValue) {
    const data = {
      value: inputValue,
    };
    fetch("/products/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        renderSearchProducts(result);
        scrollToSearchSection();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

// Render Products
const renderTrendingProducts = (products) => {
  products.map((el) => {
    const divCard = document.createElement("div");
    divCard.classList.add("card");

    const imgSneaker = document.createElement("img");
    imgSneaker.classList.add("card-img-top");
    imgSneaker.src = el.thumbnail;

    const divBody = document.createElement("div");
    divBody.classList.add("card-body");

    const divDesc = document.createElement("div");
    divDesc.classList.add("card-desc");

    const h5 = document.createElement("h5");
    h5.innerText = el.shoeName;
    const p = document.createElement("p");
    p.innerText = el.retailPrice + " $";

    const btn = document.createElement("button");
    const btnImg = document.createElement("img");
    btnImg.src = "https://cdn-icons-png.flaticon.com/512/263/263142.png";
    btn.addEventListener("click", () => {
      btnClicked(el.thumbnail, el.shoeName, el.retailPrice);
    });

    btn.appendChild(btnImg);
    divDesc.appendChild(h5);
    divDesc.appendChild(p);
    divDesc.appendChild(btn);
    divBody.appendChild(divDesc);
    divCard.appendChild(imgSneaker);
    divCard.appendChild(divBody);
    cardDeck.appendChild(divCard);
  });
};

const renderSearchProducts = (products) => {
  cardDeckSearchContainer.classList.remove("hide");
  cardDeckSearchContainer.style.removeProperty("display");
  cardDeckSearch.innerHTML = "";

  if (!products) {
    const p = document.createElement("p");
    p.innerText = "No results.. Try again.";
    p.style.margin = "auto";
    cardDeckSearch.appendChild(p);
  } else {
    products.map((el) => {
      const divCard = document.createElement("div");
      divCard.classList.add("card-big");

      const imgSneaker = document.createElement("img");
      imgSneaker.classList.add("card-img-top");
      imgSneaker.src = el.thumbnail;

      const divBody = document.createElement("div");
      divBody.classList.add("card-body");

      const divDesc = document.createElement("div");
      divDesc.classList.add("card-desc");

      const h5 = document.createElement("h5");
      h5.innerText = el.shoeName;
      const p = document.createElement("p");
      p.innerText = el.retailPrice + " $";

      const btn = document.createElement("button");
      const btnImg = document.createElement("img");
      btnImg.src = "./263142.png";
      btn.addEventListener("click", () => {
        btnClicked(el.thumbnail, el.shoeName, el.retailPrice);
      });

      btn.appendChild(btnImg);
      divDesc.appendChild(h5);
      divDesc.appendChild(p);
      divDesc.appendChild(btn);
      divBody.appendChild(divDesc);
      divCard.appendChild(imgSneaker);
      divCard.appendChild(divBody);
      cardDeck.appendChild(divCard);

      cardDeckSearch.style.height = "100vh";
      cardDeckSearch.appendChild(divCard);
    });
  }
};

fetchTrendingProducts();

// Input Listener + Scroll
let timeoutId;
input.addEventListener("input", function (event) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(fetchSearchResults, 1000);
  if (input.value === "") {
    cardDeckSearch.innerHTML = "";
    cardDeckSearchContainer.style.display = "none";
  }
});

const scrollToSearchSection = () => {
  search.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Button Function
let arrayOfProducts = [];

const btnClicked = (img, name, price) => {
  addToCart(img, name, price);
  arrayOfProducts.push(name);
};

// Open Sidebar
openSidebarBtn.addEventListener("click", function () {
  sidebar.classList.toggle("show");
});

closeSidebarBtn.addEventListener("click", function () {
  sidebar.classList.remove("show");
});

const cartContainer = document.createElement('div')
cartContainer.classList.add('cart-container')
sidebar.appendChild(cartContainer);

const checkoutContainer = document.createElement('div')
checkoutContainer.classList.add('checkout-container')
const h3Check = document.createElement('h3')
h3Check.innerText = "Checkout"
const total = document.createElement('p')
total.innerText = "Total: 0 $"
const buyButton = document.createElement('button')
buyButton.innerText = "Buy now"
buyButton.addEventListener('click', () => {
  updateCheckout();
  if (pricesArray.length > 0) {
    window.alert(total.innerText)
  }
})

checkoutContainer.appendChild(h3Check)
checkoutContainer.appendChild(total)
checkoutContainer.appendChild(buyButton)
sidebar.appendChild(checkoutContainer)

let pricesArray = [];

const updateCheckout = () => {
  total.innerText = `Total: ${(pricesArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  }, 0))} $`;
}

const addToCart = (img, name, price) => {
  let productCount = 1;

  if (!arrayOfProducts.includes(name)) {
    const divCard = document.createElement("div");
    divCard.classList.add("card-cart");

    const imgSneaker = document.createElement("img");
    imgSneaker.classList.add("card-img-cart");
    imgSneaker.src = img;

    const divBody = document.createElement("div");
    divBody.classList.add("card-body-cart");

    const divDesc = document.createElement("div");
    divDesc.classList.add("card-desc-cart");

    const h5 = document.createElement("h5");
    h5.innerText = name;
    const p = document.createElement("p");
    p.innerText = price + " $";

    const divCount = document.createElement("div");
    divCount.classList.add("card-count-cart");

    const count = document.createElement("p");
    count.id = "count";
    count.innerText = `Count: ${productCount}`;

    const plusButton = document.createElement('button');
    plusButton.innerText = "+";
    plusButton.addEventListener('click', () => {
      pricesArray.push(price);
      productCount += 1;
      count.innerText = `Count: ${productCount}`;
      updateCheckout();
    });
    const minusButton = document.createElement('button');
    minusButton.innerText = "-";
    minusButton.addEventListener('click', () => {
      productCount -= 1;
      count.innerText = `Count: ${productCount}`;
      if (!productCount) {
        arrayOfProducts = [];
        cartContainer.removeChild(divCard);
      }
      pricesArray.pop()
      updateCheckout();
    });

    divCount.appendChild(minusButton);
    divCount.appendChild(count);
    divCount.appendChild(plusButton);
    divDesc.appendChild(h5);
    divDesc.appendChild(p);
    divBody.appendChild(divDesc);
    divBody.appendChild(divCount);
    divCard.appendChild(imgSneaker);
    divCard.appendChild(divBody);
    cartContainer.appendChild(divCard);

    arrayOfProducts.push(name);
    pricesArray.push(price);

    updateCheckout(productCount, price);
  }
};
