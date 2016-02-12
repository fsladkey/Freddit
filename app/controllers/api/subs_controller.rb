class Api::SubsController < ApplicationController

  def index
    @subs = Sub.all
    render json: @subs
  end

  def posts
    @posts = Post.includes(:sub, :user).where(sub_id: params[:id])
    render json: @posts
  end

end
