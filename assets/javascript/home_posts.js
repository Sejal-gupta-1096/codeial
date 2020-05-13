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
                console.log(newPost);
                console.log($(' .delete-post-btn',newPost));
                deletePost($(' .delete-post-btn',newPost));
                toggleLike($(' .toggle-btn',newPost));
                $("#posts-list").prepend(newPost);
                notifications('success',data.message);
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
                <a class="delete-post-btn" href="/posts/delete-post/${post._id }"><i class="fas fa-window-close"></i></a>
                ${ post.content }
                <small> ${ post.user.name }</small>
                <a data-likes="0" class="toggle-btn" href="/likes/toggle/?id=${post._id}&type=Posts">${post.likes.length} Likes</a>
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
        $(deleteLink).click(function(event){
            console.log($(deleteLink).prop("href"));
        event.preventDefault();
        $.ajax({
            type : "get",
            url : $(deleteLink).prop("href"),
            success : function(data){
                $(`#post-${data.post_id}`).remove();
                notifications('success',data.message);
            },
            error : function(error){
                console.log(error.responseText);
            }
        });
    }
)
}

//Method to loop over previously created Post and call DeletePost on it

    $('#posts-list>li').each(function(){
        deletePost($(' .delete-post-btn',$(this)));
    });

    let notifications = function(type,text){
                new Noty({
                    theme: 'relax',
                    text: text,
                    type: type,
                    layout: 'topRight',
                    timeout: 1000
                }).show();
            }


createPost()