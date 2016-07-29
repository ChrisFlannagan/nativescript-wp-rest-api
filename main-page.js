var ObservableArray = require("data/observable-array").ObservableArray;
var Observable = require("data/observable").Observable;
var page;

exports.loaded = function(args) {
    var postTitles = new ObservableArray([].map(function(postTitle) {
        return new Observable({
            postName: postTitle
        });
    }));
    page = args.object;
    page.bindingContext = {
        postList: postTitles
    };

    fetch("https://www.babyquasar.com/wp-json/posts?filter[category]=Tutorials&filter[posts_per_page]=5", {
        method: "GET",
        body: '',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    })
        .then(handleErrors)
        .then(function(data) {
            var posts = JSON.parse(data._bodyInit);
            posts.forEach(function(post) {
                postTitles.push({ postName: post['title'] });
            });
        });
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}