function toggleLike(toggleBtn){
    console.log(toggleBtn);
    $(toggleBtn).click(function(event){
        event.preventDefault();
        $.ajax({
            type : "GET",
            url : $(toggleBtn).attr("href"),
            success : function(data){
                let likesCount = $(toggleBtn).attr("data-likes");
                console.log(likesCount);
                console.log(data);
                if(data.deleted){
                    likesCount--;
                }else{
                    likesCount++;
                }
                
                $(toggleBtn).attr("data-likes" , likesCount);
                let newLike;
                console.log(data.likeableType)
                if(data.deleted == true){
                    newLike = newUnLikeDom(likesCount , data.likeableType);
                }else{
                    newLike = newLikeDom(likesCount , data.likeableType);
                }
                $(toggleBtn).html(newLike)
            },
            error : function(error){
                console.log(error.responseText);
            }

                
            })

       })
    }   


    $('.toggle-btn').each(function(){
        toggleLike($(this));
    });




    let newLikeDom = function (likesCount , post) {
        return $(` <a data-likes=${likesCount} class="toggle-btn" href="/likes/toggle?id=${post._id}&type=Posts">
        <img
          src="https://image.flaticon.com/icons/svg/1076/1076984.svg"
          alt="likes-icon"
        />
      </a>

        <span>${likesCount}</span>`);
      };

      let newUnLikeDom = function (likesCount , post) {
        return $(` <a data-likes=${likesCount} class="toggle-btn" href="/likes/toggle?id=${post._id}&type=Posts">
        <img
            src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
            alt="likes-icon"
          />
      </a>

        <span>${likesCount}</span>`);
      };