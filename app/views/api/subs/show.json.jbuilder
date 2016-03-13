json.extract! @sub, :id, :title, :description

json.posts @posts, partial: 'api/posts/post', as: :post
