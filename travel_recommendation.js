const keywords = [
    { regex: /beaches?/, label: "beaches" },
    { regex: /temples?/, label: "temples" },
    { regex: /countries?/, label: "countries" }
  ];
async function getTravelRecommendations() {
    try {
        const search = document.getElementById("search").value.toLowerCase().trim();
        const response = await fetch('travel_recommendation.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const match = keywords.find(k => k.regex.test(search.toLowerCase()));
        const result = match ? data[match["label"]] 
        : data["countries"].filter(country => country.name.toLowerCase()===search.toLowerCase());
        const result_items= document.getElementById("items");
        result_items.innerHTML = result.map(item => `
        <div class="card">
        <img src="${item.imageUrl}" />
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        </div>
        `)
        return data;
    } catch (error) {
        console.error('Error fetching travel recommendations:', error);
        return null;
    }
}

function clearTravelRecommendations(){
    document.getElementById("search").value ="";
    document.getElementById("items").innerHTML="";
}

