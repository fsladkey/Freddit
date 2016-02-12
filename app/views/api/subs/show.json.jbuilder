json.extract! @sub, :id, :title, :description

json.posts @sub.posts, partial: 'api/posts/post', as: :post
