$(document).ready(function(){

    // Materialize Navbar dropdown
    var sideNav = document.querySelectorAll('.sidenav');
     M.Sidenav.init(sideNav, {});

     // Materialize Modal
     var comments = document.querySelectorAll('.modal');
     M.Modal.init(comments, {});
 
             

     // Save Article
     $(".remove").on("click", function() {

        var ID = $(this).data("id");
  
        $.ajax("/api/saved/articles/" + ID, {
          type: "POST",
        }).then(function() {
          location.reload();
        });
      });

  });
        