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
        $("#myDropdown").show()
    });

    $("li").click(function(){
        $(this).focus()
        $("#myInput").val($(this).text())
    });

    $("ul").keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $("#myInput").val($('li:focus').text())
            $("#myDropdown").hide()
            return false
        }
    });   

    $("li").on("keydown", function (e) {

        if (e.keyCode == 40) {
            $("li:focus").closest("li").next().focus();
            return false;
        }
        if (e.keyCode == 38) {
            $("li:focus").closest("li").prev().focus();
            return false;
        }
    });
});
