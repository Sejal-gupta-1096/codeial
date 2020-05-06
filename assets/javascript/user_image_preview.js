
let preview = function(){
    $("#change-avtar").change(function(){
        const reader = new FileReader();
        let file = event.target.files[0];
        
        reader.readAsDataURL(file);
        reader.addEventListener("load" , function(){
            $("#img").attr("src" , this.result);
            console.log(this , this.result);
        })
       
})
}

preview();