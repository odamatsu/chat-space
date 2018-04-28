$(document).on("turbolinks:load",function() {
  function buildHTML(message){
    console.log(message.image_url)
    if (message.image_url) {
      var html = ` <div class="message" data-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                      ${message.content}
                      </p>
                      <img src="${message.image_url}" >
                    </div>
                  </div>`;
    } else {
    var html = ` <div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                    ${message.content}
                    </p>
                  </div>
                </div>`;
    }
    return html;
  }
  $("#new_message").on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $('this').attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.group[data-group_id =' + data.groupId + '] .group__message').html(data.content);
      $('.form__message').val('');
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });

  $(function(){
    function buildMESSAGE(new_message) {
      var message_list = $('.messages');
      var html = `<div class="message" data-id="${new_message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">${new_message.user_name}</div>
                      <div class="upper-message__date">${new_message.created_at}</div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">${new_message.content}</p>
                    </div>
                  </div>`
      message_list.append(html);
    }

    $(function() {
      setInterval(update, 5000);
    });

    function update() {
      if ($('.message')[0]) {
        var message_id = $('.message:last').data('id');
      } else {
        var message_id = 0
      }
      $.ajax({
        url: location.href,
        data: {
          message: { id: message_id }
        },
        dataType: 'json'
      })
      .always(function(data) {
        $.each(data, function(i, data){
          buildMESSAGE(data);
        });
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
    }

  });

});
