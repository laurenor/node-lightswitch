var host = location.origin.replace(/^http/, 'ws');
var ws = new WebSocket(host);

ws.onopen = function (event) {
  $('img').on('click', sendState);
};

var on = "img/on.jpg";
var off = "img/off.jpg";
var obj;

//gets state of switches from server
ws.onmessage = function (event) {
  obj = JSON.parse(event.data);
  $('#userCount').html(obj.users);

  if (obj.switch1 == 0) {
    $('#switch1').attr('src', on);
  }
  else {
    $('#switch1').attr('src', off);
  }
  if (obj.switch2 == 0) {
    $('#switch2').attr('src', on);
  }
  else {
    $('#switch2').attr('src', off);
  }
  if (obj.switch3 == 0) {
    $('#switch3').attr('src', on);
  }
  else {
    $('#switch3').attr('src', off);
  }
}

//sends updates state of switches to server
function sendState() {
  if ($(this).attr('id') == 'switch1') {
    if ($('#switch1').attr('src') == on) {
      obj.switch1 = 1;
    }
    else {
      obj.switch1 = 0;
    }
  }
  else if ($(this).attr('id') == 'switch2') {
    if ($('#switch2').attr('src') == on) {
      obj.switch2 = 1;
    }
    else {
      obj.switch2 = 0;
    }
  }
  else if ($(this).attr('id') == 'switch3') {
    if ($('#switch3').attr('src') == on) {
      obj.switch3 = 1;
    }
    else {
      obj.switch3 = 0;
    }
  }
    ws.send(JSON.stringify(obj));
}