$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link
 $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
$('.list-group').on("click","a",function() {
        $that = $(this);

        $that.parent().find('a').removeClass('active');
        $that.addClass('active');
    });
$('.list-group').on("click",".callBtn",function() {
    var from = "You"
    var val = $(this).closest('.details').children('.number').html();
    var name = $(this).prev().text();
    insRow(from,name,"Voice Call");
    url = "https://api-voice.kaleyra.com/v1/?api_key=A95c621c8e036e939778507f14cf282f9&method=dial.click2call&format=xml&caller=9952986342&receiver="+val;
    ajaxCall(url,"GET",5);
    });
$('#sendMessage').click(function(e) {
    var from = "You"
    var items = $(".active").children();
    var val = items.find(".number").html();
    var name = items.find(".name").html();
    insRow(from,name,"Message");
    var msg = $("#message").val();
    if(msg != ""){
    url = "https://api-promo.kaleyra.com/v4/?api_key=Ad420259079655bd5b427201652f0b8cc&message="+msg+"&sender=BULKSMS&to="+val+"&method=sms";
    ajaxCall(url,"GET",5);
    }
    });
$('#broadcastMsg').click(function(e) {
    var from = "You"
    var to = "All"
    var msg = $("#bdcastMsg").val();
    insRow(from,to,"Broadcast");
    const elements = document.querySelectorAll('.number');
    Array.from(elements).forEach( (el) => {
   if(msg != ""){
    url = "https://api-promo.kaleyra.com/v4/?api_key=Ad420259079655bd5b427201652f0b8cc&message="+msg+"&sender=BULKSMS&to="+el.innerHTML+"&method=sms";
    ajaxCall(url,"GET",5);
     }
    });
    });
$('#notify').click(function(e) {
    $(".glyphicon-bell").removeClass("bell");
    myAlertBottom();
    myAlertBottom1();
    myAlertBottom2();
    });
 $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });

callContactList();
})

// To add contacts dynamically via DOM from any API
function callContactList(){
ajaxCall1("http://127.0.0.1:5000/getUsers","GET","",getContactList);
}
function getContactList(data){
for (var i = 0; i < data[0].length; i++) {
    var counter = data[i];
    for (var j = 0; j < counter.length; j++) {
    console.log(counter[j].title);
    console.log(counter[j].number);
    createListItem(counter[j].title,counter[j].number)
    }
    }
}
function createListItem(name,number){
var spanIcon = document.createElement("span");
spanIcon.className = "glyphicon glyphicon-earphone listIcon callBtn";
var spanName = document.createElement("span");
spanName.className= "name";
spanName.innerHTML = name
var spanDot = document.createElement("span");
spanDot.className = "dot";

var heading5 = document.createElement("h5");
heading5.className = "mb-1";
heading5.appendChild(spanDot);
heading5.appendChild(spanName);
heading5.appendChild(spanIcon);

var small = document.createElement("small");
small.className = "number";
small.innerHTML = number

var maindiv = document.createElement("div");
maindiv.className = "d-flex w-100 justify-content-between";
maindiv.appendChild(heading5);
maindiv.appendChild(small);

var anchor = document.createElement("a");
anchor.className = "list-group-item list-group-item-action flex-column align-items-start";
anchor.appendChild(maindiv);

$('.list-group').append(anchor);
}

function ajaxCall(uri, method, qtimeout,qdata, callback, nextfunc, async) {
    $.ajax({
        async: (async == undefined) ? true : async,
        url: uri,
        type: method,
        timeout:qtimeout,
        data: qdata,
        cache: true,
        datatype: 'jsonp',
        crossDomain: true,
        success: function (data) {
            if (callback) {
                callback(data);
            }
        },
        error: function (e) {
            alert("Service Request sent successfuly");
        },

    });
}

function ajaxCall1(uri, method,qdata, callback, nextfunc, async) {
    $.ajax({
        async: (async == undefined) ? true : async,
        url: uri,
        type: method,
        data: qdata,
        cache: true,
        datatype: 'text',
        crossDomain: true,
        success: function (data) {
           if (callback) {
                callback(data);
            }
        },
        error: function (e) {
            alert("Error");
        },

    });
}
function myAlertBottom(){
  $(".myAlert-bottom").show();
  setTimeout(function(){
    $(".myAlert-bottom").hide();
    myAlertBottom1();
  }, 2000);
}
function myAlertBottom1(){
  $(".myAlert-bottom1").show();
  setTimeout(function(){
    $(".myAlert-bottom1").hide();
  }, 4000);
}
function myAlertBottom2(){
  $(".myAlert-bottom2").show();
  setTimeout(function(){
    $(".myAlert-bottom2").hide();
  }, 6000);
}
function insRow(from_name,to_name,service_name) {
  var d = new Date();
  var from = document.createElement("td");
  from.innerHTML = from_name
  var to = document.createElement("td");
  to.innerHTML = to_name
  var service = document.createElement("td");
  service.innerHTML = service_name
  var time = document.createElement("td");
  time.innerHTML = d.toLocaleString();
  var new_row = document.createElement("tr");
  new_row.appendChild(from);
  new_row.appendChild(to);
  new_row.appendChild(service);
  new_row.appendChild(time);
  $('#historytable').append(new_row);
}