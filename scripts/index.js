window.onload=function(){
	var manualArray = $.makeArray();
	var tweetArray = $.makeArray();
	var instagramArray = $.makeArray();
	var postArray = $.makeArray();
	var postbody=document.getElementById("post_body");
	
	$.ajaxSetup({
		async:false
	})
	
	$.getJSON("json/posts.json",function(data){
        var totalCount=0;
        var manualCount=0;
        var tweetCount=0;
        var instagramCount=0;
		while(totalCount<20){
		   var obj = new Object();
		   switch(data["items"][totalCount]["service_slug"]){
		   	  case "manual":
                   obj.name = data["items"][totalCount]["item_name"];
				   obj.text = data["items"][totalCount]["item_data"]["text"];
				   obj.link = data["items"][totalCount]["item_data"]["link"];
				   obj.linktext = data["items"][totalCount]["item_data"]["link_text"];
				   obj.image= data["items"][totalCount]["item_data"]["image_url"];
				   obj.posted=data["items"][totalCount]["item_published"];
				   obj.type="manual";
				   manualArray.push(obj);
				   manualCount++;
				   break;
			   case "twitter":
                   obj.name = data["items"][totalCount]["item_name"];
				   obj.tweet = data["items"][totalCount]["item_data"]["tweet"];
                   obj.username = data["items"][totalCount]["item_data"]["user"]["username"];
                   obj.posted=data["items"][totalCount]["item_published"];
                   obj.type="twitter";
				   tweetArray.push(obj);
				   tweetCount++;
				   break;
			   case "instagram":
                   obj.name = data["items"][totalCount]["item_name"];
				   obj.caption = data["items"][totalCount]["item_data"]["caption"];
                   obj.username = data["items"][totalCount]["item_data"]["user"]["username"];
                   obj.image= data["items"][totalCount]["item_data"]["image"]["large"];
                   obj.posted=data["items"][totalCount]["item_published"];
                   obj.type="instagram";
				   instagramArray.push(obj);
				   instagramCount++;
				   break;
			    default:
			       break;
		   }
		   postArray.push(obj);
           totalCount++;
		}
	});
		
	$.ajaxSetup({
	   async:true
	})

    postArray.sort(function(a,b){
    	return getDateNum(b.posted) - getDateNum(a.posted);
    })

    console.log(postArray);

    //converse the item_published form to comparable form
    function getDateNum(date){
       var tmp = date.split("");
       var arr = new Array();

       tmp.forEach(function(element){
       	  if(!isNaN(element)&&element!==" "){
       	  	 arr.push(element);
       	  }
       });

       return arr.join("");
    }

	for(var i=0;i<10;i++){
		generatepost(i);
	}

	function generatepost(i){
		var newpostdiv = document.createElement('div');
		newpostdiv.style.border="1px solid #ccc";
		switch(postArray[i].type){
			case "manual":
			   var newname = document.createElement('div');
			   newname.innerHTML = postArray[i].name;
			   newname.setAttribute("class","manual_name");
			   var newtagdiv = document.createElement('div');
			   var newtag = document.createElement('img');
			   newtagdiv.appendChild(newtag);
			   newtag.setAttribute("class","tag");
			   newtag.style.width="15%";
			   newtag.setAttribute("src","images/AFF.png");
			   var newimagediv = document.createElement('div');
			   var newimage = document.createElement('img');
			   newimagediv.appendChild(newimage);
			   newimagediv.style.width="100%";
			   newimage.setAttribute("src",postArray[i].image);
			   newimage.style.width="100%";
			   var newtext = document.createElement('div');
			   newtext.innerHTML=postArray[i].text;
			   newtext.setAttribute("class","manual_text");
			   var newlinktext = document.createElement('a');
			   newlinktext.setAttribute("class","manual_linktext");
			   newlinktext.setAttribute("href",postArray[i].link);
			   newlinktext.setAttribute("target","blank");
			   newlinktext.innerHTML=postArray[i].linktext;
			   newpostdiv.appendChild(newtagdiv);
			   newpostdiv.appendChild(newname);
			   newpostdiv.appendChild(newimage);
			   newpostdiv.appendChild(newtext);
			   newpostdiv.appendChild(newlinktext);
			   newpostdiv.setAttribute("class","manual");
			   postbody.appendChild(newpostdiv);
			   break;
			case "twitter":
			   var newname = document.createElement('div');
			   newname.setAttribute("class","twitter_name");
			   newname.innerHTML = postArray[i].name;
			   var newtagdiv = document.createElement('div');
			   var newtag = document.createElement('img');
			   newtag.setAttribute("class","tag");
			   newtagdiv.appendChild(newtag);
			   newtag.style.width="15%";
			   newtag.setAttribute("src","images/twitter.png");
			   var newusername = document.createElement('div');
			   newusername.setAttribute("class","twitter_username");
			   newusername.innerHTML=postArray[i].username;
			   var newtweet = document.createElement('div');
			   newtweet.setAttribute("class","twitter_tweet");
			   newtweet.innerHTML=postArray[i].tweet;
			   newpostdiv.appendChild(newtagdiv);
			   newpostdiv.appendChild(newname);
			   newpostdiv.appendChild(newusername);
			   newpostdiv.appendChild(newtweet);
			   newpostdiv.setAttribute("class","twitter");
			   postbody.appendChild(newpostdiv);
			   break;
			case "instagram":
			   var newname = document.createElement('div');
			   newname.setAttribute("class","instagram_name");
			   newname.innerHTML = postArray[i].name;
			   var newtagdiv = document.createElement('div');
			   var newtag = document.createElement('img');
			   newtag.setAttribute("class","tag");
			   newtagdiv.appendChild(newtag);
			   newtag.style.width="15%";
			   newtag.setAttribute("src","images/instagram.png");
			   var newimagediv = document.createElement('div');
			   var newimage = document.createElement('img');
			   newimagediv.appendChild(newimage);
			   newimagediv.style.width="100%";
			   newimage.setAttribute("src",postArray[i].image);
			   newimage.style.width="100%";
			   var newusername = document.createElement('div');
			   newusername.setAttribute("class","instagram_username");
			   newusername.innerHTML=postArray[i].username;
			   var newcaption = document.createElement('div');
			   newcaption.setAttribute("class","instagram_caption");
			   newcaption.innerHTML=postArray[i].caption;
			   newpostdiv.appendChild(newtagdiv);
			   newpostdiv.appendChild(newname);
			   newpostdiv.appendChild(newimage);
			   newpostdiv.appendChild(newusername);
			   newpostdiv.appendChild(newcaption);
			   newpostdiv.setAttribute("class","instagram");
			   postbody.appendChild(newpostdiv);
			   break;
			default:
			   break;
		} 
	}

	$("#readmore").click(function(){
	    for(var i=10;i<20;i++){
		   generatepost(i);
	    }
	    $("#readmore").css("display","none");
	});

	$("#manual_filter").click(function(){
		$(".manual").css("display","block");
		$(".twitter").css("display","none");
		$(".instagram").css("display","none");
	});

	$("#twitter_filter").click(function(){
		$(".manual").css("display","none");
		$(".twitter").css("display","block");
		$(".instagram").css("display","none");
	});

	$("#instagram_filter").click(function(){
		$(".manual").css("display","none");
		$(".twitter").css("display","none");
		$(".instagram").css("display","block");
	});
}