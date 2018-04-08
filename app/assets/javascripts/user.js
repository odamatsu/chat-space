$(document).on('turbolinks:load', function() {

  var search_list = $(".user-search__result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.user_name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</a>
                </div>`
    search_list.append(html);
  }

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">${user}</div>`
    search_list.append(html);
  }

  $(".js-user-search-field").keyup(function() {
    var input = $(".js-user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $(".user-search__result").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      } else {
        appendNoUser("一致するUserがおりません");
      }
    })
    .fail(function() {
      alert('User検索に失敗しました');
    });
  });

  $(".user-search__result").on("click", "a.chat-group-user__btn--add", function() {
    var id = $(this).attr("data-user-id");
    var name = $(this).attr("data-user-name");
    appendMember(id, name);
    $(this).parent(".chat-group-user").remove()
  })

  var member_list = $(".member-add___result");

  function appendMember(id, name) {
    var html = `<div class='chat-group-user clearfix js-chat-member'>
    <input name='group[user_ids][]' type='hidden' value='${id}'>
    <p class='chat-group-user__name'>${name}</p>
    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
    </div>`
    member_list.append(html);
  }

  $(".js-add-user").on("click", "a.js-remove-btn", function() {
    $(this).parent(".js-chat-member").remove()
  })
});
