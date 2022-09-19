function randomID() {
    return Math.floor(Math.random() * 1000)
}
const url = "http://localhost:3000/user/";
function product(id) {
    $.get(url, function (data) {
        $.each(data, function (key, value) {
            if(id == value.id) {
                var x = value.prod_name.split("(")[0]
                $("#name").val(x)
                $("#description").val(value.prod_desc)
                $("#price").val(value.prod_price)
            }
        })
    })
}

function save(id){
    console.log(url + id)
    $.ajax({
        url: url+ id,
        method:"PUT",
        data: {
            
            prod_name: $("#name").val(),
            prod_desc: $("#description").val(),
            prod_price: $("#price").val()
        }
    })

}
              
$(document).ready(function () {
    var container = " ";
    $.get("http://localhost:3000/user/", function (data){
        $.each(data, function (key, value) {
            container += "<tr>";
            container += "<td>" + value.prod_name + "</td>";
            container += "<td>" + value.prod_desc + "</td>";
            container += "<td>" + value.prod_price + "</td>";
            container += "<td>" + `<input type="submit" value="edit" onclick="product('${value.id}')"  id='${value.id}'>` + "</td>";
            container += "<td>" + `<input type="submit" value="save"   class="save" onclick="save('${value.id}')">` + "</td>";
        })
        $("#table").append(container);
    })
    $("#get").click(function (e) {
        e.preventDefault();
        $.post({
            url: "http://localhost:3000/user/",

            data: {
                id: randomID(),
                prod_name: $("#name").val() + "(Bhakti)",
                prod_desc: $("#description").val(),
                prod_price: $("#price").val()

            },
            success: function () {
                $("#table").append(container);
            }
        })
    })
    $("#filter").click(function(){
        $("#table tr:not(:first)").empty()
        $.get(url, function (data) {
            container="";
            $.each(data, function (key, value){
                if(value.prod_name.includes("(Bhakti)")){
                    container += "<tr>";
                    container += "<td>" + value.prod_name + "</td>";
                    container += "<td>" + value.prod_desc + "</td>";
                    container += "<td>" + value.prod_price + "</td>";
                    container += "<td>" + `<input type="submit" value="edit" onclick="product('${value.id}')"  id='${value.id}'>` + "</td>";
                    container += "<td>" + `<input type="submit" value="save"   class="save" onclick="save('${value.id}')">` + "</td>";
                }
                $("#table").append(container)
            })
        })
    })
})