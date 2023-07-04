let ipAddress = ""; // Global variable to store IP address
let map; // Global variable to store the Leaflet map object
let marker; // Global variable to store the Leaflet marker object

function getUserIPAddress() {
    // Using a free third-party service to get the IP address
    $.getJSON("https://api.ipify.org?format=json", function (data) {
        ipAddress = data.ip;
        $("#ip").html(data.ip);
    });
}

$(document).ready(function () {
    getUserIPAddress();

    $("#dataBtn").click(function () {
        $("#dataBtn").css("display", "none");
        var pincode = "ENTER_YOUR_PINCODE_HERE";
        // console.log("heelo");
        var inputField = $("<input>").attr({
            type: "text",
            id: "searchInput",
            placeholder: "Search by name or branch office",
        });
        inputField.insertBefore("#targetDiv");
        //   Make API request to get location information
        $.getJSON(
            `https://ipinfo.io/${ipAddress}/json?token=7c6f2ff7f7b29d`,
            function (data) {
                // Extract latitude and longitude from API response
                const [lat, long] = data.loc.split(",");
                $("#lat").html("<b>Lat:</b> " + lat);
                $("#city").html("<b>City :</b> " + data.city);
                $("#orga").html("<b>Organisation :</b> " + data.org);
                $("#long").html("<b>Long :</b> " + long);
                $("#region").html("<b>Region :</b> " + data.region);
                $("#hostname").html("<b>Hostname :</b> " + data.country);

                // Display the user's location on the map
                console.log(data);
                showLocationOnMap(lat, long);
                $("#timezone").html("<b>Timezone :</b> " + data.timezone);
                dateTime(data.timezone);

                $("#pincode").html("<b>Pincode :</b> " + data.postal);
                fetchPostalOffices(data.postal);

                //   $.getJSON(
                //     `https://api.postalpincode.in/pincode/${data.postal}`,
                //     function (data) {
                //       console.log(data);
                //       $("#message").html("Message : " + data[0].Message);
                //     }
                //   );
            }
        );
    });
});
function showLocationOnMap(latitude, longitude) {
    if (map) {
        // Remove previous marker if exists
        if (marker) {
            map.removeLayer(marker);
        }
        map.setView([latitude, longitude], 12);
        marker = L.marker([latitude, longitude]).addTo(map);
    } else {
        map = L.map("map").setView([latitude, longitude], 12);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors",
            maxZoom: 18,
        }).addTo(map);
        marker = L.marker([latitude, longitude]).addTo(map);
    }
}
function dateTime(timezone) {
    let datetime_str = new Date().toLocaleString("en-US", {
        timeZone: timezone,
    });
    $("#datetime").html("<b>Date and Time :</b> " + datetime_str);
}
function fetchPostalOffices(pincode) {
    var url = `https://api.postalpincode.in/pincode/${pincode}`;

    $.getJSON(url, function (response) {
        if (response[0].Status === "Success") {
            console.log(response);
            $("#message").html("<b>Message :</b> " + response[0].Message);
            $("#searchInput").css("visibility", "visible");
            var postalOffices = response[0].PostOffice;
            displayPostalOffices(postalOffices);
        } else {
            alert("No postal offices found for the given pincode.");
        }
    }).fail(function () {
        alert("Error occurred while fetching postal offices.");
    });
}

// Function to generate HTML for postal office card
function generateCardHTML(office) {
    var cardHTML =
        '<div class="card">' +
        "<p>Name: " +
        office.Name +
        "</p>" +
        "<p>Branch Type: " +
        office.BranchType +
        "</p>" +
        "<p>Delivery Status: " +
        office.DeliveryStatus +
        "</p>" +
        "<p>District: " +
        office.District +
        "</p>" +
        "<p>Division: " +
        office.Division +
        "</p>" +
        "</div>";
    return cardHTML;
}

// Function to display postal offices
function displayPostalOffices(postalOffices) {
    var postalOfficesContainer = $("#postalOfficesContainer");
    postalOfficesContainer.empty();

    postalOffices.forEach(function (office) {
        var cardHTML = generateCardHTML(office);
        postalOfficesContainer.append(cardHTML);
    });
}

// Event listener for search input
$("#searchInput").on("input", function () {
    var searchValue = $(this).val().toLowerCase();
    var postalOffices = $(".card");

    postalOffices.each(function () {
        var officeName = $(this).find("p").text().toLowerCase();

        if (officeName.includes(searchValue)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});

 