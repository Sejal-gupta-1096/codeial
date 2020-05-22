//Comments added Via AJAX



let createComment = function(){
    let commentsForm = $(".comments-form");
    console.log(commentsForm);
    commentsForm.each(function(){
        console.log($(this));
        let form = $(this);
        form.submit(function(event){
            event.preventDefault();
            $.ajax({
                type : "POST",
                url : "/comments/add-comment",
                data : form.serialize(),
                success : function(data){
                    console.log(data);
                    let newComment = newCommentToBePrepended(data.comment);
                    console.log($(`#comments-list-id-${data.comment.post}`))
                    $(`#comments-list-id-${data.comment.post}`).prepend(newComment);
                    deleteComment($(" .delete-comment-btn" ,newComment));
                    toggleLike($(' .toggle-btn',newComment));
                    notifications('success',data.message);
                    toggleLike();
                   
                },
                error : function(error){
                    console.log(error.responseText);
                }
     
        })
    })
})
}
      
    let newCommentToBePrepended = function(comment){
        return $(`<li id="comment-id-${comment._id }">
                    <a class="delete-comment-btn" href="/comments/delete-comment/${ comment._id }"><i class="fas fa-window-close"></i></a>
            
                    ${ comment.content }
                    ${ comment.user.name }
                    <a data-likes="0" class="toggle-btn" href="/likes/toggle/?id=${comment._id }&type=Comments">${comment.likes.length} Likes</a>
                </li>`
    );
    }
    

    let deleteComment = function(deleteLink){
        console.log(deleteLink);
        $(deleteLink).click(function(event){

            event.preventDefault();
        $.ajax({
            type : "get",
            url : $(deleteLink).prop("href"),
            success : function(data){
                console.log(data)
                console.log($(`#comment-id-${data.comment_id}`))
                $(`#comment-id-${data.comment_id}`).remove();
                notifications('success',data.message);
            },
            error : function(error){
                console.log("Error:",error.responseText);
            }
        });

        })
        
    }

    $(' .post-comments-list>ul li').each(function(){
        deleteComment($(' .delete-comment-btn',$(this)));
    });

    
createComment();