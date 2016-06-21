// YOUR CODE HERE:
var app = (function() {
  const username = prompt("Enter a username");
  init();
  var Filter = 'All';
  var friends = [];
  //var urlParts = parseUri(document.location.href.toString());

  function init() {
    updateChat();
    $('#roomSelect').on('change',  function(e) {
      e.preventDefault();
      filterRooms($(this).val());
      Filter = $(this).val();
    })
    $('#newRoom').on('click', function() {
      prompt('What is the room name?')
    })
    $('#chatInput').submit(submitMessage);
    $('#main').on('click', '#username', function(){friends.push($(this).context.innerHTML)});
    setInterval(updateChat, 1000);
  }

  function filterRooms (filter) {
    if(filter === 'All') {
      $('#chats #userChat').show();
    } else {
      console.log($('#chats #userChat'))
      $('#chats #userChat').hide();
      $('#chats .' + filter).show();
    }
  }

  function generateRoomNames() {
    Model.fetch()
    .then(function(data) {
      console.log(data)
      var occurences = {};
      var room;
      $('#roomSelect').children().remove();
      $('#roomSelect').append('<option value="All">All</option>');
      $('#roomSelect').append('<option value=' + Filter + '  selected>' + Filter + '</option>')
      for(var i in data.results) {
        room = data.results[i].roomname;
        if(occurences[room] === undefined && data.results[i].text) {
          occurences[room] = 1;
          $('#roomSelect').append("<option value=" + room + " data-" + room + ">" + room + "</option>")
        }
      }
    })
  }

  function submitMessage(event) {
    console.log("Button Clicked")
      event.preventDefault();
      var inputs = {
        username: username,
        text: $('#submitText').val(),
        roomname: Filter
      }
      console.log(inputs)
      $('#submitText').text("");
      Model.send(inputs);
      Model.fetch();
    }

  function clearMessages() {
    $('#chats').remove();
    $('#main').append("<div id='chats'></div>")
  }

  function addMessage(message) {
    if(message.hasOwnProperty("text")) {
      $('#chats').prepend("<div id='userChat' class="+message.roomname+"><div><a href='#' id='username'></a></div><div id='userMessage'></div></div>")
      $('#username').text(message.username)

      if(friends.includes(message.username)) {
        $('#userMessage').html('<b>Says: ' + message.text + ' </b>')
      } else {
        $('#userMessage').text('Says: ' + message.text)
      }
    }
  }

  function updateChat() {
    Model.fetch()
    .then(function(data) {
      clearMessages();
      for(var i = data.results.length - 1; i >= 0 ; i--) {
        addMessage(data.results[i]);
      }
      generateRoomNames();
      filterRooms(Filter);
    })
  }

  function parseUri(e){var a=parseUri.options,f=a.parser[a.strictMode?"strict":"loose"].exec(e),b={},c=14;while(c--)b[a.key[c]]=f[c]||"";b[a.q.name]={};b[a.key[12]].replace(a.q.parser,function(h,d,g){if(d)b[a.q.name][d]=g});return b}parseUri.options={strictMode:false,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};

  return {
    init: init,
    clearMessages: clearMessages,
    addMessage: addMessage,
    generateRoomNames: generateRoomNames,
    updateChat: updateChat,
  };
})()
