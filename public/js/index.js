  $(document).ready(function(){

    // Materialize Navbar dropdown
    var sideNav = document.querySelectorAll('.sidenav');
     M.Sidenav.init(sideNav, {});

     //Clear all scraped articles excluding saved articles
     $(".clear-all").on("click", function() {

        $.ajax("/api/clear", {
          type: "DELETE",
        }).then(function() {
          location.reload();
         
        });
     });

     // Save Article
    $(".saved-false").on("click", function() {

      var ID = $(this).data("id");
      var Saved = {saved: true};

      $.ajax("/api/articles/" + ID, {
        type: "POST",
        data: Saved
      }).then(function() {
        // setTimeout()
        location.reload();
      });
    });


    $(".scrape").on("click", function () {
      $.ajax({
        method: "GET",
        url: "/api/scrape"
      }).then(function () {

        // Play Loading gif while we Scrape data
        $(".loading").append("<img src='./images/loading.gif' width='300'>")

        setTimeout(function(){
          location.reload(); 
        }, 3000);
        
      });
    });


  });
        