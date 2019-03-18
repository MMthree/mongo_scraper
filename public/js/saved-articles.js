$(document).ready(function(){

    // Materialize Navbar dropdown
    var sideNav = document.querySelectorAll('.sidenav');
     M.Sidenav.init(sideNav, {});

     // Save Article
     $(".saved-true").on("click", function() {

        var ID = $(this).data("id");
  
        $.ajax("/api/saved/articles/" + ID, {
          type: "POST",
        }).then(function() {
          location.reload();
        });
      });

  });
        