class Api::PostsController < ApplicationController

  def index
    if params[:sub_id]
      @posts = Post.includes(:sub, :user).where(sub_id: params[:sub_id])
    else
      @posts = Post.includes(:sub, :user).limit(100)
    end
    render :index
  end

  def show
    @post = Post.includes(:sub, :user, {comments: [:user]}).find(params[:id])
    render :show
  end
end
