var noVisOptions = 0
var start = 0
var end = 100
var oldSearchLength = 0

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

    $("#myInput").keyup(function(e){
        const input = $(this)
        const filter = input.val().toUpperCase()
        const li = $("li")

        if (($("#myInput").val().length >=2 && noVisOptions)
            || ((oldSearchLength != $("#myInput").val().length) && oldSearchLength >=1)){
            $('#myDropdown').empty()
            query = "start=" + start + "&end=" + end + "&filter=" + $("#myInput").val()

            $.ajax({
                url: "http://127.0.0.1:8000/options?" + query,
                type: "get",
                success: function (result) {
                    noVisOptions = (end -1) ==(result["opt"].length - 1)
                    for (let index = 0; index < end-1 && index < result["opt"].length; index++) {
                        element = result["opt"][index]
                        $("#myDropdown").append(`<li tabindex='1'>${element}</li>`);
                    }
                    if (result["opt"].length == 0){
                        $('#myInput').css('outline', '3px solid red');
                    } 
                    
                    $("#myDropdown").show()
                },
                error: function (res) {
                    console.log(res)
                }
            });

        } else {
            $("#myDropdown").show()
            for (let i = 0; i < li.length; i++) {
                txtValue = li[i].textContent || li[i].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        }

        if (e.keyCode == 13)  // the enter key code
        {
            e.preventDefault();
            $.ajax({
                url: "http://127.0.0.1:8000/options?" + query,
                type: "get",
                success: function (result) {
                    if (result["opt"].length == 0 || !result["opt"].includes($("#myInput").val())) {
                        $('#myInput').css('outline', '3px solid red');
                        $("#myDropdown").hide()
                    }
                    return false;
                },
                error: function (res) {
                    console.log(res)
                    return false
                }
            });
        }

        oldSearchLength = $("#myInput").val().length
        
    });

    $("#myInput").keydown(function (e) {
        $('#myInput').css('outline', '3px solid #ddd');

        if (e.keyCode == 40) {
            $("#myDropdown li:first-child").focus();
            return false;
        }


        if (e.shiftKey && e.keyCode === 9) {
            $("#myDropdown").hide()

            focusable = $('button, [href], input, [tabindex="0"]')
            next = focusable.index($("#myInput"))
            console.log(focusable.index($("#myInput")))
            focusable[next].focus()

        } else if (e.keyCode == 9) {
            $("#myDropdown").hide()
            
            focusable = $('button, [href], input, [tabindex="0"]')
            next = focusable.index($("#myInput"))
            console.log(focusable.index($("#myInput")))
            focusable[next].focus()

        }

    });
    

    $("#myInput").focusin(function () {
        if (!$(this).is(":hidden")){
            $('#myDropdown').empty()
            query = "start=" + start + "&end=" + end + "&filter=" + $("#myInput").val()
            $.ajax({
                url: "http://127.0.0.1:8000/options?" + query,
                type: "get",
                success: function (result) {
                    noVisOptions = (end - 1) == (result["opt"].length - 1)
                    for (let index = 0; index < end - 1 && index < result["opt"].length; index++) {
                        element = result["opt"][index]
                        $("#myDropdown").append(`<li tabindex='1'>${element}</li>`);
                    }
                },
                error: function (res) {
                    console.log(res)
                }
            });
            $("#myDropdown").show()
        }
        
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
        e.preventDefault();
        if (e.keyCode == 40) {
            $("li:focus").closest("li").next().focus();
            return false;
        }
        if (e.keyCode == 38) {
            $("li:focus").closest("li").prev().focus();
            return false;
        }

        
        if (e.keyCode == 9) {
            if (e.shiftKey) {
                $("#myDropdown").hide()
                focusable = $('button, [href], input, [tabindex="0"]')
                next = focusable.index($("#myInput")) -1
                console.log(focusable.index($("#myInput")))
                focusable[next].focus()
            }
            else{
                $("#myDropdown").hide()
                focusable = $('button, [href], input, [tabindex="0"]')
                next = focusable.index($("#myInput")) + 1
                console.log(focusable.index($("#myInput")))
                focusable[next].focus()
            }
            return false
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

    $(".delete").click(function() {
        $("#myInput").val("")
    });

    $(".create").click(function () {
        //check dell'input
        query = "start=" + start + "&end=" + end + "&filter=" + $("#myInput").val()
        $.ajax({
            url: "http://127.0.0.1:8000/options?" + query,
            type: "get",
            success: function (result) {
                if (result["opt"].length == 0) {
                    $('#myInput').css('outline', '3px solid red');
                } else {
                    window.location.replace("https://www.youtube.com/watch?v=k85mRPqvMbE");
                }

            },
            error: function (res) {
                console.log(res)
            }
        });
    });


    
});
