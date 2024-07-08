var noVisOptions = 0
var start = 0
var end = 10//100
var oldSearchLength = 0
var options = []

$(document).ready(function () {
    var $listContainer = $("#myDropdown");
    var $list = $("#myDropdown");
    var itemCount = end;
    
    $("#myDropdown").append("<li tabindex='1'>test</li>")
    var itemHeight = $("li").outerHeight(true); //include height, padding, border and margin
    $("#myDropdown").empty()

    var containerHeight = $("#myDropdown").height();
    $("#myDropdown").css('height', 'auto');

    var numVisibleItems = Math.floor(containerHeight / itemHeight);
    var currentIndex = 0;
    var pageNum = 1;

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
                    noVisOptions = end == result["opt"].length
                    options = result["opt"]
                    //azzero la lista
                    currentIndex = 0
                    pageNum = 1
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
                    noVisOptions = end == result["opt"].length
                    options = result["opt"]
                    currentIndex = 0
                    pageNum = 1
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
        oldSearchLength = $("#myInput").val().length
    });
    
    /* $("li").on("click", function(){
        $(this).focus()
        $("#myInput").val($(this).text())
    }); */


    $(document).on("keydown", "li", function (e) {
        e.preventDefault();
        
        if (e.keyCode == 40) { //arrow down
            focusedIndex = options.indexOf($("li:focus").text())
            console.log(noVisOptions)
            if ((focusedIndex == options.length - 1) && noVisOptions){
                pageNum = pageNum + 1
                query = "start=" + (start + (end) * (pageNum - 1)) + "&end=" + (end*pageNum) + "&filter=" + $("#myInput").val()
                $.ajax({
                    url: "http://127.0.0.1:8000/options?" + query,
                    type: "get",
                    success: function (result) {
                        noVisOptions = end == result["opt"].length
                        if (result["opt"].length > 0 && noVisOptions) {
                            options = result["opt"]
                            $('#myDropdown').empty()
                            currentIndex = 0
                            itemCount = result["opt"].length
                            createListItems();
                            updateList();
                            $('li:contains("' + options[0] + '")').first().focus()
                        }
                    },
                    error: function (res) {
                        console.log(res)
                    }
                });
            } else {
                currentIndex = Math.min(itemCount - numVisibleItems, currentIndex + 1);
                text = focusedIndex < options.length - 1 ? options[focusedIndex + 1] : options[focusedIndex]
                createListItems();
                updateList();
                $('li:contains("' + text + '")').first().focus();
            }
            return false;
        }
        if (e.keyCode == 38) { //arrow up
            focusedIndex = options.indexOf($("li:focus").text())
            if(pageNum > 1 && focusedIndex == 0){
                pageNum = pageNum - 1
                query = "start=" + (currentIndex + (end) * (pageNum - 1)) + "&end=" + (currentIndex+(end * pageNum)) + "&filter=" + $("#myInput").val()
                $.ajax({
                    url: "http://127.0.0.1:8000/options?" + query,
                    type: "get",
                    success: function (result) {
                        noVisOptions = end == result["opt"].length
                        options = result["opt"]
                        currentIndex = (options.length) - numVisibleItems
                        itemCount = result["opt"].length
                        $('#myDropdown').empty()
                        createListItems();
                        updateList();
                        $('li:contains("' + options[options.length - 1] + '")').first().focus()
                    },
                    error: function (res) {
                        console.log(res)
                    }
                });
            } else {
                currentIndex = Math.max(0, currentIndex - 1);
                text = focusedIndex > 0 ? options[focusedIndex - 1] : options[focusedIndex]
                createListItems();
                updateList();
                $('li:contains("' + text + '")').first().focus();
            }
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
            oldSearchLength = $("#myInput").val().length
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
            if (($listContainer.scrollTop() == 0) 
                && (pageNum > 1) 
            &&  $("li:first-child").text() == options[0]) {
                $('#myDropdown').empty()
                pageNum = pageNum - 1
                query = "start=" + (currentIndex + (end) * (pageNum - 1)) + "&end=" + (currentIndex + (end * pageNum)) + "&filter=" + $("#myInput").val()
                $.ajax({
                    url: "http://127.0.0.1:8000/options?" + query,
                    type: "get",
                    success: function (result) {
                        noVisOptions = end == result["opt"].length
                        options = result["opt"]
                        currentIndex = (options.length) - numVisibleItems
                        itemCount = result["opt"].length
                        createListItems();
                        updateList();
                    },
                    error: function (res) {
                        console.log(res)
                    }
                });
            } else {
                currentIndex = Math.max(0, currentIndex - 1);
                createListItems();
                updateList();
            }
        } else {
            if ((($listContainer.scrollTop() + $listContainer.height()) == $listContainer.height()) 
                && ($("li:last-child").text() == options[options.length-1])
                && noVisOptions) {
                pageNum = pageNum + 1
                query = "start=" + (start + (end) * (pageNum - 1)) + "&end=" + (end * pageNum) + "&filter=" + $("#myInput").val()
                $.ajax({
                    url: "http://127.0.0.1:8000/options?" + query,
                    type: "get",
                    success: function (result) {
                        noVisOptions = end == result["opt"].length
                        if (result["opt"].length > 0 && noVisOptions) {
                            options = result["opt"]
                            $('#myDropdown').empty()
                            currentIndex = 0
                            itemCount = result["opt"].length
                            createListItems();
                            updateList();
                        }
                    },
                    error: function (res) {
                        console.log(res)
                    }
                });
            } else {
                currentIndex = Math.min(itemCount - numVisibleItems, currentIndex + 1)
                createListItems();
                updateList();
            }
        }
    });

});
