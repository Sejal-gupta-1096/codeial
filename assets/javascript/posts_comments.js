// //Comments added Via AJAX

// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments {
  // constructor is used to initialize the instance of the class whenever a new instance is created
  constructor(postId) {
    this.postId = postId;
    this.postContainer = $(`#post-${postId}`);
    this.newCommentForm = $(`#post-${postId}-comments-form`);
    this.createComment(postId);

    let self = this;
    // call for all the existing comments
    $(" .delete-comment-btn", this.postContainer).each(function () {
      self.deleteComment($(this));
    });
  }

  createComment(postId) {
    let pSelf = this;
    this.newCommentForm.submit(function (e) {
      e.preventDefault();
      let self = this;

      $.ajax({
        type: "post",
        url: "/comments/add-comment",
        data: $(self).serialize(),
        success: function (data) {
          let newComment = pSelf.newCommentDom(data.comment);
          console.log($(`#post-comments-${postId}`));
          $(`#post-comments-${postId}`).prepend(newComment);
          pSelf.deleteComment($(" .delete-comment-btn", newComment));

          new Noty({
            theme: "relax",
            text: "Comment published!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }

  newCommentDom(comment) {
    // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
    return $(`<div id='comment-${comment._id}' class="post-comment-item">
        <div class="post-comment-header">
          <span class="post-comment-author">${comment.user.name}</span>
          <span class="post-comment-time">a minute ago</span>
          <div class="post-actions">
            <button class="post-like no-btn">
            <img
              src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
              alt="likes-icon"
            />
              <span class="post-comment-likes"
                >${comment.likes.length} likes</span>
            </button>
          </div>
          <button class="delete-btn no-btn">
            <a
              class="delete-comment-btn delete-post-btn"
              href="/comments/delete-comment/${comment._id}"
              ><i class="fas fa-times"></i
            ></a>
          </button>
        </div>
      
        <div class="post-comment-content">${comment.content}</div>
      </div>
      `);
  }

  deleteComment(deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#comment-${data.comment_id}`).remove();

          new Noty({
            theme: "relax",
            text: "Comment Deleted",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }
}

// let createComment = function(){
//     let commentsForm = $(".comments-form");
//     console.log(commentsForm);
//     commentsForm.each(function(){
//         console.log($(this));
//         let form = $(this);
//         form.submit(function(event){
//             event.preventDefault();
//             $.ajax({
//                 type : "POST",
//                 url : "/comments/add-comment",
//                 data : form.serialize(),
//                 success : function(data){
//                     console.log(data);
//                     let newComment = newCommentToBePrepended(data.comment);
//                     console.log($(`#comments-list-id-${data.comment.post}`))
//                     $(`#comments-list-id-${data.comment.post}`).prepend(newComment);
//                     deleteComment($(" .delete-comment-btn" ,newComment));
//                     toggleLike($(' .toggle-btn',newComment));
//                     notifications('success',data.message);
//                     toggleLike();

//                 },
//                 error : function(error){
//                     console.log(error.responseText);
//                 }

//         })
//     })
// })
// }

//     let newCommentToBePrepended = function(comment){
//         return $(`<li id="comment-id-${comment._id }">
//                     <a class="delete-comment-btn" href="/comments/delete-comment/${ comment._id }"><i class="fas fa-window-close"></i></a>

//                     ${ comment.content }
//                     ${ comment.user.name }
//                     <a data-likes="0" class="toggle-btn" href="/likes/toggle/?id=${comment._id }&type=Comments">${comment.likes.length} Likes</a>
//                 </li>`
//     );
//     }

//     let deleteComment = function(deleteLink){
//         console.log(deleteLink);
//         $(deleteLink).click(function(event){

//             event.preventDefault();
//         $.ajax({
//             type : "get",
//             url : $(deleteLink).prop("href"),
//             success : function(data){
//                 console.log(data)
//                 console.log($(`#comment-id-${data.comment_id}`))
//                 $(`#comment-id-${data.comment_id}`).remove();
//                 notifications('success',data.message);
//             },
//             error : function(error){
//                 console.log("Error:",error.responseText);
//             }
//         });

//         })

//     }

//     $(' .post-comments-list>ul li').each(function(){
//         deleteComment($(' .delete-comment-btn',$(this)));
//     });

// createComment();
//c