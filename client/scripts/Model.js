let Model = (function() {
    function send(message) {
    $.ajax({
      type: "POST",
      url: "/server/addMessage",
      data: JSON.stringify(message),
      contentType: "application/json"
    });
  }

  function fetch() {
    return Promise.resolve(
      $.ajax({
        type: "GET",
        url: "/server/fetchData",
      }))
  }

  return {
    fetch:fetch,
    send: send,
  }
})()
