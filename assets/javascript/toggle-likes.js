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
                $(toggleBtn).html(`${likesCount} Likes`)
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



