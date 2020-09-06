{
  // method to submit the form data for new post using AJAX
  let createPost = function () {
    let newPostForm = $("#post-form");
    newPostForm.submit(function (e) {
      e.preventDefault();
      //console.log("yesss");
      $.ajax({
        type: "post",
        url: "/posts/add-post",
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.post);
          $("#posts-list-container").prepend(newPost);
          deletePost($(" .delete-post-btn", newPost));

          // call the create comment class
          new PostComments(data.post._id);

          new Noty({
            theme: "relax",
            text: "Post published!",
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
  };

  // method to create a post in DOM
  let newPostDom = function (post) {
    return $(`<div id="post-${post._id}" class="post-wrapper">
        <div class="post-header">
          <div class="post-avatar">
            <a href="">
              <img
                src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                alt="user-pic"
              />
            </a>
            <div>
              <span class="post-author">${post.user.name}</span>
              <span class="post-time">a minute ago</span>
            </div>
            <button class="delete-btn no-btn">
              <a class="delete-post-btn" href="/posts/delete-post/${post._id}"
                ><i class="fas fa-times"></i
              ></a>
            </button>
          </div>
          <div class="post-content">${post.content}</div>
      
          <div class="post-actions">
            <button class="post-like no-btn">
             <img
                src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                alt="likes-icon"
              />
      
              <span>${post.likes.length}</span>
            </button>
      
            <div class="post-comments-icon">
              <img
                src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                alt="comments-icon"
              />
              <span>${post.comments.length}</span>
            </div>
          </div>
          <div class="post-comment-box">
            <form id="post-${post._id}-comments-form" class="comments-form" action="/comments/add-comment" method="POST">
              <input type="text" name="content" required />
              <input type="hidden" name="post" value="${post._id}" />
              <input type="submit" value="Add Comment" />
            </form>
          </div>
      
          <div id='post-comments-${post._id}' class="post-comments-list">
          </div>
        </div>
      </div>`);
  };

  // method to delete a post from DOM
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();
      //console.log('deletelink' , deleteLink)
      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          //console.log('data' , data)
          $(`#post-${data.post_id}`).remove();
          new Noty({
            theme: "relax",
            text: "Post Deleted",
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
  };

  // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
  let convertPostsToAjax = function () {
    console.log("ajax");
    $("#posts-list-container>div").each(function () {
      let self = $(this);
      console.log(self);
      let deleteButton = $(" .delete-post-btn", self);
      console.log(deleteButton);
      deletePost(deleteButton);

      // get the post's id by splitting the id attribute
      let postId = self.prop("id").split("-")[1];
      new PostComments(postId);
    });
  };

  createPost();
  convertPostsToAjax();
}

// //Submitting data via AJAX

// let createPost = function(){
//     let postForm = $("#post-form");
//     postForm.submit(function(){
//         event.preventDefault();
//         $.ajax({
//             type : "POST",
//             url : "/posts/add-post",
//             data : postForm.serialize(),
//             success : function(data){
//                 console.log("data Posted",data.post);
//                 let newPost = newPostToBePrepended(data.post);
//                 console.log(newPost);
//                 console.log($(' .delete-post-btn',newPost));
//                 deletePost($(' .delete-post-btn',newPost));
//                 //createComment();
//                 toggleLike($(' .toggle-btn',newPost));
//                 $("#posts-list").prepend(newPost);
//                 notifications('success',data.message);
//             },
//             error : function(error){
//                 console.log(error.responseText);
//             }

//             })
//     })

//         }

// //New Post Added to be displayed in View
// let newPostToBePrepended = function(post){
//     return $(`<li id="post-${post._id}">
//                 <a class="delete-post-btn" href="/posts/delete-post/${post._id }"><i class="fas fa-window-close"></i></a>
//                 ${ post.content }
//                 <small> ${ post.user.name }</small>
//                 <a data-likes="0" class="toggle-btn" href="/likes/toggle/?id=${post._id}&type=Posts">${post.likes.length} Likes</a>
//                 <div class="posts-comments">

//                         <form action="/comments/add-comment" method="POST">
//                         <input type="text" name="content" required>
//                         <input type="hidden" name="post" value="${ post._id }">
//                         <input type="submit" value="Add Comment">
//                         </form>

//                 </div>
//                 <div class="post-comments-list">
//                 <ul>
//                 </ul>

//                 </div>
//             </li>`);
// }

// let deletePost = function(deleteLink){
//         console.log(deleteLink);
//         $(deleteLink).click(function(event){
//             console.log($(deleteLink).prop("href"));
//         event.preventDefault();
//         $.ajax({
//             type : "get",
//             url : $(deleteLink).prop("href"),
//             success : function(data){
//                 $(`#post-${data.post_id}`).remove();
//                 notifications('success',data.message);
//             },
//             error : function(error){
//                 console.log(error.responseText);
//             }
//         });
//     }
// )
// }

// //Method to loop over previously created Post and call DeletePost on it

//     $('#posts-list>li').each(function(){
//         deletePost($(' .delete-post-btn',$(this)));
//     });

//     let notifications = function(type,text){
//                 new Noty({
//                     theme: 'relax',
//                     text: text,
//                     type: type,
//                     layout: 'topRight',
//                     timeout: 1000
//                 }).show();
//             }

// createPost()
//c