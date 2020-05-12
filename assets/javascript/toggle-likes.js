function toggleLike(){
       $(".toggle-btn").click(function(){
           event.preventDefault();
        $.ajax({
            type : "POST",
            url : $(this).attr("href"),
            success : function(data){
                let likesCount = parseInt($(this).attr("data-likes"));
                console.log(likesCount);
                console.log(data);
                if(data.deleted){
                    likesCount--;
                }else{
                    likesCount++;
                }
                
                $(this).attr("data-likes" , likesCount);
                $(this).html(`${likesCount} Likes`)
            },
            error : function(error){
                console.log(error.responseText);
            }

                
            })

       })
        

        
       
        }

        toggleLike();

