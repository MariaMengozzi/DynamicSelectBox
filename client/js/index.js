var options = []
var count = 0

$(document).ready(function () {

    $("body").click(function (event) {
        if ($(event.target).parents('.dropdown').length == 0) {
            //close the dropdown when i click outside
            $("#myDropdown").hide()
        }
    });

    /* $(".dropbtn").click(function () {
        $("#myDropdown").toggle()
    }); */

    $("#myInput").keyup(function(){
        const input = $(this)
        const filter = input.val().toUpperCase()
        const li = $("li")

        for (let i = 0; i < li.length; i++) {
            txtValue = li[i].textContent || li[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    });

    $("#myInput").focusin(function () {
        $('#myDropdown').empty()
        $.ajax({
            url: "http://127.0.0.1:8000/options", 
            type: "get",
            success: function (result) {
                result["opt"].forEach(element => {
                    $("#myDropdown").append(`<li tabindex='-1'>${element}</li>`);
                });
            },
            error: function(res){
                console.log(res)
            }
        });
        $("#myDropdown").show()
    });

    $(document).on("click", "li", function () {
        //add the event dynamically to all li
        $(this).focus()
        $("#myInput").val($(this).text())
    });
    
    /* $("li").on("click", function(){
        $(this).focus()
        $("#myInput").val($(this).text())
    }); */

    $(document).on("keydown", "li", function (e) {
        if (e.keyCode == 40) {
            $("li:focus").closest("li").next().focus();
            return false;
        }
        if (e.keyCode == 38) {
            $("li:focus").closest("li").prev().focus();
            return false;
        }
    });

    /* $("li").on("keydown", function (e) {

        if (e.keyCode == 40) {
            $("li:focus").closest("li").next().focus();
            return false;
        }
        if (e.keyCode == 38) {
            $("li:focus").closest("li").prev().focus();
            return false;
        }
    }); */

    $("ul").keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $("#myInput").val($('li:focus').text())
            $("#myDropdown").hide()
            return false
        }
    });   

    
});
