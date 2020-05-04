//Submitting data via AJAX

let createPost = function(){
    event.preventDefault();   // Which event is this referering to?
    let postForm = $("#post-form");

        $.ajax({
            type : "POST",
            url : "/posts/add-post",
            data : postForm.serialize(),
            success : function(data){
                console.log("data Posted",data.post);
                let newPost = newPostToBePrepended(data.post);
                let aNewPost = $('a',$(newPost))[0];
                $(aNewPost).click(deletePost(aNewPost));
                $("#posts-list").prepend(newPost);
            },
            error : function(error){
                console.log(error.responseText);
            }
                
            })
        }

//New Post Added to be displayed in View
let newPostToBePrepended = function(post){
    return `<li>  
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
            </li>`;
}

let deletePost = function(deleteLink){
        console.log(deleteLink);
        console.log($(deleteLink).prop("href"));
        event.preventDefault();
        console.log($(`#post-${data.post_id}`));
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


//Comments added Via AJAX

let createComment = function(){
    console.log("Hiii")
    event.preventDefault();
    let CommentForm = $("#comment-form");
    //commentForm.submit(function(event){
       

        $.ajax({
            type : "POST",
            url : "/comments/add-comment",
            data : commentForm.serialize(),
            success : function(data){
                console.log(data);
                let newComment = newCommentToBePrepended(data.comment);
                 $("#comments-list").prepend(newComment);
            },
            error : function(error){
                console.log(error.responseText);
            }
                
            })
        }
        //)
    //}

    let newCommentToBePrepended = function(comment){
        return $(`<li>
                    <a href="/comments/delete-comment/<%= comment._id %>"><i class="fas fa-window-close"></i></a>
            
                    ${ comment.content }
                    ${ comment.user.name }
                </li>`
    );
    }

    