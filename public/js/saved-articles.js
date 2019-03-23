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

    function dataLoop(data) {
        var numofComments = 0;
        $(".comments").empty();

        for (var i = 0; i < data.comment.length; i++) {
            numofComments++;
            $(".comments").append("<div class='eachComment'><h6>" + data.comment[i].name + "</h6><p>" + data.comment[i].text + "</p></div><hr>");
        };
        $(".numOfComments").text(numofComments);
    };

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

    // Get back the Article and all comments associated with it
    $(".discuss").on("click", function () {
        var id = $(this).data("id");
        $.ajax("/api/articles/comments/" + id, {
            type: "GET"
        }).then(function (data) {
            $(".comment-headline").text(data.headline)
            dataLoop(data);
        });
    });

    // Post user comments
    $(".comment-submit").on("click", function () {
        var name = $(".modal-name").val().trim();
        var text = $(".modal-textarea").val().trim();
        var id = $(this).data("id");

        if (name === "" || text === "") {
            console.log("Name or Textarea cannot be empty");
        }else {
            $.ajax("/api/comment/" + id, {
                type: "POST",
                data: {
                    name,
                    text
                }
            }).then(function (data) {
                $(".modal-name").val("");
                $(".modal-textarea").val("");
                $(".comments").append("<div class='eachComment'><h6>" + name + "</h6><p>" + text + "</p></div><hr>");
            });
        }
    });


    $(".test-button").on("click", function () {
        var ab = $(".test-input").val().trim();
        var cd = $(".test-textarea").val().trim();
        console.log(ab, cd)
        if (ab === "") {
            console.log("nope");
        } else {
            console.log("yes")
        }
    })

});
