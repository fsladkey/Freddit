json.extract! post, :id, :user_id, :sub_id, :title, :body

json.created_at post.created_at.iso8601
json.updated_at post.updated_at.iso8601
json.comments post.comments

json.total_votes post.total_votes

json.sub do
  json.title post.sub.title
end

json.user do
  json.username post.user.username
end


# json.posts post.comments, partial: 'api/comments/comment', as: :comment
json.comments post.comments do |comment|
  json.extract! comment, :id, :body, :user_id, :parent_comment_id, :post_id
  json.user comment.user
end

json.votes post.votes do |vote|
  json.extract! vote, :id, :user_id
end
