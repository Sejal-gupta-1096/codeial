//Comments added Via AJAX


let createComment = function(){
    let commentsForm = $(".comments-form");
    console.log(commentsForm);
    commentsForm.each(function(){
        let form = $(this);
        form.submit(function(){
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

                     $(' a',newComment).click(function(){
                        deleteComment($(this));
                    });
                    notifications('success',data.message);
                   
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
                    <a href="/comments/delete-comment/${ comment._id }"><i class="fas fa-window-close"></i></a>
            
                    ${ comment.content }
                    ${ comment.user.name }
                </li>`
    );
    }
    

    let deleteComment = function(deleteLink){
        console.log(deleteLink);
        console.log($(deleteLink).prop("href"));
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
                console.log(error.responseText);
            }
        });
    }

    
createComment();