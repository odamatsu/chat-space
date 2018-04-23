json.content @message.content
json.id @message.id
json.user_name @message.user.name
json.created_at @message.created_at.strftime('%Y/%m/%d %H:%M')
json.groupId @message.group_id
json.image_url @message.image.url
