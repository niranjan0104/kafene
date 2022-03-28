$(document).ready(function () {
  var orderCardBody = $("#table-body");

  function createOrderCard(orderData) {
    for (i = 0; i < orderData.length; i++) {
      var tableRow = $("<tr>")
        .addClass("order-item-wrapper")
        .attr("id", orderData[i].orderStatus + "-" + i);
      var orderId = $("<td>").addClass("table-data-fade").text(orderData[i].id);
      var custName = $("<td>")
        .addClass("table-data")
        .text(orderData[i].customerName);
      var orderTime = $("<td>")
        .addClass("table-data")
        .html(
          `${orderData[i].orderDate} <span> ${orderData[i].orderTime}</span>`
        );
      var priceItem = $("<td>")
        .addClass("table-data-fade")
        .text("$" + orderData[i].amount);
      var statusOrder = $("<td>")
        .addClass("table-data")
        .text(orderData[i].orderStatus);

      tableRow.append(orderId, custName, orderTime, priceItem, statusOrder);
      orderCardBody.append(tableRow);
    }
  }

  $.get(
    "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders",
    function (data) {
      createOrderCard(data);
    }
  );

  $('input[type="checkbox"]').click(function () {
    if ($(this).prop("checked") == true) {
      for (let i = 0; i <= 100; i++) {
        switch (this.value) {
          case "New":
            $("#New-" + i).css("display", "table-row");
            break;
          case "Packed":
            $("#Packed-" + i).css("display", "table-row");
            break;
          case "InTransit":
            $("#InTransit-" + i).css("display", "table-row");
            break;
          case "Delivered":
            $("#Delivered-" + i).css("display", "table-row");
            break;
          default:
            console.log("something wrong refresh the page");
            break;
        }
      }
    } else if ($(this).prop("checked") == false) {
      for (let i = 0; i <= 100; i++) {
        switch (this.value) {
          case "New":
            $("#New-" + i).css("display", "none");
            break;
          case "Packed":
            $("#Packed-" + i).css("display", "none");
            break;
          case "InTransit":
            $("#InTransit-" + i).css("display", "none");
            break;
          case "Delivered":
            $("#Delivered-" + i).css("display", "none");
            break;
          default:
            console.log("something wrong refresh the page");
            break;
        }
      }
    }

    let count = [];
    $(".order-item-wrapper").each(function () {
      count.push($(this).css("display"));
      let filterArr = count.filter((disVal) => disVal == "table-row");
      $("#order-count").text("Count: " + filterArr.length);
    });
  });
});

