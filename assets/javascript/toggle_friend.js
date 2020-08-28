
function toggleFriend(toggleFriendBtn){
    console.log(toggleFriendBtn);
    console.log($(toggleFriendBtn));
    $(toggleFriendBtn).click(function(event){
        event.preventDefault();
        $.ajax({
            type : "GET",
            url : $(toggleFriendBtn).attr("href"),
            success : function(data){
                if(data.deleted){
                    $(toggleFriendBtn).html("Remove Friend")
                }else{
                    $(toggleFriendBtn).html("Add Friend")
                }
                
            },
            error : function(error){
                console.log(error.responseText);
            }

                
            })

       })
}


toggleFriend($(".toggle-friend-btn"));