json.array! @posts do |post|
  json.extract! post, :id, :user_id, :sub_id, :title, :body, :created_at, :updated_at

  json.sub do
    json.title post.sub.title
  end

  json.user do
    json.username post.user.username
  end
end
