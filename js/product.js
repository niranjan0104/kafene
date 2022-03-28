$(document).ready(function() {

    var orderCardBody = $("#table-body");
    var currentTime = new Date().getTime();
    var dataReceved = [];
    
    function createOrderCard(orderData) {
        for (i=0; i<orderData.length; i++) {

            var  tableRow= $("<tr>").addClass("order-item-wrapper").attr("id", "product" + "-" + new Date(orderData[i].expiryDate).getTime()+"-"+orderData[i].stock+"-"+i);
            var orderId = $("<td>").addClass("table-data-fade").text(orderData[i].id)
            var productName = $("<td>").addClass("table-data").text(orderData[i].medicineName);
            var productBrand = $("<td>").addClass("table-data-fade").text(orderData[i].medicineBrand);
            var expiryDate = $("<td>").addClass("table-data").text(orderData[i].expiryDate);
            var unitPrice = $("<td>").addClass("table-data-fade").text("$"+orderData[i].unitPrice);
            var stock = $("<td>").addClass("table-data-fade").text(orderData[i].stock);

            tableRow.append(orderId, productName, productBrand, expiryDate, unitPrice, stock)
            orderCardBody.append(tableRow);
        }
    }

    $.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products", function(data) {
        dataReceved = data;
        // console.log(dataReceved);
        createOrderCard(data);
    });


    $('input[type="checkbox"]').click(function () {
        var trIds = $("tr");
        if ($(this).prop("checked") == true) {
            for (let i = 0; i < 100; i++) {
            if(currentTime > (trIds[(i+1)].id.split("-")[1])) {
                $("#product" + "-" + trIds[(i+1)].id.split("-")[1]+"-"+dataReceved[i].stock+"-"+i).css("display", "table-row") 
              } else if( this.value === "Low Stock") {
                if (dataReceved[i].stock < 100) {
                    $("#product" + "-" + trIds[(i+1)].id.split("-")[1]+"-"+dataReceved[i].stock+"-"+i).css("display", "table-row") 
                }
            }
            }
        }
        else if ($(this).prop("checked") == false) {
            for (let i = 0; i < 100; i++) {
                if(this.value === "Expired") {
                    if(currentTime > (trIds[(i+1)].id.split("-")[1])) {
                      $("#product" + "-" + trIds[(i+1)].id.split("-")[1]+"-"+dataReceved[i].stock+"-"+i).css("display", "none") 
                    } 
                } else if( this.value === "Low Stock") {
                    if (dataReceved[i].stock < 100) {
                        $("#product" + "-" + trIds[(i+1)].id.split("-")[1]+"-"+dataReceved[i].stock+"-"+i).css("display", "none") 
                    }
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

})