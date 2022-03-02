//When search button pressed
const searchResults = document.getElementById("search-results");
const searchButton = () => {
  const inputValue = document.getElementById("input-value");
  const errorText = document.getElementById("error-text");

  const searchText = inputValue.value;

  //condition executes when search button press with empty value
  if (searchText == "") {
    errorText.innerText = "Please Enter Value In The Search Box!!!";
    inputValue.value = "";
    searchResults.innerHTML = "";
  } else {
    searchResults.innerHTML = "";
    fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    )
      .then((res) => res.json())
      .then((data) => {
        //condition executes when data found in the API
        if (data.data.length != 0) {
          phonesDisplay(data);
        }
        //condition executes when data not found in the API
        else {
          errorText.innerText = "Data not found";
        }
      });

    //clearing fields
    inputValue.value = "";
    errorText.innerHTML = "";
  }
};

//Phone display function
const phonesDisplay = (phoneDatas) => {
  phoneDatas = phoneDatas.data;
  let count = 0;

  for (const phoneData of phoneDatas) {
    count = count + 1;
    if (count <= 20) {
      const div = document.createElement("div");
      div.classList.add("col-lg-4");
      div.classList.add("mb-3");
      div.classList.add("card-group");
      div.innerHTML = `
                          <div class="card border-0 rounded-3 card_style">
                              <img src="${phoneData.image}" class="m-3 img-fluid" alt="...">
                              <div class="card-body">
                                  <h5 class="card-title">${phoneData.phone_name}</h5>
                                  <p class="card-text">${phoneData.brand}</p>
                              </div>
                              <div class="mx-auto py-4">
                                <button onclick="phoneDetails('${phoneData.slug}')" class="btn btn-primary">See Details</button>
                              </div>
                          </div>
                      `;
      searchResults.appendChild(div);
    }
  }
};

//Phone details function
const phoneDetails = (id) => {
  fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const productDetails = data.data;
      console.log(productDetails);
      const div = document.createElement("div");
      searchResults.innerHTML = "";
      div.innerHTML = `
                <div class="row">
                    <div class="col-lg-6 d-flex justify-content-center align-items-center">
                        <img src="${productDetails.image}" class="img-fluid" width='300px' alt="...">
                    </div>
                    <div class="col-lg-6 d-flex justify-content-center">
                        <div>
                            <h5 class="card-title">${productDetails.name}</h5>
                            <p class="card-text">${productDetails.brand}</p>
                            <p class="card-text">${productDetails.releaseDate}</p>
                            <p class="card-text">${productDetails.mainFeatures.storage}</p>
                            <p class="card-text">${productDetails.mainFeatures.sensors}</p>
                            <p class="card-text">${productDetails.slug}</p>
                        </div>
                    </div>
                </div> 
              `;
      searchResults.appendChild(div);
    });
};
