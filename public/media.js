<!DOCTYPE html>
<html>

<head>
    <%- include('partials/head') %>
        <script src="/media.js" defer></script>
        <link rel="stylesheet" href="/css/media.css">
</head>

<body>


    <%- include('partials/topnav') %>


        <div class="main-container">

            <div class="filter-container">

                <div class="list-group species">
                    <h3 class="collapsible">Species</h3>
                    <div class="box-selector"></div>
                </div>

                <div class="list-group year">
                    <h3 class="collapsible">Year</h3>
                    <div class="box-selector"></div>
                </div>
            </div>

            <div class="content-container">
                
            </div>

            <a href="/media/share"><div id="share-btn">share</div></a>

        </div>

        <%- include('partials/footer') %>

</body>

<script>



</script>

</html>
