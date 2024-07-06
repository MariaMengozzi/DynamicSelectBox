var noVisOptions = 0
var start = 0
var end = 100
var oldSearchLength = 0
var options = []

$(document).ready(function () {
    var $listContainer = $("#myDropdown");
    var $list = $("#myDropdown");
    var itemCount = end;
    var itemHeight = 40;
    var containerHeight = 200//$("#myDropdown").height();
    var numVisibleItems = Math.floor(containerHeight / itemHeight);
    var currentIndex = 0;

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
                    options = result["opt"]
                    //azzero la lista
                    currentIndex = 0
                    itemCount = result["opt"].length
                    createListItems();
                    updateList();
                
                    if (result["opt"].length == 0){
                        $('#myInput').css('outline', '3px solid red');
                        $("#myDropdown").hide()
                    } else {
                        $("#myDropdown").show()
                    }
                    
                    
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
                    options = result["opt"]
                    currentIndex = 0
                    itemCount = result["opt"].length
                    createListItems();
                    updateList();
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
        //e.preventDefault();
        
        if (e.keyCode == 40) { //arrow down
            currentIndex = Math.min(itemCount - numVisibleItems, currentIndex + 1);
            focusedIndex = options.indexOf($("li:focus").text())
            text = focusedIndex < options.length - 1 ? options[focusedIndex + 1] : options[focusedIndex]
            createListItems();
            updateList();
            $('li:contains("' + text + '")').first().focus();
            //TODO aggiungi chiamata se sono all'ultimo ed erano presenti altri record nel db -> anche per la rotela
            return false;
        }
        if (e.keyCode == 38) { //arrow up
            currentIndex = Math.max(0, currentIndex - 1);
            focusedIndex = options.indexOf($("li:focus").text())
            text = focusedIndex > 0 ? options[focusedIndex - 1] : options[focusedIndex]
            createListItems();
            updateList();
            $('li:contains("' + text + '")').first().focus();
            //TODO aggiungi chiamata se sono al primo ed erano presenti altri record nel db prima di quelli caricati (es sono alla seconda pagina e devo tornare alla prima) -> anche per la rotela
            return false; 
        }

        
        if (e.keyCode == 9) { //tab
            if (e.shiftKey) {
                $("#myDropdown").hide()
                focusable = $('button, [href], input, [tabindex="0"]')
                next = focusable.index($("#myInput")) -1
                focusable[next].focus()
            }
            else{
                $("#myDropdown").hide()
                focusable = $('button, [href], input, [tabindex="0"]')
                next = focusable.index($("#myInput")) + 1
                focusable[next].focus()
            }
            return false
        }

        if (e.keyCode == 13)  // the enter key code
        {
            $("#myInput").val($('li:focus').text())
            $("#myDropdown").hide()
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


    /* ---- Gestione del virtual scroll ---- */

    function createListItems() {
        var start = currentIndex;
        var end = currentIndex + numVisibleItems//itemCount < numVisibleItems ? currentIndex + itemCount : currentIndex + numVisibleItems;
        $list.empty();
        for (var i = start; i < end && i < itemCount; i++) {
            if (i < itemCount && options[i] != undefined) {
                $list.append(`<li tabindex='1'>${options[i]}</li>`);
            }
        }
    }

    function updateList() {
        var start = currentIndex;
        var end = currentIndex + numVisibleItems //itemCount < numVisibleItems ? currentIndex + itemCount : currentIndex + numVisibleItems;
        $list.children().hide();
        $list.children().slice(start - currentIndex, end - currentIndex).show();
    }

    $listContainer.on("wheel", function (e) {
        e.preventDefault();
        var delta = e.originalEvent.deltaY; /* Questa linea ottiene il valore dello scorrimento verticale. Il valore di deltaY sarà negativo se l'utente sta scorrendo verso l'alto, e positivo se sta scorrendo verso il basso */
        if (delta < 0) {
            currentIndex = Math.max(0, currentIndex - 1);
        } else {
            currentIndex = Math.min(itemCount - numVisibleItems, currentIndex + 1);
        }
        createListItems();
        updateList();
    });
});
