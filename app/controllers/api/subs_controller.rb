class Api::SubsController < ApplicationController

  def index
    @subs = Sub.all
    render json: @subs
  end

  def posts
    @posts = Post.includes(:sub, :user).where(sub_id: params[:id])
    render "api/posts/index"
  end

end
