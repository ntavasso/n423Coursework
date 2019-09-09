
function initApp() {
    $.getJSON("data/data.json", function (result) {
        //success one 
        console.log(result.speakers);
        let listArray = result.speakers;

        // $.each(listArray, function (idx, listName) {
        //     $(".JSON").append(
        //         `<div class="wrapper">`
        //             `<div class="imageWrapper">`
        //                 `<p><img src="${listName.photo}"></p>`,
        //             `</div>`
        //             `<div class="contentWrapper">`
        //                 `<p>${listName.name}</p>`,
        //                 `<p>${listName.suffix}</p>`,
        //                 `<p>${listName.age}</p>`,
        //                 `<p>${listName.description}</p>`
        //             `</div>`
        //         `</div>`

        //     )
        // });
        $.each(listArray, function (idx, listName) {
            $(".content").append(
                
                        `<div class="flexWrapper"><div class="image"><img src="${listName.photo}"></div>
                        <div class="bio"><p>${listName.suffix}  ${listName.name}</p><p>Age: ${listName.age}</p><p class="bioClass">Bio: ${listName.description}</p></div></div>`
                        // `<p>${listName.suffix}</p>`,
                        // `<p>${listName.age}</p>`,
                        // `<p>${listName.description}</p></div>`
                

            )
        });

    }).fail(function (err) {
        console.log(err);
    });
}

let currentView = "home";


function init() {
    // let currentView = "home";

    $("nav a").click(function (e) {
        let pageName = e.currentTarget.id;

        if (pageName != currentView) {
            $("." + currentView).css("display", "none");
            $("." + pageName).css("display", "block");
            currentView = pageName;
        }
    });

    $("footer a").click(function (e) {
        let pageName = e.currentTarget.class;

        if (pageName != currentView) {
            $("." + currentView).css("display", "none");
            $("." + pageName).css("display", "block");
            currentView = pageName;
        }
    });

    // $("btnDiv").click(function (e) {
    //     let pageName = e.currentTarget.class;

    //     if (pageName != currentView) {
    //         $("." + currentView).css("display", "none");
    //         $("." + pageName).css("display", "block");
    //         currentView = pageName;
    //     }
    // });

    // FIREBASE_UTILITY.writeData();

    $(document).on('click', '#display', function (e) {
        let pageName = e.currentTarget.id;
        console.log("display");
        if (pageName != currentView) {
            $("." + currentView).css("display", "none");
            $("." + pageName).css("display", "block");
            currentView = pageName;
        }
        // FIREBASE_UTILITY.updateRecipe();
    });

}





$(document).ready(function () {
    $("." + currentView).css("display", "block");
    initApp();
    init();
})