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
      div.classList.add("col-12");
      div.classList.add("mb-5");
      div.classList.add("card-group");
      div.innerHTML = `
                          <div class="card border-0 rounded-3 card_style">
                              <img src="${phoneData.image}" class="m-3 mx-auto img-fluid w-75" alt="...">
                              <div class="card-body">
                                  <h5 class="card-title">${phoneData.phone_name}</h5>
                                  <p class="card-text">${phoneData.brand}</p>
                              </div>
                              <div class="mx-auto pb-4">
                                <button onclick="phoneDetails('${phoneData.slug}')" class="btn_learn">Learn More</button>
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
      div.classList.add("bg-light");
      div.classList.add("rounded-3");
      div.classList.add("py-3");
      div.classList.add("my-5");
      searchResults.innerHTML = "";
      div.innerHTML = `
                <div class="row mb-5">
                    <div class="col-lg-6 col-sm-12 col-12 d-flex justify-content-center align-items-center mb-3">
                        <img src="${
                          productDetails.image
                        }" class="img-fluid" alt="...">
                    </div>
                    <div class="col-lg-6 col-sm-12 col-12">
                        <div class="container-fluid p-0 m-0 w-75 details_text">
                            <h5 class="card-title">${productDetails.name}</h5>
                            <p class="card-text">${productDetails.brand}</p>
                            <p class="fw-bold text-uppercase">Launch</p>
                            <p class="card-text">${
                              productDetails?.releaseDate ||
                              "Release Date Not Found"
                            }</p>
                            <p class="fw-bold text-uppercase">Memory</p>
                            <p class="card-text">${
                              productDetails.mainFeatures.storage
                            }</p>
                            <p class="fw-bold text-uppercase">Features</p>
                            <p class="card-text">${
                              productDetails.mainFeatures.sensors
                            }</p>
                            <p class="card-text">${productDetails.slug}</p>
                        </div>
                    </div>
                </div> 
              `;
      searchResults.appendChild(div);
    });
};
