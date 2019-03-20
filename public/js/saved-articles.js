$(document).ready(function () {

    // Materialize Navbar dropdown
    var sideNav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sideNav, {});

    // Materialize Modal
    var comments = document.querySelectorAll('.modal');
    M.Modal.init(comments, {});

    // Materialize textarea character limit
    var textNeedCount = document.querySelectorAll('#modal-textarea');
    M.CharacterCounter.init(textNeedCount, {});

    function dataLoop (data) {
        console.log(data);
        for (var i = 0; i < data.comment.length; i++) {
            console.log(data.comment[i].name);
            $(".comments").append("<div class='eachComment'><p>" + "<strong>" + data.comment[i].name + "</strong>" + ":  " +  data.comment[i].text + "</p></div><hr>");

        }
    }

    // Pass data-id to modal
    $(".discuss").on("click", function () {
        var id = $(this).data('id');
        $(".comment-submit").attr("data-id", id);
    });
    
    

    // Remove Article
    $(".remove").on("click", function () {

        var ID = $(this).data("id");

        $.ajax("/api/saved/articles/" + ID, {
            type: "POST",
        }).then(function () {
            location.reload();
        });
    });

    $(".discuss").on("click", function () {
        var id = $(this).data("id");
        $.ajax("/api/articles/comments/" + id, {
            type: "GET"
        }).then(function (data) {
            console.log(data);

            dataLoop(data);
        });
    });

    // Post user comments
    $(".comment-submit").on("click", function () {
        var name = $("#modal-name").val().trim();
        var text = $("#modal-textarea").val().trim();
        var id = $(this).data("id");

        $.ajax("/api/comment/" + id, {
            type: "POST",
            data: {
                name,
                text
            }
        }).then(function (data) {
            $("#modal-name").val("");
            $("#modal-textarea").val("");

            $(".comments").append("<div><h6>" + name + ":  " + "</h6><h6>" + text + "</h6a></div><hr>");

        });
    });


});
