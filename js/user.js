$(document).ready(function () {
  var orderCardBody = $("#table-body");

  function createOrderCard(orderData) {
    for (i = 0; i < orderData.length; i++) {
      var tableRow = $("<tr>").addClass("order-item-wrapper");
      var orderId = $("<td>").addClass("table-data-fade").text(orderData[i].id);
      var userImg = $("<img>").attr({
        src: orderData[i].profilePic,
        alt: "profile pick",
      });
      var userAvtar = $("<td>").addClass("table-data").append(userImg);
      var userName = $("<td>")
        .addClass("table-data-fade")
        .text(orderData[i].fullName);
      var dateOfBirth = $("<td>").addClass("table-data").text(orderData[i].dob);
      var gender = $("<td>")
        .addClass("table-data-fade")
        .text(orderData[i].gender);
      var location = $("<td>")
        .addClass("table-data-fade")
        .text(orderData[i].currentCity + ", " + orderData[i].currentCountry);

      tableRow.append(
        orderId,
        userAvtar,
        userName,
        dateOfBirth,
        gender,
        location
      );
      orderCardBody.append(tableRow);
    }
  }

  $.get(
    "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
    function (data) {
      createOrderCard(data);
    }
  );

  

  $("#form-search").submit(function (e) {
    e.preventDefault();
    var searchBox = $("#input-search").val();

    if(searchBox.length >= 2) {
      $.get(
        "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=" +
          searchBox,
        function (data) {
          $("#table-body").html("")
          createOrderCard(data);
        }
      );

      $("#reset-btn").click(function() {
        $("#table-body").html("")
        $.get(
            "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
            function (data) {
              createOrderCard(data);
            }
          );
      });
    }else {
      alert("Please enter atleast 2 characters!")
    }
  });

  


});
