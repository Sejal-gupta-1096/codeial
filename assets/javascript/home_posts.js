//Submitting data via AJAX

let createPost = function(){
    let postForm = $("#post-form");
    postForm.submit(function(){
        event.preventDefault();

        $.ajax({
            type : "POST",
            url : "/posts/add-post",
            data : postForm.serialize(),
            success : function(data){
                console.log("data Posted",data.post);
                let newPost = newPostToBePrepended(data.post);
                $(' a',newPost).click(function(){
                    deletePost($(this));
                });
                $("#posts-list").prepend(newPost);
            },
            error : function(error){
                console.log(error.responseText);
            }
                
            })
    })
       
        }

//New Post Added to be displayed in View
let newPostToBePrepended = function(post){
    return $(`<li id="post-${post._id}">
                <a href="/posts/delete-post/${post._id }"><i class="fas fa-window-close"></i></a>
                ${ post.content }
                <small> ${ post.user.name }</small>

                <div class="posts-comments">
                
                        <form action="/comments/add-comment" method="POST">
                        <input type="text" name="content" required>
                        <input type="hidden" name="post" value="${ post._id }">
                        <input type="submit" value="Add Comment">
                        </form>
                
                </div>
                <div class="post-comments-list">
                <ul>
                </ul>

                </div>
            </li>`);
}

let deletePost = function(deleteLink){
        console.log(deleteLink);
        //console.log(this);
        console.log($(deleteLink).prop("href"));
        event.preventDefault();
        $.ajax({
            type : "get",
            url : $(deleteLink).prop("href"),
            success : function(data){
                $(`#post-${data.post_id}`).remove();
            },
            error : function(error){
                console.log(error.responseText);
            }
        });
    }


createPost();