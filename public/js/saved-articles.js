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



    // Pass data-id to modal
    $(".discuss").on("click", function () {
        var id = $(this).data('id');
        $(".comment-submit").attr("data-id", id);

        $.ajax("/api/articles/" + id, {
            type: "GET"
        }).then(function (data) {
            console.log(data.comment.name);
            // Get comment data and post to modal
            $(".comments").append("<h1>yo</h1>")
            for (i = 0; i < data.length; i++) {
                console.log("at")
                $(".comments").append("<div><h6>" + data[i].comment.name + "</h6><h6>" + data.comment[i].text + "</h6><hr></div>")
            }
        });
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
        }).then(function () {
        });
    });


});
