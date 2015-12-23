json.extract! post, :id, :user_id, :sub_id, :title, :body

json.created_at post.created_at.iso8601
json.updated_at post.updated_at.iso8601

json.sub do
  json.title post.sub.title
end

json.user do
  json.username post.user.username
end
